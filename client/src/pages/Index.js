import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../hooks/useMetamask";
import EtherDocsClient from "../lib/EtherDocsClient";
import Etherdocs from "../lib/Etherdocs.json";
import config from "../config";
import { getClient, setClient } from "../lib/ClientManager";

const Index = () => {
  const [isMetamaskInstalled] = useState(
    window.ethereum === undefined ? false : true
  );
  const { isConnected } = useMetamask();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isMetamaskInstalled) {
        navigate("/install-metamask");
      } else if (isConnected) {
        const client = new EtherDocsClient(
          Etherdocs.abi,
          config.contractAddress
        );
        setClient(client);
        const isRegistered = await client.isRegistered()
        if(isRegistered){
          navigate("/is-registered")
        }else{
          navigate("/is-not-registered")
        }
      } else {
        navigate("/connect-wallet");
      }
    })();
  }, [isConnected, navigate, isMetamaskInstalled]);

  return <div>Index page</div>;
};

export default Index;
