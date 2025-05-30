import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { PaymentMethod, Network } from '@/generated/prisma';

// Input validation schema
const CreateOfferSchema = z.object({
  userId: z.string().min(1),
  amount: z.number().positive(),
  price: z.number().positive(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  network: z.nativeEnum(Network),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { userId, amount, price, paymentMethod, network } = CreateOfferSchema.parse(body);

    // Check if user exists and is verified
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'User not verified' },
        { status: 403 }
      );
    }

    // Create new offer
    const offer = await prisma.offer.create({
      data: {
        userId,
        amount,
        price,
        paymentMethod,
        network,
        status: 'OPEN',
      },
      include: {
        user: {
          select: {
            phone: true,
            isVerified: true,
          },
        },
      },
    });

    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Offer creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 