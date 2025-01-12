import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import Admin from 'src/lib/models/Admin';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    const admin = await Admin.findOne({
      passwordResetToken: token,
      passwordResetExpiresAt: { $gt: new Date() },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Invalid token or token has expired' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    admin.password = hashedPassword;
    admin.passwordResetToken = null;
    admin.passwordResetExpiresAt = null;
    await admin.save();

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 });
  }
}