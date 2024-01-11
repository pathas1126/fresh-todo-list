import { Data, ITodo } from "../../../types/todo.types.ts";

export const getData = async (): Promise<Data> =>
  JSON.parse(await Deno.readTextFile("data.json")) as Data;

export const setData = async (todos: ITodo[]): Promise<void> =>
  await Deno.writeTextFile(
    "data.json",
    JSON.stringify({ todos }),
  );
