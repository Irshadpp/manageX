export enum ChatType {
  ONE_ON_ONE = "one_on_one",
  GROUP = "group",
}

export interface Message {
  id: string;
  message: string;
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
