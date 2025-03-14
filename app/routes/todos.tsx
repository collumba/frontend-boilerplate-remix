import { Layout } from "@components/Layout";
import { useTodos } from "@hooks/useTodos";
import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Todo List | Remix Boilerplate" },
    {
      name: "description",
      content: "A simple todo list application built with Remix",
    },
  ];
};

export default function TodosPage() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompletedTodos } =
    useTodos();

  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return;
    addTodo(newTodoText);
    setNewTodoText("");
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Gerenciador de Tarefas
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex mb-6">
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="Adicionar nova tarefa..."
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Adicionar
            </button>
          </div>

          {todos.length > 0 ? (
            <>
              <ul className="space-y-3 mb-6">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="mr-3 h-5 w-5 text-blue-500 rounded"
                      />
                      <span
                        className={`${
                          todo.completed
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : "text-gray-800 dark:text-white"
                        }`}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label="Delete todo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <div>
                  {completedCount} de {totalCount} tarefas concluídas
                </div>
                {completedCount > 0 && (
                  <button
                    onClick={clearCompletedTodos}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    Limpar tarefas concluídas
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Nenhuma tarefa adicionada ainda.</p>
              <p>Adicione uma tarefa acima para começar!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
