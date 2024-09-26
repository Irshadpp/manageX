// store/chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatBotMessages, Message, UserData, userData, Users } from "./mock";

export interface Example {
  name: string;
  url: string;
}

interface ChatState {
  selectedExample: Example;
  examples: Example[];
  input: string;
  chatBotMessages: Message[];
  messages: Message[];
  hasInitialAIResponse: boolean;
  hasInitialResponse: boolean;
  selectedUser: UserData;
}

const initialState: ChatState = {
  selectedUser: Users[4],
  selectedExample: { name: "Messenger example", url: "/" },
  examples: [
    { name: "Messenger example", url: "/" },
    { name: "Chatbot example", url: "/chatbot" },
    { name: "Chatbot2 example", url: "/chatbot2" },
  ],
  input: '',
  chatBotMessages: ChatBotMessages,
  messages: userData[0].messages,
  hasInitialAIResponse: false,
  hasInitialResponse: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedExample: (state, action: PayloadAction<Example>) => {
      state.selectedExample = action.payload;
    },
    setExamples: (state, action: PayloadAction<Example[]>) => {
      state.examples = action.payload;
    },
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    handleInputChange: (
      state,
      action: PayloadAction<
        React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
      >,
    ) => {
      state.input = action.payload.target.value;
    },
    setChatBotMessages: (state, action: PayloadAction<(chatBotMessages: Message[]) => Message[]>) => {
      state.chatBotMessages = action.payload(state.chatBotMessages);
    },
    setMessages: (state, action: PayloadAction<(messages: Message[]) => Message[]>) => {
      state.messages = action.payload(state.messages);
    },
    setHasInitialAIResponse: (state, action: PayloadAction<boolean>) => {
      state.hasInitialAIResponse = action.payload;
    },
    setHasInitialResponse: (state, action: PayloadAction<boolean>) => {
      state.hasInitialResponse = action.payload;
    },
  },
});

export const {
  setSelectedExample,
  setExamples,
  setInput,
  handleInputChange,
  setChatBotMessages,
  setMessages,
  setHasInitialAIResponse,
  setHasInitialResponse,
} = chatSlice.actions;

export default chatSlice.reducer;
