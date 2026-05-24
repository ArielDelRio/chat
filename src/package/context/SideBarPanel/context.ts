import { Conversation } from "@/package/types";
import { createContext, useContext } from "react";

export interface InitialState {
  open: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  search: {
    active: boolean;
    query: string;
    results: Conversation[];
    isSearching: boolean;
  };
  setSearch: (search: InitialState["search"]) => void;
}

export const INITIAL_STATE: InitialState = {
  open: false,
  openSideBar: () => {},
  closeSideBar: () => {},
  search: {
    active: false,
    query: "",
    results: [],
    isSearching: false,
  },
  setSearch: () => {},
};

export const SideBarContext = createContext<InitialState>(INITIAL_STATE);

export function useSideBar() {
  return useContext(SideBarContext);
}
