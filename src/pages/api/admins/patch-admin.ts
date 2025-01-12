import { NextResponse } from 'next/server';
import { URL } from 'url';
import Admin from 'src/lib/models/Admin';

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    const { fullName, email } = await request.json();

    const updatedAdmin = await Admin.findByIdAndUpdate(id, { fullName, email }, { new: true });
    return NextResponse.json(updatedAdmin);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating admin' }, { status: 500 });
  }
}