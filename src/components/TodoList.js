import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useContext, useEffect } from "react";
import { TodoListContext } from "../context";
import { actionCreators } from "../context";
import EditTodoForm from "./EditTodoForm";

const TodoList = () => {
  const { state, dispatch } = useContext(TodoListContext);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(await actionCreators.getTodos());
    };
    fetchData();
  }, []);

  const handleToggle = async (item) => {
    console.log({ item });
    if (!item.isEdit) {
      dispatch(await actionCreators.toggleTodo(item));
    }
  };

  const handleRemoveTask = async (item) => {
    dispatch(await actionCreators.removeTodo(item));
  };

  const handleEditTask = async (item) => {
    dispatch(await actionCreators.editTodo(item));
  };

  return (
    <Box
      sx={{ display: "flex", marginTop: "10px" }}
      direction="row"
      justifyContent="space-between"
    >
      {state.todos.length === 0 ? (
        <Box
          sx={{ display: "flex", margin: "40px auto 20px" }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <AddTaskIcon
            color="disabled"
            sx={{ fontSize: 55, marginBottom: "20px" }}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: 15, color: "#D8D4D5", fontWeight: 600 }}
          >
            Adicione suas tarefas
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            width: "100%",
            height: "50vh",
            bgcolor: "background.paper",
            overflow: "auto",
          }}
        >
          {state.todos.map((item) => {
            const labelId = `checkbox-list-label-${item.task}`;

            return (
              <Paper key={item.id} elevation={2} sx={{ marginTop: "20px" }}>
                <ListItem disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleToggle(item)}
                    dense
                    disableRipple
                    sx={{
                      "&.Mui-focusVisible": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={item.completed && !item.isEdit}
                        tabIndex={-1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    {item.isEdit ? (
                      <EditTodoForm editTask={item} />
                    ) : (
                      <ListItemText
                        id={labelId}
                        primary={item.task}
                        sx={
                          item.completed && { textDecoration: "line-through" }
                        }
                      />
                    )}
                  </ListItemButton>
                  <Box
                    sx={{ display: "flex" }}
                    direction="row"
                    justifyContent={"space-between"}
                  >
                    <IconButton
                      aria-label="edit-icon"
                      onClick={() => handleEditTask(item)}
                    >
                      <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete-icon"
                      onClick={() => handleRemoveTask(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              </Paper>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default TodoList;
