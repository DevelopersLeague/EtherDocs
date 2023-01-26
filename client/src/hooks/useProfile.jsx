import React from "react";
import { useState } from "react";
import { useContext } from "react";

const profileContext = React.createContext();

export const useProfile = () => {
  return useContext(profileContext);
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const isRegistered = (() => {
    if (!profile) {
      return false;
    } else {
      if (profile.role === "NA") {
        return false;
      } else {
        return true;
      }
    }
  })();
  console.debug("profile state changed");
  console.debug({ profile, isRegistered });

  return (
    <profileContext.Provider value={{ profile, setProfile, isRegistered }}>
      {children}
    </profileContext.Provider>
  );
}
