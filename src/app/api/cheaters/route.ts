import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cheaters = await prisma.cheater.findMany({
      orderBy: {
        complaintCount: 'desc',
      },
    });
    return NextResponse.json(cheaters);
    
  } catch (error) {
    console.error('Error reporting cheater:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cheaters' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { steamProfileUrl, videoUrl } = await request.json();
    
    const cheater = await prisma.cheater.create({
      data: {
        steamProfileUrl,
        videoUrl,
      },
    });
    
    return NextResponse.json(cheater, { status: 201 });
  } catch (error) {
    console.error('Error reporting cheater:', error);
    return NextResponse.json(
      { error: 'Failed to report cheater' },
      { status: 500 }
    );
  }
}