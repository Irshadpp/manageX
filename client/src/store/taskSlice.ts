import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "./types/task";

const handleRequest = (state: TaskState) => {
  state.loading = true;
  state.error = null;
};

const handleFailure = (state: TaskState, action: PayloadAction<string>) => {
  state.loading = false;
  state.error = action.payload;
};

export const initialState: TaskState = {
  taskData: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    fetchTaskRequest: handleRequest,
    fetchTaskSuccess(state, action: PayloadAction<Task[]>) {
      state.taskData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTaskFailure: handleFailure,

    createTaskRequest: handleRequest,
    createTaskSuccess(state, action: PayloadAction<Task>) {
      console.log(state.taskData, "-=--=-=-=================================")
      state.taskData.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createTaskFailure: handleFailure,

    updateTaskRequest: handleRequest,
    updateTaskSuccess(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      const taskIndex = state.taskData.findIndex(
        (task) => task.id === updatedTask.id
      );

      if (taskIndex !== -1) {
        state.taskData[taskIndex] = updatedTask;
      }

      state.loading = false;
      state.error = null;
    },
    updateTaskFailure: handleFailure,
  },
});

export const {
  fetchTaskRequest,
  fetchTaskSuccess,
  fetchTaskFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
} = taskSlice.actions;

export default taskSlice.reducer;
