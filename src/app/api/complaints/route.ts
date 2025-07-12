import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sort = searchParams.get('sort') || 'createdAt:desc';

    const [sortField, sortOrder] = sort.split(':');
    const skip = (page - 1) * limit;

    const complaints = await prisma.complaint.findMany({
      skip,
      take: limit,
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
        [sortField]: sortOrder as 'asc' | 'desc',
      },
    });

    const totalComplaints = await prisma.complaint.count();
    const totalPages = Math.ceil(totalComplaints / limit);

    return NextResponse.json({
      complaints,
      totalPages,
      currentPage: page,
    });
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