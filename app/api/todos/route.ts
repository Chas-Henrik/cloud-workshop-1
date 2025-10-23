import { NextRequest, NextResponse } from 'next/server';
import { TodoBaseType, TodoType, TodoJSONType, serializeTodo, Todo } from '@/models/todo.model'
import { connectDB } from '@/lib/db';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const newTodo: TodoBaseType = {
      text: text.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
    };

    await connectDB();
    const addedTodo: TodoType = await Todo.create(newTodo);

    return NextResponse.json({ todo: serializeTodo(addedTodo) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const todos = await Todo.find()
    
    return NextResponse.json({
      todos: todos.map((todo: TodoType) => serializeTodo(todo))
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }

}

export async function DELETE() {
  try {
    await connectDB();
    await Todo.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todos:", error);
    return NextResponse.json(
      { error: 'Failed to delete todos' },
      { status: 500 }
    );
  }

}
