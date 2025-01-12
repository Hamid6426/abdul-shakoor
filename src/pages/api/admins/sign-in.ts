import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from 'src/lib/models/Admin';

const secretKey: string | undefined = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin) {
    return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
  }

  if (!admin.password) {
    return NextResponse.json({ error: 'Password not set' }, { status: 500 });
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ id: admin._id.toString() }, secretKey!, { expiresIn: '1h' });

  return NextResponse.json({ token });
}