import { useEffect, useState } from "react";
import type { TodoItem } from "~/components/Todo";

export function useTodos(initialTodos: TodoItem[] = []) {
  // Try to load todos from localStorage on initial render
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    if (typeof window === "undefined") return initialTodos;

    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : initialTodos;
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      return initialTodos;
    }
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("Error saving todos to localStorage:", error);
      }
    }
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === "") return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompletedTodos,
  };
}
