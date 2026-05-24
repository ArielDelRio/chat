import { ContactInput } from "./Contact";

export type ConversationAttributes = {
  type: "individual" | "group";
};

export type UserAttributes = {
  contact: ContactInput;
};

export type MessageAttributes = {
  data?: {
    author?: string;
    [key: string]: unknown;
  };
  tags?: string[];
  type?: "text" | "media" | "video";
};
