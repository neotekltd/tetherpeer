import TronWeb from 'tronweb';

const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // USDT TRC20 contract

export class TRC20Handler {
  private tronWeb: typeof TronWeb;

  constructor() {
    this.tronWeb = new TronWeb({
      fullHost: process.env.TRON_FULL_NODE_URL || 'https://api.trongrid.io',
      headers: { 'TRON-PRO-API-KEY': process.env.TRON_API_KEY },
    });
  }

  /**
   * Get USDT balance for an address
   */
  async getBalance(address: string): Promise<string> {
    try {
      const contract = await this.tronWeb.contract().at(USDT_CONTRACT);
      const balance = await contract.balanceOf(address).call();
      return this.tronWeb.fromSun(balance.toString());
    } catch (error) {
      console.error('TRC20 balance check error:', error);
      throw error;
    }
  }

  /**
   * Check if a transaction is confirmed
   */
  async isTransactionConfirmed(txId: string): Promise<boolean> {
    try {
      const tx = await this.tronWeb.trx.getTransaction(txId);
      return tx && tx.ret && tx.ret[0].contractRet === 'SUCCESS';
    } catch (error) {
      console.error('Transaction confirmation check error:', error);
      return false;
    }
  }

  /**
   * Get transaction details
   */
  async getTransactionDetails(txId: string) {
    try {
      const tx = await this.tronWeb.trx.getTransaction(txId);
      const info = await this.tronWeb.trx.getTransactionInfo(txId);
      
      return {
        confirmed: tx && tx.ret && tx.ret[0].contractRet === 'SUCCESS',
        timestamp: info.blockTimeStamp,
        fee: this.tronWeb.fromSun(info.fee || '0'),
        blockNumber: info.blockNumber,
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
      // Create the transaction
      const contract = await this.tronWeb.contract().at(USDT_CONTRACT);
      const unsignedTx = await contract.transfer(buyerAddress, amount).send();

      // Sign the transaction with provided signatures
      const signedTx = await this.tronWeb.trx.multiSign(
        unsignedTx,
        signatures,
        { permissionId: 2 } // Multisig permission ID
      );

      // Broadcast the transaction
      const result = await this.tronWeb.trx.sendRawTransaction(signedTx);
      return result.txid;
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
      // Create the transaction
      const contract = await this.tronWeb.contract().at(USDT_CONTRACT);
      const unsignedTx = await contract.transfer(sellerAddress, amount).send();

      // Sign the transaction with provided signatures
      const signedTx = await this.tronWeb.trx.multiSign(
        unsignedTx,
        signatures,
        { permissionId: 2 } // Multisig permission ID
      );

      // Broadcast the transaction
      const result = await this.tronWeb.trx.sendRawTransaction(signedTx);
      return result.txid;
    } catch (error) {
      console.error('USDT refund error:', error);
      throw error;
    }
  }
} 