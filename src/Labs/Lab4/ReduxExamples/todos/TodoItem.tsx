import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

// Define the type for the todo prop inline
export default function TodoItem({ todo }: { todo: { id: number; title: string } }) {
    const dispatch = useDispatch();
    return (
    <li key={todo.id} className="list-group-item d-flex align-items-center">
        {todo.title}
        
        <button onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
            className="btn btn-primary btn-md mx-2 ms-auto"> Edit </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="btn btn-danger btn-md"> Delete </button>
    </li>

);}

