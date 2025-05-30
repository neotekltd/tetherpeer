import TronWeb from 'tronweb';
import { ethers } from 'ethers';
import { z } from 'zod';

// Validation schemas
const MultisigParamsSchema = z.object({
  owners: z.array(z.string()).min(2).max(5),
  threshold: z.number().min(2).max(5),
});

interface MultisigWallet {
  address: string;
  owners: string[];
  threshold: number;
  network: 'TRON' | 'EVM';
}

export async function createMultisigTRON(
  owners: string[],
  threshold: number,
  apiKey: string
): Promise<MultisigWallet> {
  try {
    // Validate input
    const { owners: validOwners, threshold: validThreshold } = MultisigParamsSchema.parse({
      owners,
      threshold,
    });

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": apiKey }
    });

    // Here you would deploy your multisig contract
    // This is a placeholder for the actual contract deployment
    const contract = await tronWeb.contract().new({
      abi: [], // Your contract ABI
      bytecode: '', // Your contract bytecode
      feeLimit: 1000000000,
      callValue: 0,
      parameters: [validOwners, validThreshold]
    });

    return {
      address: contract.address,
      owners: validOwners,
      threshold: validThreshold,
      network: 'TRON'
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid multisig parameters: ${error.message}`);
    }
    throw new Error(`Failed to create TRON multisig: ${error.message}`);
  }
}

export async function createMultisigEVM(
  owners: string[],
  threshold: number,
  provider: ethers.providers.JsonRpcProvider
): Promise<MultisigWallet> {
  try {
    // Validate input
    const { owners: validOwners, threshold: validThreshold } = MultisigParamsSchema.parse({
      owners,
      threshold,
    });

    // Here you would deploy your multisig contract
    // This is a placeholder for the actual contract deployment
    const factory = new ethers.ContractFactory(
      [], // Your contract ABI
      '', // Your contract bytecode
      provider.getSigner()
    );

    const contract = await factory.deploy(validOwners, validThreshold);
    await contract.deployed();

    return {
      address: contract.address,
      owners: validOwners,
      threshold: validThreshold,
      network: 'EVM'
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid multisig parameters: ${error.message}`);
    }
    throw new Error(`Failed to create EVM multisig: ${error.message}`);
  }
}

export async function verifyMultisigTRON(address: string, apiKey: string): Promise<boolean> {
  try {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": apiKey }
    });

    const code = await tronWeb.trx.getContract(address);
    return code !== null && code.contract_address === address;
  } catch (error) {
    throw new Error(`Failed to verify TRON multisig: ${error.message}`);
  }
}

export async function verifyMultisigEVM(
  address: string,
  provider: ethers.providers.JsonRpcProvider
): Promise<boolean> {
  try {
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    throw new Error(`Failed to verify EVM multisig: ${error.message}`);
  }
} 