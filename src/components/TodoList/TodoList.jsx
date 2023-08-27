import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, deleteTodo, editTodo, toggleTodo} from "../../store/Todo/TodoSlice";

const TodoList = () => {
    const [task, setTask] = useState('')
    const [editingTodoId, setEditingTodoId] = useState('')
    const [editingTodoTitle, setEditingTodoTitle] = useState('')
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.trim() !== '') {
            dispatch(addTodo({
                title: task
            }))
            setTask('')
        } else {
            alert('Enter task!')
        }
    }

    const handleEdit = (todoId, todoTitle) => {
        setEditingTodoId(todoId)
        setEditingTodoTitle(todoTitle)
    }

    const handleSaveEdit = (todoId, newTitle) => {
        if (newTitle.trim() !== '') {
            dispatch(editTodo({id: todoId, title: newTitle}))
            setEditingTodoId('')
            setEditingTodoTitle('')
        } else {
            alert('No task added!')
        }
    }

    const handleToggle = (todoId) => {
        dispatch(toggleTodo(todoId));
    }

    const handleDelete = (todoId) => {
        dispatch(deleteTodo(todoId))
    }

    return (
        <div className='todo'>
            <h2>To-Do List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={'Enter a task'}
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button type='submit'>Add Task</button>
            </form>
            <h4>Tasks</h4>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                        />
                        {editingTodoId === todo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingTodoTitle}
                                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(todo.id, editingTodoTitle)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span className={todo.completed ? 'completed' : ''}>{todo.title}{' '}</span>
                                <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
                                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;