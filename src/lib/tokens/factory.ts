import { Network } from '@/generated/prisma';
import { TRC20Handler } from './trc20';
import { ERC20Handler } from './erc20';

export class TokenFactory {
  private static instance: TokenFactory;
  private handlers: Map<Network, TRC20Handler | ERC20Handler>;

  private constructor() {
    this.handlers = new Map();
  }

  public static getInstance(): TokenFactory {
    if (!TokenFactory.instance) {
      TokenFactory.instance = new TokenFactory();
    }
    return TokenFactory.instance;
  }

  public getHandler(network: Network): TRC20Handler | ERC20Handler {
    if (!this.handlers.has(network)) {
      switch (network) {
        case Network.TRC20:
          this.handlers.set(network, new TRC20Handler());
          break;
        case Network.ERC20:
          this.handlers.set(network, new ERC20Handler('ETH'));
          break;
        case Network.POLYGON:
          this.handlers.set(network, new ERC20Handler('POLYGON'));
          break;
        default:
          throw new Error(`Unsupported network: ${network}`);
      }
    }

    return this.handlers.get(network)!;
  }

  public async getBalance(network: Network, address: string): Promise<string> {
    const handler = this.getHandler(network);
    return handler.getBalance(address);
  }

  public async isTransactionConfirmed(
    network: Network,
    txId: string
  ): Promise<boolean> {
    const handler = this.getHandler(network);
    return handler.isTransactionConfirmed(txId);
  }

  public async getTransactionDetails(network: Network, txId: string) {
    const handler = this.getHandler(network);
    return handler.getTransactionDetails(txId);
  }

  public async releaseUSDT(
    network: Network,
    escrowAddress: string,
    buyerAddress: string,
    amount: string,
    signatures: string[]
  ): Promise<string> {
    const handler = this.getHandler(network);
    return handler.releaseUSDT(escrowAddress, buyerAddress, amount, signatures);
  }

  public async refundUSDT(
    network: Network,
    escrowAddress: string,
    sellerAddress: string,
    amount: string,
    signatures: string[]
  ): Promise<string> {
    const handler = this.getHandler(network);
    return handler.refundUSDT(escrowAddress, sellerAddress, amount, signatures);
  }
} 