import { Message } from "@twilio/conversations";
import { useChat, useChatDispatch } from "@/package/context/Chat/context";
import { Box, Chip, ListItem, Typography, colors } from "@mui/material";
import { useRef, useState } from "react";
import { useMessageReadIntersection } from "./useMessageReadIntersection";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { MessageMenu } from "../MessageMenu/MessageMenu";
import { useOnMessageUpdated } from "@/package/hooks";
import { SelectionMessageButton } from "../SelectionMessageButton/SelectionMessageButton";

import {
  ContextMenuItem,
  DefaultContextMenuOptions,
  Handlers,
  MessageAttributes,
} from "@/package/types";
import { BodyMessage } from "./BodyMessage/BodyMessage";

interface Props {
  message: Message;
  isRead: boolean;
  onClickMessage?: Handlers["onClickMessage"];
  onClickTag?: Handlers["onClickTag"];
}

export const MessageUI = ({
  message,
  isRead,
  onClickMessage,
  onClickTag,
}: Props) => {
  const { selectMessage, getMessageAuthor } = useChatDispatch();
  const {
    selectionMode,
    contact,
    messagesExtendedContextMenu,
    goingToMessage,
  } = useChat();
  const [showMenu, setShowMenu] = useState(false);
  const messageRef = useRef(null);
  useMessageReadIntersection({ message, ref: messageRef });

  const { updatedMessageBy } = useOnMessageUpdated({ message });

  const direction =
    message.author === contact.identity ? "outgoing" : "incoming";

  const onClickExtendedOption = (extendedOption: ContextMenuItem) => {
    extendedOption.onClick(message);
  };

  const getHiddenOptions = (): DefaultContextMenuOptions[] => {
    const hiddenOptions: DefaultContextMenuOptions[] = [];

    if (message.type === "media") {
      hiddenOptions.push("copy", "edit");
    } else {
      hiddenOptions.push("download");
    }

    if (direction === "outgoing") {
      // hidden options for outgoing messages
    }

    if (direction === "incoming") {
      hiddenOptions.push("edit", "delete");
    }

    return hiddenOptions;
  };

  const handleClickTag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tag: string
  ) => {
    event.stopPropagation();
    onClickTag?.(tag, message);
  };

  const messageAttributes = message.attributes as MessageAttributes;
  const { tags } = messageAttributes;

  const authorContact = getMessageAuthor(message);

  return (
    <ListItem
      ref={messageRef}
      id={message.sid}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: direction === "incoming" ? "flex-start" : "flex-end",
        width: "100%",
        py: 0.5,
        position: "relative",
        bgcolor:
          goingToMessage?.index === message.index
            ? colors.yellow["500"]
            : "transparent",
      }}
    >
      {/* Selection section */}
      {selectionMode.active && (
        <Box
          position={"absolute"}
          right={direction === "outgoing" ? 10 : "auto"}
          left={direction === "incoming" ? 10 : "auto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={10}
          height={10}
        >
          <SelectionMessageButton message={message} />
        </Box>
      )}
      <Box
        maxWidth={"80%"}
        bgcolor={direction === "incoming" ? colors.grey[300] : colors.green[50]}
        color={colors.grey[900]}
        p={1}
        borderRadius={"10px"}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
        }}
      >
        {/* Menu section */}
        {showMenu && !selectionMode.active && (
          <Box
            display={"flex"}
            justifyContent={
              direction === "outgoing" ? "flex-end" : "flex-start"
            }
          >
            <MessageMenu
              onClickOption={(reason) => selectMessage(message, reason)}
              onClickExtendedOption={(option) => onClickExtendedOption(option)}
              hiddenOptions={getHiddenOptions()}
              extendedContextMenu={messagesExtendedContextMenu?.filter(
                (item) =>
                  item.direction === "both" || item.direction === direction
              )}
            />
          </Box>
        )}

        {/* Author section */}
        {direction === "incoming" && (
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            fontSize={14}
            color={colors.grey[800]}
          >
            {authorContact.label}
          </Typography>
        )}

        {/* Body section */}
        <BodyMessage message={message} onClickMessage={onClickMessage} />

        {/* Time and read status section */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          justifyContent={direction === "incoming" ? "flex-start" : "flex-end"}
        >
          <Typography
            variant="subtitle2"
            fontSize={11}
            textAlign={direction === "incoming" ? "left" : "right"}
            sx={{
              color: colors.grey[600],
            }}
          >
            {`${
              updatedMessageBy && "Edited"
            } ${message.dateUpdated?.toLocaleTimeString()}`}
          </Typography>
          {direction === "outgoing" &&
            (isRead ? (
              <DoneAllIcon color="primary" sx={{ fontSize: 14 }} />
            ) : (
              <CheckIcon color="disabled" sx={{ fontSize: 14 }} />
            ))}
        </Box>

        {/* Tags section */}
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          gap={0.5}
          justifyContent={direction === "outgoing" ? "flex-end" : "flex-start"}
        >
          {tags?.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              onClick={(event) => handleClickTag(event, tag)}
              sx={{
                height: "24px",
                fontSize: 12,
                color: colors.blue[700],
                borderColor: colors.blue[700],
                "&:hover": {
                  backgroundColor: colors.blue[50],
                },
                margin: "2px",
              }}
            />
          ))}
        </Box>
      </Box>
    </ListItem>
  );
};
