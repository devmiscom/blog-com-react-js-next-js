import { NextRequest, NextResponse } from 'next/server';
import { deletePage, updatePage } from '@/lib/cms';
import { CreatePageInput } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<CreatePageInput>;
    const page = updatePage(id, body);

    if (!page) {
      return NextResponse.json({ success: false, error: 'Página não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update page';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deletePage(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Página não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Página removida' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete page' }, { status: 500 });
  }
}
