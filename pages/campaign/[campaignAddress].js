import { useRouter } from "next/router";
import { ProgressBar } from "../../components/progressBar";
import { useFetchCampaign } from "../../hooks/useFetchCampaign";
import { Wrapper } from "../../components/wrapper";
import Router from "next/router";
import { Button } from "../../components/button";
import { weiToEther } from "../../utils";

export default function Campaign() {
  const router = useRouter();
  const { campaignAddress } = router.query;

  const campaign = useFetchCampaign(campaignAddress);

  if (!campaignAddress) {
    return null;
  }

  const buttonClassName = "block w-full mb-2";

  return (
    <Wrapper>
      <div className="max-w-screen-lg mx-auto py-12">
        <div className="text-3xl font-bold capitalize mb-6">
          {campaign.title}
        </div>
        <div className="flex">
          <div className="w-3/5 mr-4">
            <div>
              <img className="rounded" src={campaign.ipfsImageUrl} />
            </div>
            <div className="text-sm shadow-md rounded my-4 p-6 bg-white">
              <div className="text-sm mb-2 pb-2 border-b border-gray-300">
                <span className="font-medium">Recipient:</span>
                <a
                  className="text-blue-500"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://rinkeby.etherscan.io/address/${campaign.recipientAddress}`}
                >
                  {" "}
                  {campaign.recipientAddress}
                </a>
              </div>
              <div>
                {" "}
                <span className="font-medium">About this campaign: </span>
                <span>{campaign.description}</span>
              </div>
            </div>
            <Button
              className={buttonClassName}
              onClick={() => Router.push(`/contribute/${campaignAddress}`)}
            >
              Contribute
            </Button>
          </div>
          <div className="w-2/5">
            <div className="bg-white rounded p-6 shadow-md">
              <div className="mb-2">
                <b className="text-2xl">{weiToEther(campaign.balance)}Ξ</b>{" "}
                raised of {weiToEther(campaign.goal)}Ξ goal
              </div>
              <div className="mb-4">
                <ProgressBar
                  height={2}
                  percentage={campaign.balance / campaign.goal}
                />
              </div>
              <Button
                className={buttonClassName}
                onClick={() => Router.push(`/contribute/${campaignAddress}`)}
              >
                Contribute
              </Button>
              <Button
                className={buttonClassName}
                onClick={() =>
                  window.open(
                    `https://rinkeby.etherscan.io/address/${campaignAddress}`,
                    "_blank"
                  )
                }
                type="secondary"
              >
                View Transactions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
