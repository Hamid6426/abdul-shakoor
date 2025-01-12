import { NextResponse } from 'next/server';
import Admin from 'src/lib/models/Admin';

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting admin' }, { status: 500 });
  }
}