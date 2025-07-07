import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


//récupère les tricheurs
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cheaters ORDER BY complaint_count DESC');
    return NextResponse.json(result.rows);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cheaters' },
      { status: 500 }
    );
  }
}

// Ajoute un tricheur
export async function POST(request: NextRequest) {
  try {
    const { steam_profile_url, video_url } = await request.json();
    
    const result = await pool.query(
      'INSERT INTO cheaters (steam_profile_url, video_url) VALUES ($1, $2) RETURNING *',
      [steam_profile_url, video_url]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to report cheater' },
      { status: 500 }
    );
  }
}