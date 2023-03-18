import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import EtherDocsClient from "../lib/EtherDocsClient";
import Etherdocs from "../lib/Etherdocs.json";
import { setClient } from "../lib/ClientManager";
import config from "../config";
import { useProfile } from "./useProfile";

export const metamaskContext = React.createContext();

export const useMetamask = () => {
  return useContext(metamaskContext);
};

export const MetamaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setProfile } = useProfile();

  // useEffect(() => {
  //   if (!window.ethereum) {
  //     throw new Error("metamask not installed");
  //   }
  // }, []);

  const handleAccountsChanged = useCallback(
    async (accounts) => {
      if (accounts.length === 0) {
        console.log("metamask not connected");
      } else {
        const client = new EtherDocsClient(
          Etherdocs.abi,
          config.contractAddress
        );
        setClient(client);
        const profileRet = await client.getProfile();
        setProfile(profileRet);
        setAccount(accounts[0]);
      }
    },
    [setAccount, setProfile]
  );

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        handleAccountsChanged(accounts);
      }
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
    window.location.href = "/";
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const connect = useCallback(async () => {
    if (window.ethereum) {
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
    }
  }, [handleAccountsChanged]);

  return (
    <metamaskContext.Provider value={{ account, connect, isConnected }}>
      {children}
    </metamaskContext.Provider>
  );
};
