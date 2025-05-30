import { ethers } from 'ethers';

const USDT_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 value) returns (bool)',
  'function decimals() view returns (uint8)',
];

const CONTRACTS = {
  ETH: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // Ethereum USDT
  POLYGON: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // Polygon USDT
};

const RPC_URLS = {
  ETH: process.env.ETH_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
  POLYGON: process.env.POLYGON_RPC_URL || 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key',
};

export class ERC20Handler {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private network: 'ETH' | 'POLYGON';

  constructor(network: 'ETH' | 'POLYGON' = 'POLYGON') {
    this.network = network;
    this.provider = new ethers.JsonRpcProvider(RPC_URLS[network]);
    this.contract = new ethers.Contract(
      CONTRACTS[network],
      USDT_ABI,
      this.provider
    );
  }

  /**
   * Get USDT balance for an address
   */
  async getBalance(address: string): Promise<string> {
    try {
      const decimals = await this.contract.decimals();
      const balance = await this.contract.balanceOf(address);
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('ERC20 balance check error:', error);
      throw error;
    }
  }

  /**
   * Check if a transaction is confirmed
   */
  async isTransactionConfirmed(txHash: string): Promise<boolean> {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) return false;

      const confirmations = await tx.confirmations();
      // Require 12 confirmations for ETH, 64 for Polygon
      const requiredConfirmations = this.network === 'ETH' ? 12 : 64;
      return confirmations >= requiredConfirmations;
    } catch (error) {
      console.error('Transaction confirmation check error:', error);
      return false;
    }
  }

  /**
   * Get transaction details
   */
  async getTransactionDetails(txHash: string) {
    try {
      const tx = await this.provider.getTransaction(txHash);
      if (!tx) throw new Error('Transaction not found');

      const receipt = await this.provider.getTransactionReceipt(txHash);
      const block = await this.provider.getBlock(tx.blockNumber!);

      return {
        confirmed: (await tx.confirmations()) >= (this.network === 'ETH' ? 12 : 64),
        timestamp: block?.timestamp,
        fee: ethers.formatEther(receipt?.gasUsed! * receipt?.gasPrice!),
        blockNumber: tx.blockNumber,
      };
    } catch (error) {
      console.error('Transaction details error:', error);
      throw error;
    }
  }

  /**
   * Release USDT from multisig to buyer
   */
  async releaseUSDT(
    escrowAddress: string,
    buyerAddress: string,
    amount: string,
    signatures: string[]
  ): Promise<string> {
    try {
      const decimals = await this.contract.decimals();
      const value = ethers.parseUnits(amount, decimals);

      // Create the transaction data
      const data = this.contract.interface.encodeFunctionData('transfer', [
        buyerAddress,
        value,
      ]);

      // Create and sign the multisig transaction
      const tx = {
        to: CONTRACTS[this.network],
        data,
        value: 0,
        gasLimit: 200000,
      };

      // Combine signatures and broadcast
      const signedTx = await this.combineSignatures(tx, signatures);
      const response = await this.provider.broadcastTransaction(signedTx);
      return response.hash;
    } catch (error) {
      console.error('USDT release error:', error);
      throw error;
    }
  }

  /**
   * Refund USDT back to seller
   */
  async refundUSDT(
    escrowAddress: string,
    sellerAddress: string,
    amount: string,
    signatures: string[]
  ): Promise<string> {
    try {
      const decimals = await this.contract.decimals();
      const value = ethers.parseUnits(amount, decimals);

      // Create the transaction data
      const data = this.contract.interface.encodeFunctionData('transfer', [
        sellerAddress,
        value,
      ]);

      // Create and sign the multisig transaction
      const tx = {
        to: CONTRACTS[this.network],
        data,
        value: 0,
        gasLimit: 200000,
      };

      // Combine signatures and broadcast
      const signedTx = await this.combineSignatures(tx, signatures);
      const response = await this.provider.broadcastTransaction(signedTx);
      return response.hash;
    } catch (error) {
      console.error('USDT refund error:', error);
      throw error;
    }
  }

  /**
   * Combine multiple signatures for multisig transaction
   */
  private async combineSignatures(
    tx: ethers.TransactionRequest,
    signatures: string[]
  ): Promise<string> {
    // This is a simplified version. In production, you'd need to:
    // 1. Sort signatures by signer address
    // 2. Encode the signatures in the correct format
    // 3. Add signature data to transaction
    
    // For now, we'll just concatenate them
    const signatureData = signatures.join('');
    const serializedTx = ethers.Transaction.from({
      ...tx,
      signature: signatureData,
    }).serialized;

    return serializedTx;
  }
} 