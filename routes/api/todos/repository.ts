import { resolve } from "$std/path/resolve.ts";
import { Data, ITodo } from "../../../types/todo.types.ts";

// export const getData = async (): Promise<Data> => {
//   return await new Promise((resolve) => resolve(data));
// };
// export const setData = async (todos: ITodo[]): Promise<void> =>
//   await await new Promise((resolve) => {
//     data.todos = todos;
//     resolve();
//   });

const path = resolve(Deno.cwd(), "data.json");
export const getData = async (): Promise<Data> => {
  return JSON.parse(await Deno.readTextFile(path)) as Data;
};
export const setData = async (todos: ITodo[]): Promise<void> =>
  await Deno.writeTextFile(
    path,
    JSON.stringify({ todos }),
  );
