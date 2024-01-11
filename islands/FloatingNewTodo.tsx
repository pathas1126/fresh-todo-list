import { useSignal } from "@preact/signals";
import { ITodo } from "../types/todo.types.ts";

export const FloatingNewTodo = (
  { onCreate }: {
    onCreate: (todo: ITodo) => void;
  },
) => {
  const openSignal = useSignal(false);
  const initialValue = { name: "", memo: "" };
  const createTodoInfo = useSignal({ ...initialValue });

  const createTodo = async (
    { memo, name }: { name: string; memo: string },
  ) => {
    const response = await fetch(`/api/todos`, {
      body: JSON.stringify({ memo, name }),
      method: "POST",
    });
    const data = await response.json();
    return data;
  };

  const handleCreateTodo = async () => {
    try {
      const createdTodo = await createTodo({
        name: createTodoInfo.value.name,
        memo: createTodoInfo.value.memo,
      }) as ITodo;
      createTodoInfo.value = initialValue;
      onCreate?.(createdTodo);
    } catch (error) {
      alert(`Todo 생성 실패!`);
    }
  };

  return (
    <div>
      <button
        onClick={() => openSignal.value = !openSignal.value}
        class="w-[70px] h-[70px] fixed right-10 bottom-10 bg-indigo-600 rounded-full text-white text-3xl shadow-lg"
      >
        🚀
      </button>
      {openSignal.value && (
        <div class="fixed right-10 bottom-[120px] max-w-sm p-6 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <input
              placeholder="제목을 입력하세요."
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              value={createTodoInfo.value.name}
              onChange={(e) => {
                createTodoInfo.value.name =
                  (e.target as HTMLInputElement).value;
              }}
            />
          </div>
          <div>
            <textarea
              placeholder="메모를 입력하세요."
              class="w-full h-full mb-3 font-normal text-gray-700 dark:text-gray-400 resize-none"
              value={createTodoInfo.value.memo}
              onChange={(e) => {
                createTodoInfo.value.memo =
                  (e.target as HTMLTextAreaElement).value;
              }}
            />
          </div>
          <button
            onClick={handleCreateTodo}
            class="self-end px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            작성
          </button>
        </div>
      )}
    </div>
  );
};
