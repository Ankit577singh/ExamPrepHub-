import axios from "axios";
import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
// import { get } from "../../../Backend/src/routes/authRoute";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggin, setIsLoggin] = useState(false);
  const [getData, setgetData] = useState(false);

  async function getUserdata() {
    try {
      const { data } = await axios.get(backendUrl + '/user/getProfile', { withCredentials: true });
      if (data.success) {      
        setgetData(data.userInfo);  // {username, email, ...}
        setIsLoggin(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getUserdata();  // Fetch user data from backend every time page reloads
  }, []); // empty array -> only on mount


  const value = {
    backendUrl,
    isLoggin,
    setIsLoggin,
    getData,
    setgetData,
    getUserdata,
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};



