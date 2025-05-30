import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const VerifySchema = z.object({
  phone: z.string().min(8).max(20),
  code: z.string().length(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { phone, code } = VerifySchema.parse(body);

    // Find and verify user
    const result = await prisma.user.updateMany({
      where: {
        phone,
        code,
        isVerified: false,
      },
      data: {
        isVerified: true,
        code: null, // Clear verification code after successful verification
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: 'Invalid verification code or user already verified' },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 