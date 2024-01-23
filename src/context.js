import React, { useReducer } from "react";
import { createContext } from "react";

export const actionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
};

export const actionCreators = {
  addTodo: (payload) => ({ type: actionTypes.ADD_TODO, payload }),
  toggleTodo: (payload) => ({ type: actionTypes.TOGGLE_TODO, payload }),
  removeTodo: (payload) => ({ type: actionTypes.REMOVE_TODO, payload }),
  editTodo: (payload) => ({ type: actionTypes.EDIT_TODO, payload }),
};

export const initialState = {
  todos: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.ADD_TODO:
      return {
        todos: [
          {
            id: (Math.random() * 50).toFixed(2),
            task: payload,
            date: new Date(),
            completed: false,
            isEdit: false,
          },
          ...state.todos,
        ],
      };
    case actionTypes.TOGGLE_TODO:
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            return { ...item, completed: !item.completed };
          }
          return item;
        }),
      };

    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== payload.id),
      };
    case actionTypes.EDIT_TODO:
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            return { ...item, task: payload.task, isEdit: !item.isEdit };
          }
          return item;
        }),
      };

    default:
      throw Error("Invalid action type");
  }
}

const TodoListContext = createContext();
const TodoListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export { TodoListContext, TodoListProvider };
