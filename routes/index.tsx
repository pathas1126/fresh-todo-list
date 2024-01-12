import { Handlers, PageProps } from "$fresh/server.ts";
import { TodoList } from "../islands/TodoList.tsx";
import { ITodo } from "../types/todo.types.ts";

interface HomeContext {
  todos: ITodo[];
}

export const handler: Handlers<HomeContext> = {
  async GET(_req, ctx) {
    console.log(_req.url);
    try {
      const todos = await (await fetch(
        `${_req.url}api/todos`,
        {
          method: "GET",
        },
      )).json();
      return ctx.render({ todos });
    } catch (error) {
      console.log(error);
      return ctx.render({ todos: [] });
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

      <TodoList
        todos={props.data.todos}
      />
    </div>
  );
}
