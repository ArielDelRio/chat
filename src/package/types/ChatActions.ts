import { Message } from "@twilio/conversations";
import { ContactInput } from "./Contact";
import {
  Conversation,
  ConversationChatTopBarOptions,
  ConversationItemOptions,
} from "./Conversation";

export type Handlers = {
  onClickTag?: (tag: string, message: Message) => void;
  onClickMessage?: (message: Message) => void;
  onClickSelectedMessages?: (messages: Message[]) => void;
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
  onRenderContact?: (contact: ContactInput) => React.ReactNode | undefined;
  onClickStartConversation?: (contact: ContactInput) => void;
  onClickCloseConversation?: (conversation: Conversation) => void;
  onRenderConversationItem?: (
    conversation: Conversation,
    options: ConversationItemOptions
  ) => React.ReactNode | undefined;
  onRenderConversationChatTopBar?: (
    conversation: Conversation,
    options: ConversationChatTopBarOptions
  ) => React.ReactNode | undefined;
};
