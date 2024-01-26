import React, { useReducer } from "react";
import { createContext } from "react";
import { getTasks } from "./services/todo-service";
import { addTasks } from "./services/todo-service";
import { updateTasks } from "./services/todo-service";
import { deleteTasks } from "./services/todo-service";

export const actionTypes = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  EDIT_TODO: "EDIT_TODO",
  SET_TODOS: "SET_TODOS",
};

export const actionCreators = {
  getTodos: async () => {
    const result = await getTasks();
    return {
      type: actionTypes.SET_TODOS,
      payload: result,
    };
  },
  addTodo: async (payload) => {
    const result = await addTasks(payload);
    return { type: actionTypes.ADD_TODO, payload: result };
  },
  toggleTodo: async (payload) => {
    await updateTasks(payload.id, payload.task, !payload.completed);
    return {
      type: actionTypes.TOGGLE_TODO,
      payload: { id: payload.id, completed: !payload.completed },
    };
  },
  editTodo: async (payload) => {
    await updateTasks(payload.id, payload.task);
    return {
      type: actionTypes.EDIT_TODO,
      payload,
    };
  },
  removeTodo: async (payload) => {
    await deleteTasks(payload.id);
    return { type: actionTypes.REMOVE_TODO, payload };
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
      console.log("add:", payload);
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
      console.log("toggle:", payload);
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            return { ...item, completed: payload.completed };
          }
          return item;
        }),
      };

    case actionTypes.EDIT_TODO:
      return {
        todos: state.todos.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              task: payload.task,
              isEdit: !item.isEdit,
            };
          }
          return item;
        }),
      };
    case actionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== payload.id),
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
