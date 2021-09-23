import axios from "axios";
import web3 from "../instances/web3";
import CampaignContract from "../artifacts/contracts/Campaign.sol/Campaign.json";
import { useEffect, useState } from "react";

export const useFetchCampaign = (campaignAddress) => {
  const [campaign, setCampaign] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    if (campaignAddress) {
      const campaignInstance = new web3.eth.Contract(
        CampaignContract.abi,
        campaignAddress
      );
      const balance = await web3.eth.getBalance(campaignAddress);
      const ipfsUrl = await campaignInstance.methods.ipfsUrl().call();

      const res = await axios.get(ipfsUrl);

      setLoaded(true);

      setCampaign({
        ...res.data,
        ipfsUrl,
        address: campaignAddress,
        balance,
      });
    }
  }, [campaignAddress]);

  return {
    loaded,
    campaign,
  };
};
