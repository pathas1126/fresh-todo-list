import { useSignal } from "@preact/signals";
import { ITodo } from "../types/todo.types.ts";
import { Todo } from "./Todo.tsx";
import { FloatingNewTodo } from "./FloatingNewTodo.tsx";

export const TodoList = (
  { todos }: { todos: ITodo[] },
) => {
  const todosSignal = useSignal(todos);
  return (
    <div class="w-full h-full flex gap-4 overflow-y-auto flex-wrap p-5">
      {todosSignal.value?.length > 0
        ? todosSignal.value.map((todo) => (
          <Todo
            {...todo}
            key={todo.id}
            onDelete={(id) => {
              todosSignal.value = todosSignal.value
                .filter((item) => item.id !== id);
            }}
          />
        ))
        : null}
      <FloatingNewTodo
        onCreate={(todo) => {
          todosSignal.value = [todo, ...todosSignal.value];
        }}
      />
    </div>
  );
};
