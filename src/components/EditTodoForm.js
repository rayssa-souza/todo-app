import React, { useState } from "react";
import { useContext } from "react";
import { TodoListContext } from "../context";
import { actionCreators } from "../context";
import { TextField } from "@mui/material";

const EditTodoForm = ({ editTask }) => {
  const { dispatch } = useContext(TodoListContext);
  const [edit, setEdit] = useState(editTask.task);

  const handleChange = (e) => {
    setEdit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionCreators.editTodo({ ...editTask, task: edit }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="standard"
        value={edit}
        onChange={handleChange}
      />
    </form>
  );
};

export default EditTodoForm;
