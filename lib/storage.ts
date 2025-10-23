import { Todo } from './types';

// ⚠️ WARNING: This in-memory storage is NOT persistent!
// Data resets when serverless function goes cold.
// Perfect for demonstrating why we need databases! 🎓

let todos: Todo[] = [];

export const storage = {
  getAll: () => todos,
  add: (todo: Todo) => {
    todos.push(todo);
    return todo;
  },
  remove: (id: string) => {
    todos = todos.filter(t => t.id !== id);
    return true;
  },
  update: (id: string, updatedTodo: Todo) => {
    todos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
    return updatedTodo;
  },
  get: (id: string) => {
    return todos.find(t => t.id === id);
  },
  clear: () => {
    todos = [];
  }
};
