import { ITodo } from "../../../types/todo.types.ts";

const todos = Array(50).fill(1).map((_, i) =>
  new ITodo({ id: i, memo: `제목${i}`, name: `제목${i}` })
);

export const data = { todos };
