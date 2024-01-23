import React from "react";
import TodoApp from "./TodoApp";
import { TodoListProvider } from "./context";
import { Container, CssBaseline } from "@mui/material";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <TodoListProvider>
          <TodoApp />
        </TodoListProvider>
      </Container>
    </React.Fragment>
  );
};

export default App;
