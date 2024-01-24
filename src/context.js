import React, { useReducer } from "react";
import { createContext } from "react";
import { getTasks } from "./services/todo-service";
import { addTasks } from "./services/todo-service";

export const actionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  SET_TODOS: "SET_TODOS",
};

export const actionCreators = {
  addTodo: async (payload) => {
    const result = await addTasks(payload);
    return { type: actionTypes.ADD_TODO, payload: result };
  },
  toggleTodo: (payload) => ({ type: actionTypes.TOGGLE_TODO, payload }),
  removeTodo: (payload) => ({ type: actionTypes.REMOVE_TODO, payload }),
  editTodo: (payload) => ({ type: actionTypes.EDIT_TODO, payload }),
  getTodos: async () => {
    const result = await getTasks();
    return {
      type: actionTypes.SET_TODOS,
      payload: result,
    };
  },
};

export const initialState = {
  todos: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SET_TODOS:
      return {
        todos: payload,
      };

    case actionTypes.ADD_TODO:
      return {
        todos: [
          {
            ...payload,
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
      return state;
    //   throw Error("Invalid action type");
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
