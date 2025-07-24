import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearches, setIsSearch] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearches,
    setIsSearch,
    jobs,
    isOpen,
    setIsOpen,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

// To use context in your components:
// import { useContext } from "react";
// const { searchFilter, setSearchFilter, ... } = useContext(AppContext);
