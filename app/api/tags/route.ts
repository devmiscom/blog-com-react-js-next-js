import { NextRequest, NextResponse } from 'next/server';
import { createTag, getAllTags } from '@/lib/cms';
import { CreateTagInput } from '@/lib/types';

export async function GET() {
  try {
    const tags = getAllTags();
    return NextResponse.json({ success: true, data: tags, count: tags.length });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch tags' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateTagInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ success: false, error: 'Nome é obrigatório' }, { status: 400 });
    }

    const tag = createTag(body);
    return NextResponse.json({ success: true, data: tag }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create tag';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
