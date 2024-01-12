import { Handlers, PageProps } from "$fresh/server.ts";
import { TodoList } from "../islands/TodoList.tsx";
import { ITodo } from "../types/todo.types.ts";
import { data } from "./api/todos/db.ts";

interface HomeContext {
  todos: ITodo[];
  test: string;
}

export const handler: Handlers<HomeContext> = {
  async GET(_req, ctx) {
    let test = "";
    try {
      test = `${ctx.url.origin}/api/todos`;
      const todos = await (await fetch(
        `${ctx.url.origin}/api/todos`,
        {
          method: "GET",
        },
      )).json();
      return ctx.render({ todos, test });
    } catch (error) {
      console.log(error);
      return ctx.render({ todos: [], test });
    }
  },
};

export default function Home(props: PageProps<HomeContext>) {
  return (
    <div class="w-screen h-screen mx-auto flex flex-col items-center justify-center border-2 bg-[#86efac]">
      <img
        class="my-6"
        src="/logo.svg"
        width="128"
        height="128"
        alt="the Fresh logo: a sliced lemon dripping with juice"
      />
      <h1 class="text-4xl font-bold">Fresh Todo List</h1>
      {props.data.test}
      <TodoList
        todos={props.data.todos}
      />
    </div>
  );
}
