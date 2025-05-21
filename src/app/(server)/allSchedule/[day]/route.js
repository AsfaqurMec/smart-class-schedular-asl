import { NextResponse } from 'next/server';
import { connectDB } from "../../../../lib/connectDB"


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day');

  try {
     const db = await connectDB();
     const collection = db.collection('availability');

    let query = {};
    if (day) {
      query.day = day; // 'YYYY-MM-DD' format
    }

    const service = await collection.find(query).toArray();

    return NextResponse.json({ service });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
