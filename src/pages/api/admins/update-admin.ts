import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Admin from 'src/lib/models/Admin';

export async function PUT(request: Request) {
  try {
    const { id, email, password, fullName } = await request.json();

    const admin = await Admin.findById(id);

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    admin.email = email;
    admin.fullName = fullName;
    await admin.save();

    return NextResponse.json(admin);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating admin' }, { status: 500 });
  }
}