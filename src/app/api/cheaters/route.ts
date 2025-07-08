import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cheaters = await prisma.cheater.findMany({
      include: {
        complaints: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
      orderBy: {
        complaintCount: 'desc',
      },
    });
    return NextResponse.json(cheaters);
  } catch (error) {
    console.error('Error fetching cheaters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cheaters' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { steamProfileUrl } = await request.json();
    
    const cheater = await prisma.cheater.create({
      data: {
        steamProfileUrl,
      },
    });
    
    return NextResponse.json(cheater, { status: 201 });
  } catch (error) {
    console.error('Error creating cheater:', error);
    return NextResponse.json(
      { error: 'Failed to create cheater' },
      { status: 500 }
    );
  }
}