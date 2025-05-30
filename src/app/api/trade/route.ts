import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateMultisigAddress } from '@/lib/crypto';
import { TradeStatus, Network, PaymentMethod } from '@/generated/prisma';
import { z } from 'zod';

// Input validation schema
const createTradeSchema = z.object({
  amount: z.number().positive(),
  priceInTND: z.number().positive(),
  network: z.enum([Network.TRC20, Network.ERC20, Network.POLYGON]),
  paymentMethod: z.enum([PaymentMethod.FLOUCI, PaymentMethod.D17]),
  sellerPublicKey: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createTradeSchema.parse(body);

    // Get seller from session (implement your auth logic)
    const sellerId = 'user_id_from_session';

    // Generate 2-of-3 multisig escrow address
    const { escrowAddress, redeemScript } = await generateMultisigAddress({
      sellerPubKey: validatedData.sellerPublicKey,
      platformPubKey: process.env.PLATFORM_PUBLIC_KEY!,
    });

    // Calculate expiration time (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Create trade record
    const trade = await prisma.trade.create({
      data: {
        escrowAddress,
        network: validatedData.network,
        amount: validatedData.amount,
        priceInTND: validatedData.priceInTND,
        totalTND: validatedData.amount * validatedData.priceInTND,
        sellerId,
        status: TradeStatus.CREATED,
        paymentMethod: validatedData.paymentMethod,
        expiresAt,
      },
      include: {
        seller: {
          select: {
            email: true,
            rating: true,
          },
        },
      },
    });

    // Store redeem script securely (implement your secure storage logic)
    // await storeRedeemScript(trade.id, redeemScript);

    return NextResponse.json({
      id: trade.id,
      escrowAddress: trade.escrowAddress,
      status: trade.status,
      expiresAt: trade.expiresAt,
    });
  } catch (error) {
    console.error('Trade creation error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get active trades (not completed, cancelled, or refunded)
    const trades = await prisma.trade.findMany({
      where: {
        status: {
          notIn: [TradeStatus.COMPLETED, TradeStatus.CANCELLED, TradeStatus.REFUNDED],
        },
      },
      include: {
        seller: {
          select: {
            email: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to 50 most recent trades
    });

    return NextResponse.json(trades);
  } catch (error) {
    console.error('Trade fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
} 