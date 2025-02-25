/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import Search from "../Search/Search";
import Sorting from "../Sorting/Sorting";
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons for Edit and Remove
import styles from './TodoContainer.module.css';

const request = async (method, type, body, url) => {
    const options = {
        method: method,
        headers: {
            "Content-Type": type,
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: body,
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error has occurred: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Request error:", error.message);
        return null;
    }
};

const TodoContainer = () => {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const _apiBase = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        setIsLoading(true);
        const data = await request("GET", "application/json", null, _apiBase);
        console.log("Raw API response:", data);

        if (!data || !data.records) {
            console.error("No valid data or records received");
            setTodoList([]);
            setIsLoading(false);
            return;
        }

        const todos = data.records
            .map((todo) => ({
                id: todo.id,
                title: todo.fields.title || "Untitled",
                completed: todo.fields.completed || false,
                date: todo.createdTime,
            }))
            .sort((a, b) => a.title.localeCompare(b.title));

        console.log("Processed todos:", todos);
        setTodoList(todos);
        setIsLoading(false);
    };

    const addTodo = async (todoTitle) => {
        const addedTodo = { fields: { title: todoTitle } };
        const data = await request("POST", "application/json", JSON.stringify(addedTodo), _apiBase);
        if (data) {
            const postedTodo = { id: data.id, title: data.fields.title };
            setTodoList((prevList) => [...prevList, postedTodo].sort((a, b) => a.title.localeCompare(b.title)));
        }
    };

    const removeTodo = async (id) => {
        const data = await request("DELETE", "application/json", null, `${_apiBase}/${id}`);
        if (data) {
            setTodoList((prevList) => prevList.filter((todo) => todo.id !== id));
        }
    };

    const editTodo = async (id, title) => {
        if (!newTitle.trim()) return;
        const editedTodo = { fields: { title: newTitle } };
        const data = await request("PATCH", "application/json", JSON.stringify(editedTodo), `${_apiBase}/${id}`);
        if (data) {
            setTodoList((prevList) =>
                prevList.map((todo) => (todo.id === data.id ? { ...todo, title: data.fields.title } : todo))
            );
            setEditingTodo(null);
            setNewTitle("");
        }
    };

    const changeTodoStatus = async (id, value) => {
        console.log("Changing status for ID:", id, "to:", value);
        const todoStatus = { fields: { completed: value } };
        const data = await request("PATCH", "application/json", JSON.stringify(todoStatus), `${_apiBase}/${id}`);
        console.log("PATCH response for status change:", data);
        if (data) {
            setTodoList((prevList) =>
                prevList.map((todo) =>
                    todo.id === data.id ? { ...todo, completed: data.fields.completed || false } : todo
                )
            );
        } else {
            console.error("Failed to update todo status");
        }
    };

    const handleSearch = (value) => setSearchTerm(value);

    const searchedTodos = todoList.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortTodos = (value) => {
        switch (value) {
            case "titleDesc":
                setTodoList((prevTodoList) => [...prevTodoList].sort((a, b) => (a.title < b.title ? 1 : -1)));
                break;
            case "dateAsc":
                setTodoList((prevTodoList) => [...prevTodoList].sort((a, b) => new Date(a.date) - new Date(b.date)));
                break;
            case "dateDesc":
                setTodoList((prevTodoList) => [...prevTodoList].sort((a, b) => new Date(b.date) - new Date(a.date)));
                break;
            default:
                setTodoList((prevTodoList) => [...prevTodoList].sort((a, b) => (a.title < b.title ? -1 : 1)));
        }
    };

    console.log("Render - isLoading:", isLoading, "todoList:", todoList, "searchedTodos:", searchedTodos, "editingTodo:", editingTodo);

    return (
        <div className={styles.todoWrapper}>
            <AddTodoForm onAddTodo={addTodo} />
            <Search onSearch={handleSearch} searchTerm={searchTerm} />
            <div className={styles.sortFilterWrapper}>
                <Sorting onSort={sortTodos} />
            </div>
            {isLoading ? (
                <p>Loading todos...</p>
            ) : todoList.length === 0 ? (
                <h2>No todos available</h2>
            ) : (
                <>
                    <h2>
                        {searchedTodos.length === 0
                            ? "No matching todos"
                            : `${searchedTodos.length} todo${searchedTodos.length === 1 ? "" : "s"} to work on`}
                    </h2>
                    <div className={styles.todoList}> {}
                        {searchedTodos.map((todo) => (
                            <div key={todo.id} className={styles.todoItem}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={(e) => changeTodoStatus(todo.id, e.target.checked)}
                                    className={styles.checkbox}
                                />
                                {editingTodo === todo.id ? (
                                    <div className={styles.editContainer}>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    editTodo(todo.id, todo.title);
                                                }
                                            }}
                                            autoFocus
                                            className={styles.editInput}
                                        />
                                        <button
                                            onClick={() => editTodo(todo.id, todo.title)}
                                            className={styles.saveButton}
                                        >
                                            ✓
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingTodo(null);
                                                setNewTitle("");
                                            }}
                                            className={styles.cancelButton}
                                        >
                                            ✗
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <span style={{ textDecoration: todo.completed ? "line-through" : "none" }} className={styles.todoTitle}>
                                            {todo.title}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setEditingTodo(todo.id);
                                                setNewTitle(todo.title);
                                            }}
                                            className={styles.editButton}
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            onClick={() => removeTodo(todo.id)}
                                            className={styles.removeButton}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoContainer;