import { NextResponse } from 'next/server';
import Admin from 'src/lib/models/Admin';

export async function GET() {
  try {
    const admins = await Admin.find().exec();
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching admins' }, { status: 500 });
  }
}