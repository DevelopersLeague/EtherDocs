import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetamask } from "../hooks/useMetamask";
import EtherDocsClient from "../lib/EtherDocsClient";
import Etherdocs from "../lib/Etherdocs.json";
import config from "../config";
import { useProfile } from "../hooks/useProfile";
import { useClient } from "../hooks/useClient";

const Index = () => {
  const [isMetamaskInstalled] = useState(
    window.ethereum === undefined ? false : true
  );
  const { setProfile } = useProfile();
  const { isConnected } = useMetamask();
  const { client, setClient } = useClient();
  console.log("client state");
  console.log(client, setClient);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isMetamaskInstalled) {
        navigate("/install-metamask");
      } else if (isConnected) {
        const client = new EtherDocsClient();
        await client.setup(
          Etherdocs.abi,
          config.contractAddress
        )
        setClient(client);
        const profile = await client.getProfile();
        setProfile(profile);
        console.log("profile");
        console.log(profile);
        const isRegistered = await client.isRegistered();
        if (isRegistered) {
          navigate("/is-registered");
        } else {
          navigate("/is-not-registered");
        }
      } else {
        navigate("/connect-wallet");
      }
    })();
  }, [isConnected, navigate, isMetamaskInstalled]);

  return <div>Index page</div>;
};

export default Index;
