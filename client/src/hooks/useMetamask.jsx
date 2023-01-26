import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export const metamaskContext = React.createContext();

export const useMetamask = () => {
  return useContext(metamaskContext);
};

export const MetamaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  console.debug("metastate from hook");
  console.debug({ account, isConnected });

  useEffect(() => {
    if (!window.ethereum) {
      throw new Error("metamask not installed");
    }
  }, []);

  const handleAccountsChanged = useCallback(
    (accounts) => {
      console.debug("accounts changed");
      console.debug(accounts);
      if (accounts.length === 0) {
        console.log("metamask not connected");
      } else {
        setAccount(accounts[0]);
      }
    },
    [setAccount]
  );

  useEffect(() => {
    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      handleAccountsChanged(accounts);
    })();
  }, [handleAccountsChanged]);

  useEffect(() => {
    if (account === null) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  }, [account]);

  const handleChainChanged = useCallback((chainId) => {
    console.debug("chain id changed: ", chainId);
    window.location.href = "/";
  }, []);

  useEffect(() => {
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [handleAccountsChanged, handleChainChanged]);

  const connect = useCallback(async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) {
        throw new Error("no accounts found");
      } else {
        handleAccountsChanged(accounts);
      }
    } catch (err) {
      console.log("error occured while requesting accounts");
      console.error(err);
    }
  }, [handleAccountsChanged]);

  return (
    <metamaskContext.Provider value={{ account, connect, isConnected }}>
      {children}
    </metamaskContext.Provider>
  );
};
