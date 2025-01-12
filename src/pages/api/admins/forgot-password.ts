import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Admin from 'src/lib/models/Admin';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    admin.passwordResetToken = token;
    admin.passwordResetExpiresAt = expiresAt;
    await admin.save();


    
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // or 'STARTTLS'
      auth: {
        user: 'username',
        pass: 'password',
      },
    });

    if (!admin.email) {
      return NextResponse.json({ error: 'Admin email not found' }, { status: 404 });
    }

    const mailOptions = {
      from: 'your-email@example.com',
      to: admin?.email,
      subject: 'Password Reset',
      text: `Hello,
     
     To reset your password, please click on this link: http://example.com/reset-password/${token}
     
     Best regards,
     Your Name`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    return NextResponse.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending password reset email' }, { status: 500 });
  }
}