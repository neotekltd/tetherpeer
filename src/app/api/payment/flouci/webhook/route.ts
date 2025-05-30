import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FlouciPaymentProvider } from '@/lib/payment/flouci';
import { TradeStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const flouci = new FlouciPaymentProvider();

    // Verify webhook signature
    if (!flouci.verifyWebhook(payload)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Update trade status based on payment status
    const trade = await prisma.trade.findFirst({
      where: { id: payload.orderId },
    });

    if (!trade) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    let newStatus: TradeStatus;
    switch (payload.status) {
      case 'COMPLETED':
        newStatus = TradeStatus.PAYMENT_CONFIRMED;
        break;
      case 'FAILED':
        newStatus = TradeStatus.PAYMENT_PENDING;
        break;
      default:
        newStatus = TradeStatus.PAYMENT_SENT;
    }

    await prisma.trade.update({
      where: { id: trade.id },
      data: { status: newStatus },
    });

    // If payment is confirmed, trigger USDT release
    if (newStatus === TradeStatus.PAYMENT_CONFIRMED) {
      // TODO: Implement USDT release logic
      // This should be done through a separate worker process
      // to handle blockchain interactions
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Flouci webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 