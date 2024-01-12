import { Data, ITodo } from "../../../types/todo.types.ts";
import { data } from "./db.ts";

export const getData = async (): Promise<Data> => {
  return await new Promise((resolve) => resolve(data));
};
export const setData = async (todos: ITodo[]): Promise<void> =>
  await await new Promise((resolve) => {
    data.todos = todos;
    resolve();
  });
