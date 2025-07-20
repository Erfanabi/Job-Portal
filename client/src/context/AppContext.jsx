import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearches, setIsSearch] = useState(false);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearches,
    setIsSearch,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

// To use context in your components:
// import { useContext } from "react";
// const { searchFilter, setSearchFilter, ... } = useContext(AppContext);
