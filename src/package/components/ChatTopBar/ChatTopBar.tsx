import { useChat, useChatDispatch } from "@/package/context/Chat/context";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Handlers } from "@/package/types";
import { SearchInput } from "../Search/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import { ConversationItem } from "../ConversationItem/ConversationItem";

interface Props {
  onClickCloseConversation?: Handlers["onClickCloseConversation"];
  onRenderConversationChatTopBar?: Handlers["onRenderConversationChatTopBar"];
}

export const ChatTopBar = ({
  onClickCloseConversation,
  onRenderConversationChatTopBar,
}: Props) => {
  const { activeConversation, search } = useChat();
  const { clearSelectedContact, setView, setSearch } = useChatDispatch();

  const handleCloseChat = () => {
    clearSelectedContact();
    setView("active");

    if (onClickCloseConversation) {
      onClickCloseConversation(activeConversation!);
    }
  };

  const handleClickSearch = () => {
    if (!search.active) {
      setSearch({
        active: true,
      });
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"100%"}
      p={1}
      borderBottom={"1px solid #ccc"}
    >
      {search.active ? (
        <SearchInput />
      ) : (
        <>
          <Box display={"flex"}>
            <IconButton onClick={handleCloseChat}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <ConversationItem
              conversation={activeConversation!}
              fullDisplay
              onRenderConversationItem={onRenderConversationChatTopBar}
            />
          </Box>
          <IconButton onClick={handleClickSearch}>
            <SearchIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};
