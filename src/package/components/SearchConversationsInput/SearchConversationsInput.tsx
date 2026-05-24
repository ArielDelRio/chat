import { useChat } from "@/package/context/Chat/context";
import { useSideBar } from "@/package/context/SideBarPanel/context";
import { getContact } from "@/package/utils";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useRef } from "react";

export const SearchConversationsInput = () => {
  const { search, setSearch } = useSideBar();
  const { conversations } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCloseSearchConversation = () => {
    setSearch({ ...search, active: false, query: "", results: [] });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, query: event.target.value });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchConversations();
    }
  };

  const searchConversations = () => {
    if (!search.query) {
      setSearch({ ...search, results: [] });
      return;
    }

    const conversationsFound = conversations?.filter((conversation) => {
      return (
        conversation.partyUsers.filter((user) => {
          const contact = getContact(user);
          return contact.label
            .toLocaleLowerCase()
            .includes(search.query?.toLocaleLowerCase() || "");
        }).length > 0
      );
    });

    setSearch({ ...search, results: conversationsFound || [] });
  };

  return (
    <Box
      display={"flex"}
      p={1}
      justifyContent={"space-between"}
      alignItems={"center"}
      borderBottom={"1px solid #ccc"}
      minHeight={"42px"}
      position={"relative"}
    >
      <TextField
        inputRef={inputRef}
        defaultValue={search.query}
        fullWidth
        id="chat-search-messages-input"
        variant="standard"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        label={`Search by participant`}
        InputProps={{
          endAdornment: (
            <>
              <IconButton onClick={searchConversations}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={handleCloseSearchConversation}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ),
        }}
        sx={{
          "& .MuiInput-root": {
            margin: 0,
          },
          "& .MuiFormLabel-root": {
            transform: "translate(0, 10px)",
          },
          "& .MuiInputLabel-shrink": {
            transform: "translate(0, -10px) scale(0.75)",
          },
        }}
      />
      <Box position={"absolute"} top={0} right={10}>
        <Typography variant="body2" color="textSecondary" fontSize={12}>
          {search.results.length} conversations found
        </Typography>
      </Box>
    </Box>
  );
};
