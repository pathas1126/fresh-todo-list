import { asset } from "$fresh/runtime.ts";
import { Data, ITodo } from "../../../types/todo.types.ts";
import { resolve } from "https://deno.land/std@0.211.0/path/mod.ts";

const path = resolve(Deno.cwd(), asset("data.json"));
export const getData = async (): Promise<Data> => {
  return JSON.parse(await Deno.readTextFile(path)) as Data;
};
export const setData = async (todos: ITodo[]): Promise<void> =>
  await Deno.writeTextFile(
    path,
    JSON.stringify({ todos }),
  );
