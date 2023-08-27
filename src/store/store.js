import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./Todo/TodoSlice";

export const store = configureStore({
    reducer: {
        todos: todoSlice
    }
})