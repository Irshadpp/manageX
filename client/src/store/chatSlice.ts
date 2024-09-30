// store/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatTypes, ChatState, Message } from './types/chat';

const handleRequest = (state: ChatState) => {
  state.loading = true;
  state.error = null;
};

const handleFailure = (state: ChatState, action: PayloadAction<string>) => {
  state.loading = false;
  state.error = action.payload;
};

export interface Example {
  name: string;
  url: string;
}

const initialState: ChatState = {
  selectedChat: null,
  input: "",
  chatData: [],
  loading: false,
  error: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    fetchChatRequest: handleRequest,
    fetchChatSuccess(state, action: PayloadAction<ChatTypes[]>){
      state.chatData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchChatFailure: handleFailure,
    setSelectedChat(state, action: PayloadAction<ChatTypes | null>) {
      state.selectedChat = action.payload;
    },
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    sendMessage(state, action: PayloadAction<Message>) {
      if (state.selectedChat) {
        state.selectedChat.messages.push(action.payload);
      }
      state.input = '';
    },
    handleInputChange: (
      state,
      action: PayloadAction<
        React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
      >,
    ) => {
      state.input = action.payload.target.value;
    },
    setMessages: (state, action: PayloadAction<{chatId: string, newMessage: Message}>) => {
      const {chatId, newMessage} = action.payload;
      const chat = state.chatData.find(chat => chat.id === chatId)
      console.log(chat, "chat state.........")
      if(chat){
        chat.messages = [...chat.messages, newMessage];
      }
      console.log(chat?.messages)
    },
  },
});

export const {
  fetchChatRequest,
  fetchChatSuccess,
  fetchChatFailure,
  // setSelectedExample,
  // setExamples,
  setInput,
  handleInputChange,
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;