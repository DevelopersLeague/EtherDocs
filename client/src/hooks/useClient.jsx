import React from "react";
import { useState } from "react";
import { useContext } from "react";

const clientContext = React.createContext();

export const useClient = () => {
  return useContext(clientContext);
};

export function ClientProvider({ children }) {
  const [client, setClient] = useState(null);

  return (
    <clientContext.Provider value={{ client, setClient }}>
      {children}
    </clientContext.Provider>
  );
}
