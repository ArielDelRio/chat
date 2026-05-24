import { useState } from "react";
import { INITIAL_STATE, InitialState, SideBarContext } from "./context";

export const SideBarProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(INITIAL_STATE.search);

  const openSideBar = () => {
    setOpen(true);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const updateSearch = (newSearch: InitialState["search"]) => {
    setSearch(newSearch);
  };

  return (
    <SideBarContext.Provider
      value={{
        open,
        search,
        setSearch: updateSearch,
        openSideBar,
        closeSideBar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
