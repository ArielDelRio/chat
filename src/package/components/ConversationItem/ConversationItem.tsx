import { Box, colors, Typography } from "@mui/material";
import { Avatar } from "../Avatar/Avatar";
import { Contact, Conversation, Handlers } from "@/package/types";
import { useIsTyping } from "@/package/hooks";
import { getContact } from "@/package/utils";
import { useMemo } from "react";

interface Props {
  conversation: Conversation;
  onRenderConversationItem?: Handlers["onRenderConversationItem"];
  fullDisplay?: boolean;
}

export const ConversationItem = ({
  conversation,
  onRenderConversationItem,
  fullDisplay = true,
}: Props) => {
  const { unreadMessagesCount, partyUsers } = conversation || {};
  const { participant, isTyping } = useIsTyping(conversation.conversation);

  const contactTyping = useMemo(() => {
    if (!isTyping || !participant) return null;

    const userTyping = partyUsers.find(
      (user) => user.identity === participant?.identity
    );

    const contact = userTyping
      ? getContact(userTyping)
      : new Contact({ identity: participant.identity || "" });

    return contact;
  }, [isTyping, participant, partyUsers]);

  return (
    <>
      {onRenderConversationItem?.(conversation, {
        fullDisplay,
        contactTyping,
      }) || (
        <>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Avatar
              label={conversation.conversation.friendlyName || "Unknown"}
              count={unreadMessagesCount}
            />
            {fullDisplay && (
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant={"body1"}>
                  {conversation.conversation.friendlyName}
                </Typography>
                <Typography
                  variant={"subtitle2"}
                  sx={{
                    color: colors.grey[600],
                    fontSize: "0.8rem",
                  }}
                >
                  {contactTyping && `${contactTyping.label} is typing...`}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
