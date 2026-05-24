import {
  User,
  Conversation as TwilioConversation,
  Participant,
} from "@twilio/conversations";
import { Contact, ConversationAttributes, UserAttributes } from "../types";

export const getContact = (user: User | Participant): Contact => {
  if (user instanceof User) {
    const userAttributes = user.attributes as UserAttributes;
    const contact = Contact.buildContact(userAttributes.contact);
    contact.setStatus(user.isOnline ? "available" : "offline");
    return contact;
  }

  if (user instanceof Participant) {
    const participantBindings = user.bindings as { sms: { address: string } };
    return new Contact({
      identity: participantBindings.sms.address,
      avatar: "/",
      label: participantBindings.sms.address,
      status: "unknown",
      type: "phone",
    });
  }

  throw new Error("Invalid user type.");
};

export const getConversationType = (conversation: TwilioConversation) => {
  const conversationAttributes =
    conversation.attributes as ConversationAttributes;
  return conversationAttributes.type as "individual" | "group";
};
