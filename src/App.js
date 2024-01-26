import React from "react";
import TodoApp from "./TodoApp";
import { TodoListProvider } from "./context";
import { Container, CssBaseline } from "@mui/material";
import "./index.css";

const App = () => {
  return (
    <React.Fragment>
      <Container fixed>
        <TodoListProvider>
          <TodoApp />
        </TodoListProvider>
      </Container>
    </React.Fragment>
  );
};

export default App;
