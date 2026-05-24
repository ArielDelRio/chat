import { Handlers, MessageAttributes } from "@/package/types";
import { TextWithEmojis } from "@/package/utils";
import { Box, Typography } from "@mui/material";
import { Message } from "@twilio/conversations";
import { MediaMessage } from "./MediaMessage/MediaMessage";
import { VideoButtonMessage } from "./VideoButtonMessage/VideoButtonMessage";

interface Props {
  message: Message;
  onClickMessage: Handlers["onClickMessage"];
}

export const BodyMessage = ({ message, onClickMessage }: Props) => {
  const messageAttributes = message.attributes as MessageAttributes;

  if (message.attachedMedia?.[0]) {
    return (
      <Box onClick={() => onClickMessage?.(message)}>
        <MediaMessage media={message.attachedMedia[0]} />
      </Box>
    );
  }

  if (messageAttributes?.type === "video") {
    return (
      <VideoButtonMessage
        onClickVideoButton={() => onClickMessage?.(message)}
        body={message.body || ""}
      />
    );
  }

  return (
    <Box onClick={() => onClickMessage?.(message)}>
      <Typography
        variant={"body2"}
        sx={{
          overflowWrap: "break-word",
        }}
      >
        <TextWithEmojis text={message.body || ""} />
      </Typography>
    </Box>
  );
};
