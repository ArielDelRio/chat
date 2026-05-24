import { ActiveView, ChatView, ContactView, LookupView } from "../views";
import Layout from "./Layout";
import { useChat } from "../context/Chat/context";
import { Handlers } from "../types";

interface Props {
  handlers?: Handlers;
}

export const Main = ({ handlers }: Props) => {
  const { view } = useChat();

  const {
    onLookupContact,
    onClickTag,
    onClickMessage,
    onClickSelectedMessages,
    onRenderContact,
    onClickStartConversation,
    onClickCloseConversation,
    onRenderConversationChatTopBar,
  } = handlers || {};

  return (
    <>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && <LookupView onLookupContact={onLookupContact} />}
        {view === "contact" && (
          <ContactView
            onClickStartConversation={onClickStartConversation}
            onRenderContact={onRenderContact}
          />
        )}
        {view === "on-chat" && (
          <ChatView
            onClickTag={onClickTag}
            onClickMessage={onClickMessage}
            onClickSelectedMessages={onClickSelectedMessages}
            onClickCloseConversation={onClickCloseConversation}
            onRenderConversationChatTopBar={onRenderConversationChatTopBar}
          />
        )}
      </Layout.View>
    </>
  );
};
