import { ECPairFactory } from 'ecpair';
import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { webcrypto } from 'crypto';

const ECPair = ECPairFactory(ecc);

interface MultisigAddressParams {
  sellerPubKey: string;
  buyerPubKey?: string;
  platformPubKey: string;
}

interface MultisigResult {
  escrowAddress: string;
  redeemScript: string;
}

/**
 * Generate a 2-of-3 multisig P2SH address
 */
export async function generateMultisigAddress({
  sellerPubKey,
  buyerPubKey,
  platformPubKey,
}: MultisigAddressParams): Promise<MultisigResult> {
  try {
    const network = bitcoin.networks.bitcoin; // Use mainnet
    
    // Convert public keys to Buffer
    const sellerPubKeyBuffer = Buffer.from(sellerPubKey, 'hex');
    const platformPubKeyBuffer = Buffer.from(platformPubKey, 'hex');
    
    let pubkeys = [sellerPubKeyBuffer, platformPubKeyBuffer];
    
    // Add buyer's public key if available
    if (buyerPubKey) {
      const buyerPubKeyBuffer = Buffer.from(buyerPubKey, 'hex');
      pubkeys.push(buyerPubKeyBuffer);
    }
    
    // Sort public keys (BIP67)
    pubkeys = pubkeys.sort((a, b) => a.compare(b));
    
    // Create multisig redeem script (2 of 2/3)
    const redeemScript = bitcoin.payments.p2ms({
      m: 2,
      pubkeys,
      network,
    });

    // Create P2SH address
    const p2sh = bitcoin.payments.p2sh({
      redeem: redeemScript,
      network,
    });

    if (!p2sh.address || !redeemScript.output) {
      throw new Error('Failed to generate multisig address');
    }

    return {
      escrowAddress: p2sh.address,
      redeemScript: redeemScript.output.toString('hex'),
    };
  } catch (error) {
    console.error('Error generating multisig address:', error);
    throw new Error('Failed to generate multisig address');
  }
}

/**
 * Generate a new key pair for a user
 */
export async function generateKeyPair() {
  const keyPair = ECPair.makeRandom();
  return {
    publicKey: keyPair.publicKey.toString('hex'),
    privateKey: keyPair.privateKey!.toString('hex'),
  };
}

/**
 * Encrypt data using AES-GCM
 */
export async function encryptData(data: string, key: string): Promise<string> {
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(data);
  const encodedKey = await webcrypto.subtle.importKey(
    'raw',
    Buffer.from(key, 'hex'),
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  );

  const encryptedData = await webcrypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    encodedKey,
    encodedData
  );

  const encryptedArray = new Uint8Array(encryptedData);
  const result = new Uint8Array(iv.length + encryptedArray.length);
  result.set(iv);
  result.set(encryptedArray, iv.length);

  return Buffer.from(result).toString('base64');
}

/**
 * Decrypt data using AES-GCM
 */
export async function decryptData(encryptedData: string, key: string): Promise<string> {
  const data = Buffer.from(encryptedData, 'base64');
  const iv = data.slice(0, 12);
  const encryptedContent = data.slice(12);

  const encodedKey = await webcrypto.subtle.importKey(
    'raw',
    Buffer.from(key, 'hex'),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  );

  const decryptedData = await webcrypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    encodedKey,
    encryptedContent
  );

  return new TextDecoder().decode(decryptedData);
}

/**
 * Sign a message with a private key
 */
export function signMessage(message: string, privateKey: string): string {
  const keyPair = ECPair.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  const messageHash = bitcoin.crypto.sha256(Buffer.from(message));
  const signature = keyPair.sign(messageHash);
  return signature.toString('hex');
}

/**
 * Verify a message signature
 */
export function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  try {
    const keyPair = ECPair.fromPublicKey(Buffer.from(publicKey, 'hex'));
    const messageHash = bitcoin.crypto.sha256(Buffer.from(message));
    return keyPair.verify(messageHash, Buffer.from(signature, 'hex'));
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
} 