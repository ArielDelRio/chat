import { User } from "@twilio/conversations";
import { useChatDispatch, useChat as _useChat } from "./context/Chat/context";
import { useHasNewMessages } from "./hooks";
import { Contact, ContactInput } from "./types";

export const useChat = () => {
  const { client } = _useChat();
  const { hasNewMessage, countConversationsWithNewMessages } =
    useHasNewMessages();

  const {
    goToMessage,
    startConversation,
    openConversation,
    shutdownChat,
    sendCustomMessage,
    getMessageAuthor,
  } = useChatDispatch();

  const getSubscribedUser = async (
    identity: string
  ): Promise<User | undefined> => {
    if (!client) {
      throw new Error("Chat client is not initialized.");
    }

    const users = await client?.getSubscribedUsers();
    return users?.find((user) => user.identity === identity);
  };

  const openConversationWith = async (contact: ContactInput) => {
    if (!client) {
      throw new Error("Chat client is not initialized.");
    }
    startConversation(Contact.buildContact(contact));
  };

  return {
    registeredUser: client?.user,
    hasNewMessage,
    countConversationsWithNewMessages,
    goToMessage,
    openConversationWith,
    openConversation,
    getSubscribedUser,
    shutdownChat,
    sendCustomMessage,
    getMessageAuthor,
  };
};
