import { NextResponse } from 'next/server';
import Blog from 'src/lib/models/Blog';

export async function GET() {
  try {
    const blogs = await Blog.find().populate('author');
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting blog' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      title,
      content,
      published,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    } = await request.json();

    const newBlog = await Blog.create({
      title,
      content,
      published,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      content,
      published,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    } = await request.json();

    const updatedBlog = await Blog.findByIdAndUpdate(id, {
      title,
      content,
      published,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    }, { new: true });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating blog' }, { status: 500 });
  }
}