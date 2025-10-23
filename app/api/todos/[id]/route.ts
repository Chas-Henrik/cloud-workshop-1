import { NextRequest, NextResponse } from 'next/server';
import { TodoBaseType, TodoType, TodoJSONType, serializeTodo, Todo } from '@/models/todo.model'
import { connectDB } from '@/lib/db';

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

  await connectDB();
  await Todo.findByIdAndDelete(id);

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

  await connectDB();
  const todo = await Todo.findById(id);

  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }

  const updatedTodo: TodoType = {
    _id: todo.id,
    text: todo.text,
    completed: completed,
    updatedAt: new Date(),
    createdAt: todo.createdAt,
  };
  const result = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });

  return NextResponse.json({ todo: result });
}
