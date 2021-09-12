import { useRouter } from "next/router";
import Router from "next/router";
import { useState } from "react";
import CampaignContract from "../../artifacts/contracts/Campaign.sol/Campaign.json";
import { ProgressBar } from "../../components/progressBar";
import web3 from "../../instances/web3";
import { useFetchCampaign } from "../../hooks/useFetchCampaign";
import { Wrapper } from "../../components/wrapper";
import { Button } from "../../components/button";
import { weiToEther } from "../../utils";
import { FullScreenLoader } from "../../components/loader";

export default function Contribute() {
  const router = useRouter();
  let { campaignAddress } = router.query;

  const [amount, setAmount] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const campaign = useFetchCampaign(campaignAddress);

  if (!campaignAddress) {
    return null;
  }

  const contribute = async () => {
    if (!amount || amount < 0) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    const accounts = await web3.eth.getAccounts();
    const campaignInstance = new web3.eth.Contract(
      CampaignContract.abi,
      campaignAddress
    );

    try {
      setIsLoading(true);
      await campaignInstance.methods.contribute().send({
        from: accounts[0],
        value: amount,
      });
      Router.push("/success");
    } catch (e) {
      setIsLoading(false);
      alert(
        "Encountered an error. Press F12 to check the console for details."
      );
    }
  };

  return (
    <Wrapper>
      {isLoading && <FullScreenLoader />}
      <div className="max-w-screen-lg mx-auto py-12">
        <div className="bg-white rounded shadow-md p-6 w-2/3 mx-auto">
          <div className="mb-4 pb-4 border-b border-gray-300">
            <Button
              type="secondary"
              onClick={() => Router.push(`/campaign/${campaignAddress}`)}
            >
              <div className="flex items-center">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="left-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M603.3 327.5l-246 178a7.95 7.95 0 000 12.9l246 178c5.3 3.8 12.7 0 12.7-6.5V643c0-10.2-4.9-19.9-13.2-25.9L457.4 512l145.4-105.2c8.3-6 13.2-15.6 13.2-25.9V334c0-6.5-7.4-10.3-12.7-6.5z"></path>
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                </svg>
                <div className="ml-2">Return to campaign</div>
              </div>
            </Button>
          </div>
          <div className="py-6">
            <div className="grid gap-4 grid-cols-2 mb-8">
              <div>
                <img className="rounded" src={campaign.ipfsImageUrl} />
              </div>
              <div>
                <div className="mb-6">
                  You're contributing to the cause —{" "}
                  <span className="font-medium">{campaign.title}</span>
                </div>
                <div className="text-sm mb-4">
                  Even a single wei can drastically change the lives of the
                  beneficiaries of <i>{campaign.title}</i> We thank you for your
                  generous contribution.
                </div>
              </div>
            </div>
            <div className="pt-8 mt-8 mb-8 border-t border-gray-300">
              <div className="mb-3">
                <span className="font-medium">{campaign.title}</span> needs{" "}
                {weiToEther(campaign.goal - campaign.balance)}Ξ to reach their
                goal of {weiToEther(campaign.goal)}Ξ
              </div>
              <ProgressBar
                height={2}
                percentage={campaign.balance / campaign.goal}
              />
              <div className="mt-2">
                <b>{weiToEther(campaign.balance)}Ξ raised</b> of{" "}
                {weiToEther(campaign.goal)}Ξ
              </div>
            </div>
            <div>
              <div className="text-sm">
                Enter amount in wei. Need help? Check out this{" "}
                <a
                  className="text-blue-600"
                  href={`https://eth-converter.com/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  ether converter
                </a>
                !
              </div>
              <div className="flex items-center mb-3">
                <input
                  type="number"
                  min={0}
                  className="rounded border border-gray-300 text-2xl px-2 py-1 w-full"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="ml-2 italic">WEI</div>
              </div>
              {isError && (
                <div className="mb-3 text-red-500 text-sm">
                  Amount is required and must be more than 0
                </div>
              )}
              <Button className="text-xl w-full" onClick={contribute}>
                Contribute
              </Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Wrapper>
  );
}
