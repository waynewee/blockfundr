import Router from "next/router";
import { Wrapper } from "../components/wrapper";
import { Button } from "../components/button";

export default function SuccessPage() {
  return (
    <div className="bg-pink-300 h-screen">
      <div className="max-w-screen-lg mx-auto py-24 relative">
        <div className="flex justify-center">
          <img
            style={{
              transform: "translateY(-200vh)",
              height: "48rem",
            }}
            className="animate-rocket transform pt-24"
            src={"/rocket.png"}
          />
        </div>
        <div className="animate-rocketMessage absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl w-96 mx-auto px-12 pt-8 pb-16">
          <img className="h-24 mx-auto mb-1" src={"/rocket.png"} />
          <div className="text-3xl text-center font-medium mb-4">
            Submitted!
          </div>
          <div className="mb-2 text-gray-700 text-center">
            Your transaction has been submitted to the ethereum blockchain.
          </div>
          <div className="text-gray-700 text-center text-sm mb-8">
            Do note that transactions on the blockchain are not instantaneous
            and require time to take effect. See average block times{" "}
            <a
              className="text-blue-600"
              href="https://ycharts.com/indicators/ethereum_average_block_time"
            >
              here
            </a>
            .
          </div>
          <Button className="w-full mb-2" onClick={() => Router.push("/")}>
            Back to <b>blockfundr</b>
          </Button>
          <Button
            type="secondary"
            className="w-full"
            onClick={() => Router.push("/discover")}
          >
            Discover Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
}
