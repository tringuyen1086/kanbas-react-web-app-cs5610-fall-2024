import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const createTodo = async () => {
        const todos = await client.createTodo();
        setTodos(todos);
    };
    
    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };
    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };
    
    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <div id="wd-asynchronous-arrays">
        <h3>Working with Arrays Asynchronously</h3>
        <h4>Todos
            <FaPlusCircle onClick={createTodo} className="text-success float-end fs-3"
                            id="wd-create-todo" /> </h4>

        <ul className="list-group">
            {todos.map((todo) => (
            <li key={todo.id} className="list-group-item">
                <FaTrash onClick={() => removeTodo(todo)}
                    className="text-danger float-end mt-1" id="wd-remove-todo"/>

                <input type="checkbox" className="form-check-input me-2"
                    defaultChecked={todo.completed}/>
                <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
                </span>
            </li>
            ))}
        </ul> <hr />
        </div>
);}


