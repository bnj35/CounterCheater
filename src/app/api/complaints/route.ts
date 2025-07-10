import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const complaints = await prisma.complaint.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        cheater: {
          select: {
            id: true,
            steamProfileUrl: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, cheaterId, videoUrl, description } = await request.json();
    
    const complaint = await prisma.complaint.create({
      data: {
        userId,
        cheaterId,
        videoUrl,
        description,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        cheater: {
          select: {
            steamProfileUrl: true,
          },
        },
      },
    });
    
    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    console.error('Error creating complaint:', error);
    return NextResponse.json(
      { error: 'Failed to create complaint' },
      { status: 500 }
    );
  }
}