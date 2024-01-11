import { Handlers } from "$fresh/server.ts";
import { CreateTodoDTO, ITodo } from "../../../types/todo.types.ts";
import { getData, setData } from "./repository.ts";

export const handler: Handlers<ITodo> = {
  async GET(_req, _ctx) {
    const data = await getData();
    return new Response(
      JSON.stringify(
        [...data.todos].sort((a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        ),
      ),
    );
  },
  async POST(req, _ctx) {
    const todo = (await req.json()) as CreateTodoDTO;
    const createdTodo = new ITodo({ name: todo.name, memo: todo.memo });
    const data = await getData();
    data.todos = [...data.todos, createdTodo];
    setData(data.todos);
    return new Response(JSON.stringify(createdTodo));
  },
};
