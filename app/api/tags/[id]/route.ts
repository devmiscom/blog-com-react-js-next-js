import { NextRequest, NextResponse } from 'next/server';
import { deleteTag, updateTag } from '@/lib/cms';
import { CreateTagInput } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<CreateTagInput>;
    const tag = updateTag(id, body);

    if (!tag) {
      return NextResponse.json({ success: false, error: 'Tag não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tag });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update tag';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = deleteTag(id);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Tag removida' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete tag' }, { status: 500 });
  }
}
