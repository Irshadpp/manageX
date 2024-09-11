import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Attendance {
  type: 'checkIn' | 'checkOut';
  remarks?: string;
}

interface AttendanceState {
  attendanceData: Attendance[];
  loading: boolean;
  error: string | null;
  shouldRefetch: boolean;
}

const initialState: AttendanceState = {
  attendanceData: [],
  loading: false,
  error: null,
  shouldRefetch: false,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    fetchAttendanceRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAttendanceSuccess(state, action: PayloadAction<Attendance[]>) {
      state.attendanceData = action.payload;
      state.loading = false;
      state.error = null;
      state.shouldRefetch = false;
    },
    fetchAttendanceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createAttendanceRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createAttendanceSuccess(state, action: PayloadAction<Attendance>) {
      // state.attendanceData.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createAttendanceFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAttendanceRequest,
  fetchAttendanceSuccess,
  fetchAttendanceFailure,
  createAttendanceRequest,
  createAttendanceSuccess,
  createAttendanceFailure,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;