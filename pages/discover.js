import CampaignFactoryInstance from "../instances/CampaignFactory";
import CampaignContract from "../artifacts/contracts/Campaign.sol/Campaign.json";
import web3 from "../instances/web3";
import { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";
import { ProgressBar } from "../components/progressBar";
import { weiToEther } from "../utils";
import { Wrapper } from "../components/wrapper";

export default function Discover({ campaignData }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(async () => {
    const arr = [];

    for (const d of campaignData) {
      const res = await axios.get(d.ipfsUrl);
      arr.push({ ...res.data, ...d });
    }

    setCampaigns(arr);
  }, []);

  return (
    <Wrapper>
      <div className="bg-indigo-50 py-24">
        <div className="max-w-screen-lg mx-auto">
          <div className="font-bold text-3xl mb-4">Browse Campaigns</div>
          <div className="text-lg italic">
            “We make a living by what we get, but we make a life by what we
            give.” — Winston Churchill
          </div>
        </div>
      </div>
      <div className="py-24">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {campaigns.map((campaign) => {
              return (
                <Link
                  key={campaign.address}
                  href={`/campaign/${campaign.address}`}
                >
                  <div className="group rounded-sm bg-white shadow-md cursor-pointer">
                    <div className="overflow-hidden">
                      <img
                        className="transform duration-200 group-hover:scale-105"
                        src={campaign.ipfsImageUrl}
                      />
                    </div>
                    <div className="px-4 py-3">
                      <div className="font-medium capitalize mb-2 whitespace-nowrap overflow-ellipsis overflow-hidden">
                        {campaign.title}
                      </div>
                      <div className="whitespace-nowrap text-sm w-full overflow-ellipsis overflow-hidden mb-3">
                        <span className="font-medium">Recipient:</span>{" "}
                        {campaign.address}
                      </div>
                      <div className="mb-1">
                        <ProgressBar
                          percentage={campaign.balance / campaign.goal}
                        />
                      </div>
                      <div className="text-sm">
                        <b>Ξ{weiToEther(campaign.balance)} raised</b> of Ξ
                        {weiToEther(campaign.goal)}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

Discover.getInitialProps = async () => {
  const campaignAddresses = await CampaignFactoryInstance.methods
    .getDeployedCampaigns()
    .call();

  const campaignData = [];

  if (campaignAddresses.length > 0) {
    const campaignInstances = campaignAddresses.map((campaignAddress) => {
      return new web3.eth.Contract(CampaignContract.abi, campaignAddress);
    });

    for (const campaignInstance of campaignInstances) {
      const ipfsUrl = await campaignInstance.methods.ipfsUrl().call();
      const balance = await web3.eth.getBalance(
        campaignInstance.options.address
      );
      campaignData.push({
        ipfsUrl,
        address: campaignInstance.options.address,
        balance,
      });
    }
  }

  return { campaignData };
};
