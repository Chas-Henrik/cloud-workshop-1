import mongoose, { InferSchemaType, Types } from "mongoose";

const todoSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
    updatedAt: { 
        type: Date, 
        default: Date.now
    }
});


export type TodoBaseType = InferSchemaType<typeof todoSchema>;
export type TodoType = TodoBaseType & { _id: Types.ObjectId };
export type TodoJSONType = Partial<TodoBaseType> & { _id: string };

export const serializeTodo = (todo: TodoType): TodoJSONType => ({
	_id: todo._id.toString(),
	text: todo.text,
	completed: todo.completed,
	createdAt: todo.createdAt,
	updatedAt: todo.updatedAt
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
