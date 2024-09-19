import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectState } from "./types/project";

const handleRequest = (state: ProjectState) => {
  state.loading = true;
  state.error = null;
};

const handleFailure = (state: ProjectState, action: PayloadAction<string>) => {
  state.loading = false;
  state.error = action.payload;
};

export const initialState: ProjectState = {
  projectData: [],
  loading: false,
  error: null,
  shouldRefetch: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fetchProjectRequest: handleRequest,
    fetchProjectSuccess(state, action: PayloadAction<Project[]>) {
      state.projectData = action.payload;
      state.loading = false;
      state.error = null;
      state.shouldRefetch = false;
    },
    fetchProjectFailure: handleFailure,

    createProjectRequest: handleRequest,
    createProjectSuccess(state, action: PayloadAction<Project>) {
      state.projectData.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createProjectFailure: handleFailure,

    updateProjectRequest: handleRequest,
    updateProjectSuccess(state, action: PayloadAction<Project>) {
      const updatedProject = action.payload;
      const projectIndex = state.projectData.findIndex(
        (project) => project.id === updatedProject.id
      );

      if (projectIndex !== -1) {
        state.projectData[projectIndex] = updatedProject;
      }

      state.loading = false;
      state.error = null;
    },
    updateProjectFailure: handleFailure,
  },
});

export const {
  fetchProjectRequest,
  fetchProjectSuccess,
  fetchProjectFailure,
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;
