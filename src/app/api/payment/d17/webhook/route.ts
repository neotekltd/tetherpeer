import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { D17PaymentProvider } from '@/lib/payment/d17';
import { TradeStatus } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const d17 = new D17PaymentProvider();

    // Verify webhook signature
    if (!d17.verifyWebhook(payload)) {
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
        // For D17, we need SMS verification before confirming
        newStatus = TradeStatus.PAYMENT_SENT;
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

    // If SMS code is provided, verify it
    if (payload.smsCode && payload.status === 'COMPLETED') {
      const isValid = await d17.verifySmsCode(
        payload.transactionId,
        payload.smsCode
      );

      if (isValid) {
        await prisma.trade.update({
          where: { id: trade.id },
          data: { status: TradeStatus.PAYMENT_CONFIRMED },
        });

        // TODO: Implement USDT release logic
        // This should be done through a separate worker process
        // to handle blockchain interactions
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('D17 webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 