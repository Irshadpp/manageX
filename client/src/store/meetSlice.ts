
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const initialState: any = {
  identity: "",
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  showOverlay: true,
  participants: [],
  messages: []
};

const meetSlice = createSlice({
  name: "meet",
  initialState,
  reducers: {
    setIsRoomHost(state, action: PayloadAction<boolean>){
        state.isRoomHost = action.payload
    },
    setConnectOnlyWithAudio (state, action: PayloadAction<boolean>){
        state.connectOnlyWithAudio = action.payload;
    },
    setRoomId (state, action: PayloadAction<string>){
      state.roomId = action.payload
    },
    setIdentity (state, action: PayloadAction<string>){
      state.identity = action.payload
    },
    setShowOverlay (state, action: PayloadAction<boolean>){
      state.showOverlay = action.payload;
    },
    setParticipants (state, action: PayloadAction<any[]>){
      state.participants = action.payload
    },
    setMessages (state, action: PayloadAction<any[]>){
      state.messages = action.payload
    },
    resetState: () => initialState
  },
});

export const {
    setIsRoomHost,
    setConnectOnlyWithAudio,
    setRoomId,
    setIdentity,
    setShowOverlay,
    setParticipants,
    setMessages,
    resetState
} = meetSlice.actions;

export default meetSlice.reducer;
