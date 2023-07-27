import React, { createContext, useState, useEffect } from "react";
import config from "@/public/config";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentDir, setCurrentDir] = useState(config.homeDir);

  useEffect(() => {
    setCurrentDir(config.homeDir);
  }, []);

  return (
    <AppContext.Provider value={{ currentDir, setCurrentDir }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
