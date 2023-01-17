import { combineReducers } from "redux";
import { todoReducer } from "./reducers/todoReducer"

export const rootReducer = combineReducers({
    todoReducer
})