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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit.trim() === "") return;
    dispatch(
      await actionCreators.editTodo({
        ...editTask,
        task: edit.trim(),
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="standard"
        value={edit}
        onChange={handleChange}
        inputProps={{ maxLength: 20 }}
      />
    </form>
  );
};

export default EditTodoForm;
