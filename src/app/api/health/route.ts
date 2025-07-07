import { NextResponse } from 'next/server';

// vérfication de la connexion à la base de données
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
}