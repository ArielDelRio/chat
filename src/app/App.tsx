import { Button, Chip, styled, Typography, useMediaQuery } from "@mui/material";
import ControlPanel from "./components/ControlPanel";
import { Chat, useChat } from "@/package";
import { MessageAttributes, ContactInput } from "@/package/types";
import { useState } from "react";
import { contactList } from "./contacts.mock";
import { isValidPhoneNumber } from "libphonenumber-js";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Message } from "@twilio/conversations";
import { Handlers } from "@/package/types";
import { IndividualConversationItem } from "@/package";

const Layout = styled("div")`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function App() {
  const [contact, setContact] = useState<ContactInput>();
  const { sendCustomMessage, getMessageAuthor } = useChat();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSetContact = (contact: ContactInput | undefined) => {
    if (!contact) {
      return setContact(undefined);
    }
    setContact(contact);
  };

  const onFetchToken = async (identity: string) => {
    const response = await fetch(
      `${
        import.meta.env.CHAT_TWILIO_FUNCTIONS_DOMAIN
      }/token?identity=${identity}`
    );
    const { data } = await response.json();
    return data.token;
  };

  const onLookupContact = async (contactToLookup: string) => {
    const results = contactList.filter((contact) =>
      contact.label?.toLowerCase()?.includes(contactToLookup.toLowerCase())
    );

    if (!results.length && isValidPhoneNumber(contactToLookup, "US")) {
      return [
        {
          identity: contactToLookup,
          isNew: true,
        },
      ];
    }

    return results;
  };

  const onClickTag = async (tag: string, message: Message) => {
    if (message.author === contact?.identity) {
      if (tag === "claim") {
        handleCustomContextMenuAction(message);
      }
    }
  };

  const handleCustomContextMenuAction = async (message: Message) => {
    const messageAttributes = message.attributes as MessageAttributes;

    const data = messageAttributes.data;

    if (!data) {
      const response = window.confirm(
        `This message does not have any attributes. Do you want to add some?`
      );

      if (response) {
        await message.updateAttributes({
          data: {
            claims: [
              {
                id: 1,
                name: "claim-1",
                link: "https://example.com/claim-1",
              },
              {
                id: 2,
                name: "claim-2",
                link: "https://example.com/claim-2",
              },
            ],
          },
          tags: ["claim"],
        });
      }

      return;
    }

    const { claims } = data as {
      claims: { id: number; name: string; link: string }[];
    };

    if (claims.length) {
      const response = window.confirm(
        `This message already has attributes:
        ${JSON.stringify(claims, null, 2)}.
        Do you want to update them?`
      );
      if (!response) {
        return;
      }
    }
    await message.updateAttributes({
      data: {
        claims: [
          {
            id: 1,
            name: "claim-1",
            link: "https://example.com/claim-1",
          },
          {
            id: 2,
            name: "claim-2",
            link: "https://example.com/claim-2",
          },
        ],
      },
      tags: ["claim"],
    });
  };

  const onClickSelectedMessages = async (messages: Message[]) => {
    alert(
      `Selected messages: ${messages.map((message) => message.body).join(", ")}`
    );
  };

  const onRenderConversationItem: Handlers["onRenderConversationItem"] = (
    conversation,
    options
  ) => {
    const { type } = conversation;

    if (type === "individual") {
      return (
        <IndividualConversationItem
          conversation={conversation}
          options={options}
          info={
            <Chip
              onClick={() => alert("Clicked on CN-9876543515-A")}
              size={"small"}
              label={"CN-9876543515-A"}
              variant={"outlined"}
              color={"primary"}
              sx={{ borderRadius: 0, fontSize: "0.6rem" }}
            />
          }
        />
      );
    }
  };

  const onRenderConversationChatTopBar: Handlers["onRenderConversationChatTopBar"] =
    (conversation, options) => {
      const { type } = conversation;

      if (type === "individual") {
        return (
          <IndividualConversationItem
            conversation={conversation}
            options={{
              fullDisplay: true,
              contactTyping: options.contactTyping,
            }}
            info={
              <>
                <Chip
                  onClick={() => alert("Clicked on CN-9876543515-A")}
                  size={"small"}
                  label={"CN-9876543515-A"}
                  variant={"outlined"}
                  color={"primary"}
                  sx={{ borderRadius: 0, fontSize: "0.6rem" }}
                />
                <Button
                  variant={"outlined"}
                  color={"primary"}
                  fullWidth
                  onClick={() =>
                    sendCustomMessage(conversation.conversation.sid, {
                      type: "video",
                      body: "Join video call",
                      attributes: {
                        sessionName: "video-call",
                        foo: { bar: "baz" },
                      },
                    })
                  }
                >
                  <Typography variant={"body2"}>Start a video call</Typography>
                </Button>
              </>
            }
          />
        );
      }
    };

  const onClickMessage: Handlers["onClickMessage"] = async (
    message: Message
  ) => {
    const author = getMessageAuthor(message);
    console.log({ message, author });
  };

  return (
    <Layout>
      <ControlPanel
        contactList={contactList}
        contact={contact}
        handleSetContact={handleSetContact}
      />
      <Chat
        contact={contact || { identity: "" }}
        events={{
          onFetchToken,
        }}
        handlers={{
          onLookupContact,
          onClickTag,
          onClickMessage,
          onClickSelectedMessages,
          onRenderConversationItem,
          onRenderConversationChatTopBar,
        }}
        messagesExtendedContextMenu={[
          {
            key: "custom-action",
            label: "Custom Action",
            Icon: <AutoAwesomeIcon fontSize="small" color="inherit" />,
            direction: "outgoing",
            onClick: handleCustomContextMenuAction,
          },
        ]}
        styles={{
          fullScreen: isMobile,
        }}
      />
    </Layout>
  );
}

export default App;
