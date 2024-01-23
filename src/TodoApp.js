import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Box } from "@mui/material";

const TodoApp = () => {
  return (
    <Box
      sx={{
        marginTop: "30px",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <TodoForm />
      <TodoList />
    </Box>
  );
};

export default TodoApp;
