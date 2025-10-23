import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  storage.remove(id);

  return NextResponse.json({ success: true });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { completed } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: 'ID is required' },
      { status: 400 }
    );
  }

  const todo = storage.get(id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  const updatedTodo = { ...todo, completed };
  storage.update(id, updatedTodo);

  return NextResponse.json({ todo: updatedTodo });
}
