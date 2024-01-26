import instance from "./http";

export const getTasks = async () => {
  return await instance.get("/todos");
};

export const addTasks = async (addedTask) => {
  return await instance({
    method: "post",
    url: "/todos",
    data: {
      task: addedTask,
    },
  });
};

export const updateTasks = async (
  taskId,
  updatedTask,
  updatedTaskCompleted
) => {
  return await instance.patch(`/todos/${taskId}`, {
    id: taskId,
    task: updatedTask,
    completed: updatedTaskCompleted,
  });
};

export const deleteTasks = async (taskId) => {
  return await instance.delete(`/todos/${taskId}`);
};
