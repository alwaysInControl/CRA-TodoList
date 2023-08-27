import {createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
        {id: 1, title: 'Task #1'},
        {id: 2, title: 'Task #2'},
        {id: 3, title: 'Task #3'},
        {id: 4, title: 'Task #4'},
        {id: 5, title: 'Task #5'},
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
            }
            state.push(newTodo)
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload)
        },
        editTodo: (state, action) => {
            const {id, title} = action.payload
            const todoEdited = state.find((todo) => todo.id === id)
            if (todoEdited) {
                todoEdited.title = title
            }
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    }
})

export const {addTodo, deleteTodo, editTodo, toggleTodo} = todoSlice.actions
export default todoSlice.reducer