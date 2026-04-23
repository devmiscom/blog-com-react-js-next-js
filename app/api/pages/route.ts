import { NextRequest, NextResponse } from 'next/server';
import { createPage, getAllPages } from '@/lib/cms';
import { CreatePageInput } from '@/lib/types';

export async function GET() {
  try {
    const pages = getAllPages();
    return NextResponse.json({ success: true, data: pages, count: pages.length });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePageInput;
    if (!body.title?.trim() || !body.description?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Título, descrição e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    const page = createPage(body);
    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create page';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
