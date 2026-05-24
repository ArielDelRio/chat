import { ContainerStyles } from "../components/Container/styles";
import { Handlers } from "./ChatActions";

export interface SideBarProps {
  styles?: ContainerStyles;
  onRenderConversationItem?: Handlers["onRenderConversationItem"];
}
