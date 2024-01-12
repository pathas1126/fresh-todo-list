import { TodoList } from "../islands/TodoList.tsx";

export default function Home() {
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
      <TodoList />
    </div>
  );
}
