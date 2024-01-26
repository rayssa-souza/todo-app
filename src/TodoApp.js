import React from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const TodoApp = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#6290C8",
      },
    },
    typography: {
      fontFamily: ['"Segoe UI"', "Roboto"].join(","),
      fontSize: 15,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: "30px",
          marginTop: "30px",
          maxWidth: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "1px 1px 7px #acacac",
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <TodoForm />
        <TodoList />
      </Box>
    </ThemeProvider>
  );
};

export default TodoApp;
