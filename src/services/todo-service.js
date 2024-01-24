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

export const updateTasks = () => {};

export const deleteTasks = () => {};
