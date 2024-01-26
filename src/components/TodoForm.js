import * as React from "react";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { TodoListContext } from "../context";
import { actionCreators } from "../context";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const TodoForm = () => {
  const { dispatch } = useContext(TodoListContext);
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    dispatch(await actionCreators.addTodo(task.trim()));
    setTask("");
  };

  return (
    <Box>
      <Box sx={{ display: "flex", marginBottom: "50px" }}>
        <img
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
          src={process.env.PUBLIC_URL + "./todo.png"}
          alt="logo todoapp"
        />
        <Box sx={{ display: "flex", marginLeft: "10px" }} alignItems={"center"}>
          <Typography
            sx={{ fontSize: 25, fontWeight: "bold" }}
            variant="h1"
            component="h1"
          >
            Minhas Tarefas
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="O que preciso fazer?"
          value={task}
          onChange={handleChange}
          inputProps={{ maxLength: 20 }}
          placeholder={"Marcar consulta para quinta-feira"}
        />
      </form>
    </Box>
  );
};

export default TodoForm;
