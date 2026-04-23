import { NextRequest, NextResponse } from 'next/server';
import { createCategory, getAllCategories } from '@/lib/cms';
import { CreateCategoryInput } from '@/lib/types';

export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json({ success: true, data: categories, count: categories.length });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateCategoryInput;
    if (!body.name?.trim()) {
      return NextResponse.json({ success: false, error: 'Nome é obrigatório' }, { status: 400 });
    }

    const category = createCategory(body);
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create category';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
