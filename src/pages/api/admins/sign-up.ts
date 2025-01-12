import { NextResponse } from 'next/server';
import Admin from 'src/lib/models/Admin';

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();
    const newAdmin = await Admin.create({ email, password, fullName });
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating admin' }, { status: 500 });
  }
}