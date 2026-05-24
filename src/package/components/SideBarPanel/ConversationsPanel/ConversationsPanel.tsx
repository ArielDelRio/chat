import { useChat, useChatDispatch } from "@/package/context/Chat/context";
import { List, ListItemButton } from "@mui/material";
import { ConversationItem } from "@/package/components";
import { Conversation, Handlers } from "@/package/types";
import { scrollStyles } from "@/package/utils";
import { Fragment } from "react/jsx-runtime";
import { useSideBar } from "@/package/context/SideBarPanel/context";

interface Props {
  onRenderConversationItem: Handlers["onRenderConversationItem"];
}

export const ConversationsPanel = ({ onRenderConversationItem }: Props) => {
  const { conversations } = useChat();
  const { openConversation } = useChatDispatch();
  const { open, search } = useSideBar();

  if (!conversations) return null;

  const handleClickConversation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    conversation: Conversation
  ) => {
    event.preventDefault();
    openConversation(conversation.conversation.sid);
  };

  const conversationsToDisplay =
    search.active && search.results.length ? search.results : conversations;

  return (
    <List
      sx={{
        minHeight: "calc(100% - 74px)",
        ...scrollStyles,
      }}
    >
      {conversationsToDisplay.map((conversation) => {
        return (
          <Fragment key={conversation.conversation.sid}>
            <ListItemButton
              onClick={(e) => handleClickConversation(e, conversation)}
              sx={{
                display: "flex",
                justifyContent: open ? "space-between" : "center",
                overflow: "hidden",
              }}
            >
              <ConversationItem
                conversation={conversation}
                onRenderConversationItem={onRenderConversationItem}
                fullDisplay={open}
              />
            </ListItemButton>
          </Fragment>
        );
      })}
    </List>
  );
};
