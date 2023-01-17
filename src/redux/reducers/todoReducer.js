import {
    ADD_TODO,
    FETCH_TODO,
    DELETE_ALL,
    REMOVE_TODO,
    UPDATE_CHECKBOX,
    UPDATE_TODO
} from "../actions/actions"

const initialState = {
    data: []
}

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODO:
            return {
                ...state,
                data: action.payload
            }

        case ADD_TODO:
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        case DELETE_ALL:
            return {
                data: []
            }

        case REMOVE_TODO:
            const filteredTodos = state.data.filter((todo) => todo.id !== action.payload)
            return {
                data: filteredTodos
            }

        case UPDATE_TODO:
            let data = action.payload
            const updatedArray = []
            state.data.map((item) => {
                if (item.id === data.id) {
                    item.id = data.id
                    item.title = data.title
                    item.completed = data.completed
                }
                updatedArray.push(item)
            })
            return {
                data: updatedArray
            }

        case UPDATE_CHECKBOX:
            let todoArray = []
            state.data.map((item) => {
                if (item.id === action.payload) {
                    item.completed = !item.completed
                }
                todoArray.push(item)
            })
            return {
                data: todoArray
            }

        default:
            return state
    }
}