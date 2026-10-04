import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(
      { success: true, message: 'Order created successfully', data: body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid order payload' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Orders API endpoint operational' });
}