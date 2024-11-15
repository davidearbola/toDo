import React, { useEffect } from "react";
import { TodoItem } from "../types";
import { ToDoList } from "./ToDoList";
import { PageManager } from "./PageManager";
import { ToDoForm } from "./ToDoForm";

export const ToDoContainer = () => {
	const [todos, setTodos] = React.useState<TodoItem[]>(() => {
		const localData = localStorage.getItem("todos");
		return localData ? JSON.parse(localData) : [];
	});
	const [todosPerPage, setTodosPerPage] = React.useState(3);
	const [currentPage, setCurrentPage] = React.useState(1);

	const indexOfLastTodo = currentPage * todosPerPage;
	const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	const currentToDos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

	const removeToDo = (id: string) => {
		const updatedToDos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedToDos);
	};

	const updateToDo = (id: string) => {
		const updatedToDos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					state: todo.state === "todo" ? ("done" as const) : ("todo" as const),
				};
			}
			return todo;
		});
		setTodos(updatedToDos);
	};

	const handleToDoPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTodosPerPage(parseInt(e.target.value));
	};

	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="bg-neutral-800 p-4 rounded-md w-auto">
			<div className="flex flex-col items-center justify-between space-y-4">
				<ToDoForm todos={todos} setTodos={setTodos} />
				{todos.length > 0 ? (
					<div className="flex flex-col items-center justify-between space-y-4 w-full">
						<ToDoList currentToDos={currentToDos} updateToDo={updateToDo} removeToDo={removeToDo} />
						<PageManager todosPerPage={todosPerPage} todos={todos} paginate={paginate} handletodosPerPage={handleToDoPerPage} />
					</div>
				) : (
					<p className="bg-neutral-900 p-4 rounded-md w-auto">Aggiungi il tuo primo ToDo</p>
				)}
			</div>
		</div>
	);
};
