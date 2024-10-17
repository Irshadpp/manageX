import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Attendance {
  _id?: string;
  type: 'checkIn' | 'checkOut';
  remarks?: string;
  checkOut?: string;
}

interface AttendanceApiData{
  attendaceLogs: Attendance[];
  totalPages: number;
}

interface AttendanceState {
  attendanceData: Attendance[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  shouldRefetch: boolean;
}

const initialState: AttendanceState = {
  attendanceData: [],
  totalPages: 0,
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
    fetchAttendanceSuccess(state, action: PayloadAction<AttendanceApiData>) {
      console.log(action.payload.attendaceLogs)
      state.attendanceData = action.payload.attendaceLogs;
      state.totalPages = action.payload.totalPages
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
      console.log(action.payload)
      if(action.payload.checkOut === ""){
        state.attendanceData.push(action.payload)
      }else{
        console.log(state.attendanceData,"-------------------------------", action.payload)
        state.attendanceData = state.attendanceData.map((a) => {
          if (a._id === action.payload._id) {
              return { ...a, ...action.payload }; 
          }
          return a; 
      });
      }
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