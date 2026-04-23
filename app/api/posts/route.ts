/**
 * POST /api/posts - Create new post
 * GET /api/posts - List all posts
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPost, getAllPosts } from '@/lib/posts';
import { CreatePostInput } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    let posts = getAllPosts();

    // Filter by category if provided
    if (category) {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by tag if provided
    if (tag) {
      posts = posts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );
    }

    // Filter by search query if provided
    if (search) {
      const lowerSearch = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerSearch) ||
          p.excerpt.toLowerCase().includes(lowerSearch) ||
          p.tags.some((t) => t.toLowerCase().includes(lowerSearch))
      );
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreatePostInput;

    // Validate required fields
    if (!body.title || !body.content || !body.excerpt || !body.author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const post = createPost(body);

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
