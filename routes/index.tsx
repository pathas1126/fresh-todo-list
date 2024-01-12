import { Handlers, PageProps } from "$fresh/server.ts";
import { TodoList } from "../islands/TodoList.tsx";
import { ITodo } from "../types/todo.types.ts";
import { asset } from "$fresh/runtime.ts";
import data from "../data.json" with { type: "json" };
import data2 from "../static/data.json" with { type: "json" };

interface HomeContext {
  todos: ITodo[];
}

export const handler: Handlers<HomeContext> = {
  async GET(req, ctx) {
    const todos = await (await fetch(
      `${req.url}api/todos`,
      {
        method: "GET",
      },
    )).json();

    return ctx.render({ todos });
  },
};

export default function Home(props: PageProps<HomeContext>) {
  // console.log(data);
  // console.log(data2);
  console.log(asset("/data.json"));

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
      <TodoList
        todos={props.data.todos}
      />
    </div>
  );
}
