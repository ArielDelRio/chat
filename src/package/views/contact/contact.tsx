import CloseIcon from "@mui/icons-material/Close";
import { ActionButton, ContactUI } from "@/package/components";
import { useChat, useChatDispatch } from "@/package/context/Chat/context";
import { Stack } from "@/package/layouts/Stack";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useGetConversationUser } from "@/package/hooks";
import { Handlers } from "@/package/types";
import { Box, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  onClickStartConversation?: Handlers["onClickStartConversation"];
  onRenderContact?: Handlers["onRenderContact"];
}

const ContactView = ({ onRenderContact, onClickStartConversation }: Props) => {
  const { contactSelected } = useChat();
  const { setView, clearSelectedContact, startConversation } =
    useChatDispatch();
  const { conversationUser } = useGetConversationUser({
    identity: contactSelected?.identity || "",
  });

  const handleStartConversation = async () => {
    if (!contactSelected) {
      return;
    }

    if (onClickStartConversation) {
      onClickStartConversation(contactSelected);
      return;
    }

    await startConversation(contactSelected);
  };

  if (!contactSelected) return null;

  return (
    <Stack>
      <Stack.Segment
        flex={0.7}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ContactUI
          contact={contactSelected}
          onRenderContact={onRenderContact}
        />
      </Stack.Segment>
      <Stack.Segment
        flex={0.3}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"baseline"}
        gap={5}
      >
        <ActionButton
          color="primary"
          onClick={() => {
            setView("active");
            clearSelectedContact();
          }}
          icon={<CloseIcon fontSize="large" />}
          tooltip={"Close"}
        />
        <Box sx={{ position: "relative" }}>
          <ActionButton
            disabled={!onClickStartConversation && !conversationUser}
            active
            color="success"
            onClick={handleStartConversation}
            icon={<AddCommentIcon fontSize="large" />}
            tooltip={conversationUser && "Start conversation"}
          />
          {!conversationUser && (
            <Tooltip title="User is not registered on Conversation Service">
              <InfoIcon
                fontSize="small"
                sx={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  color: "#fff",
                  backgroundColor: "#f50057",
                  borderRadius: "50%",
                }}
              />
            </Tooltip>
          )}
        </Box>
      </Stack.Segment>
    </Stack>
  );
};
export default ContactView;
