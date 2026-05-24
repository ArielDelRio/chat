import { getContact } from "@/package/utils";
import { Box, colors, Tooltip, Typography } from "@mui/material";
import { Avatar } from "../../Avatar/Avatar";
import { Conversation, ConversationItemOptions } from "@/package";
import { PropsWithChildren } from "react";
import Info from "@mui/icons-material/Info";

interface Props extends PropsWithChildren<object> {
  conversation: Conversation;
  options: ConversationItemOptions;
  info?: React.ReactNode;
}

export const IndividualConversationItem = ({
  conversation,
  options,
  info,
}: Props) => {
  const { partyParticipants, partyUsers, unreadMessagesCount } = conversation;
  const { fullDisplay, contactTyping } = options;

  const participant = partyUsers[0] || partyParticipants![0];
  const contact = getContact(participant);

  return (
    <Box display={"flex"} gap={1} alignItems={"center"} width={"100%"}>
      <Avatar
        avatar={contact.avatar}
        label={contact.label}
        count={unreadMessagesCount}
        status={{
          color: contact.status.color,
          label: contact.status.label,
        }}
      />
      {fullDisplay && (
        <>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
            width={"100%"}
          >
            <Typography
              variant={"body1"}
              sx={{
                textAlign: "start",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "200px",
              }}
            >
              {contact.label}
            </Typography>
            <Typography
              variant={"body2"}
              sx={{
                color: colors.grey[600],
                fontSize: "0.8rem",
              }}
            >
              {contactTyping ? "is typing..." : contact.status.label}
            </Typography>
          </Box>
          {info && (
            <Tooltip
              onClick={(e) => e.stopPropagation()}
              enterTouchDelay={0}
              componentsProps={{
                arrow: {
                  sx: {
                    color: colors.common.white,
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  },
                },
                tooltip: {
                  onClick: (e) => e.stopPropagation(),
                  sx: {
                    backgroundColor: colors.common.white,
                    color: colors.common.black,
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                  },
                },
              }}
              title={info}
              arrow
            >
              <Info color="info" />
            </Tooltip>
          )}
        </>
      )}
    </Box>
  );
};
