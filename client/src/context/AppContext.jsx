import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export default function AppContextProvider(props) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [isSearches, setIsSearch] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [userData, setUserData] = useState(null);

  const fetchJobs = async () => {
    setJobs(jobsData);
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/company`, {
        headers: {
          Authorization: `Bearer ${companyToken}`,
        },
      });

      console.log(data);

      if (data?.success) {
        setCompanyData(data.company);
        console.log("**", data.company);
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");

    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearches,
    setIsSearch,
    jobs,
    isOpen,
    setIsOpen,
    companyData,
    setCompanyData,
    companyToken,
    setCompanyToken,
    backendUrl,
    userData,
    setUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

// To use context in your components:
// import { useContext } from "react";
// const { searchFilter, setSearchFilter, ... } = useContext(AppContext);
