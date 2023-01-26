import React from "react";
import { useState } from "react";
import { useContext } from "react";

const profileContext = React.createContext();

export const useProfile = () => {
  return useContext(profileContext);
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  return (
    <profileContext.Provider value={{ profile, setProfile }}>
      {children}
    </profileContext.Provider>
  );
}
