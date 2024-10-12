export enum ChatType {
  ONE_ON_ONE = "one-on-one",
  GROUP = "group",
}

export enum MessageType{
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "vidoe",
  FILE = "file"
}

export interface Message {
  id: string;
  message: string;
  type: string;
  timestamp: string;
  name: string;
  profileURL: string;
  chatId?: string;
}

export interface ChatTypes {
  id: string;
  type: ChatType;
  name?: string;
  profileURL?: string;
  groupName?: string;
  groupProfile?: string;
  messages: Message[];
}

export interface ChatState {
selectedChat: ChatTypes | null;
  input: string;
  chatData: ChatTypes[];
  loading: boolean;
  error: string | null;
}
