import React, { createContext, useState } from "react";
import { CircularProgress } from "@mui/material";


export const Loading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <loadingContext.Provider value={{isLoading, setIsLoading}}>
      {isLoading ?  <div className="bg-black fixed w-screen opacity-50 z-10 h-screen flex justify-center items-center">
        <CircularProgress size={100}/>
      </div> : null}
     
      {children}
    </loadingContext.Provider>
  );
};

export const loadingContext = createContext(false);
