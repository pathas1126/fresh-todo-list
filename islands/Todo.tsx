import { useSignal } from "@preact/signals";
import { ITodo } from "../types/todo.types.ts";

export const Todo = (
  { id, createdAt, memo, name, updatedAt, onDelete }:
    & { onDelete: (id: number) => void }
    & ITodo,
) => {
  let initialValue = { memo, name };
  const updateInfo = useSignal({ ...initialValue });

  const updateTodo = async (
    { id, memo, name }: { id: number; name: string; memo: string },
  ) => {
    const response = await fetch(`/api/todos/${id}`, {
      body: JSON.stringify({ memo, name }),
      method: "PUT",
    });
    const data = await response.json();
    return data;
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  };

  const handleUpdateTodo = async () => {
    try {
      initialValue = await updateTodo({
        id,
        memo: updateInfo.value.memo,
        name: updateInfo.value.name,
      });
    } catch (error) {
      setTimeout(() => {
        updateInfo.value = initialValue;
      });
    }
  };

  const handleDeleteTodo = async () => {
    try {
      const deletedTodo = await deleteTodo(id) as ITodo;
      onDelete?.(deletedTodo.id);
    } catch (error) {
      alert(`${id} Todo 삭제 실패!`);
    }
  };

  return (
    <div class="max-w-sm p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <input
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        value={updateInfo.value.name}
        onChange={(e) => {
          updateInfo.value.name = (e.target as HTMLInputElement).value;
        }}
        onBlur={handleUpdateTodo}
      />
      <textarea
        class="mb-3 font-normal text-gray-700 dark:text-gray-400 resize-none"
        value={updateInfo.value.memo}
        onChange={(e) => {
          updateInfo.value.memo = (e.target as HTMLTextAreaElement).value;
        }}
        onBlur={handleUpdateTodo}
      />
      <button
        onClick={handleDeleteTodo}
        class="self-end px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        삭제
      </button>
    </div>
  );
};
