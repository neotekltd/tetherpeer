import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Input validation schema
const SignupSchema = z.object({
  phone: z.string().min(8).max(20),
  code: z.string().length(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { phone, code } = SignupSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        phone,
        code,
        isVerified: false,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 