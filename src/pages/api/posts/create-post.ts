import { NextResponse } from 'next/server';
import Post from 'src/lib/models/Post';

export async function POST(request: Request) {
  try {
    const {
      title,
      content,
      tags,
      summary,
      published,
      status,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    } = await request.json();
    const newPost = await Post.create({
      title,
      content,
      tags,
      summary,
      published,
      status,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await Post.find().populate('author');
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      id,
      title,
      content,
      tags,
      summary,
      published,
      status,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    } = await request.json();
    const updatedPost = await Post.findByIdAndUpdate(id, {
      title,
      content,
      tags,
      summary,
      published,
      status,
      authorId,
      metaTitle,
      metaDescription,
      thumbnail,
      topImage,
    }, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating post' }, { status: 500 });
  }
}