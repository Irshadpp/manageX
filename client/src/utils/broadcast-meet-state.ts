import { AppDispatch } from "@/store";

const meetChannel = new BroadcastChannel("meet_channel");

export const broadcastMeetState = (meetState: any) => {
  meetChannel.postMessage(meetState);
};

export const listenToMeetStateChanges = (dispatch: AppDispatch) => {
  meetChannel.onmessage = (event) => {
    dispatch({ type: "meet/setMeetState", payload: event.data });
  };
};
