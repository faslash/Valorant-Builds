import React, { useState, createContext } from "react";

export const VolumeProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <volumeContext.Provider value={{isMuted, setIsMuted}}>
        {children}
    </volumeContext.Provider>
  );
};



export const volumeContext = createContext(false);
