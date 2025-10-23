export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface NewTodo {
  text: string;
  completed: boolean;
}
