import { Handlers } from "$fresh/server.ts";
import { ITodo, UpdateTodoDTO } from "../../../types/todo.types.ts";
import { getData, setData } from "./repository.ts";

export const handler: Handlers<ITodo> = {
  async PUT(req, ctx) {
    const id = Number(ctx.params.id);

    if (isNaN(id)) throw new Error("wrong id");

    const data = await getData();
    const todoUpdateDTO = (await req.json()) as UpdateTodoDTO;

    const target = data.todos.find((todo) => todo.id === id);

    if (!target) throw new Error("target x");

    const updateTarget = new ITodo({ ...target, ...todoUpdateDTO });
    target.name = updateTarget.name;
    target.memo = updateTarget.memo;
    target.updatedAt = updateTarget.updatedAt;

    setData(data.todos);

    return new Response(JSON.stringify(target));
  },
  async DELETE(_req, ctx) {
    const id = Number(ctx.params.id);
    if (isNaN(id)) throw new Error("wrong id");

    const data = await getData();
    const target = data.todos.find((todo) => todo.id === id);

    if (!target) throw new Error("target x");

    setData(data.todos.filter((todo) => todo.id !== id));

    return new Response(JSON.stringify(target));
  },
};
