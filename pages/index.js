import Router from "next/router";
import { Button } from "../components/button";
import { Wrapper } from "../components/wrapper";

export default function Home(props) {
  return (
    <div className="bg-pink-50 min-h-screen">
      <Wrapper>
        <div className="max-w-screen-lg mx-auto">
          <div className="py-36 flex items-center">
            <div className="w-1/2">
              <div className="text-3xl font-bold mb-4">
                Trustworthy fundraising on the blockchain. For life's highs and
                lows.
              </div>
              <div className="text-lg mb-8">
                Seek help. Give help. Raise funds for any cause today.
              </div>
              <div>
                <Button
                  className="w-48 mb-2"
                  onClick={() => Router.push("/create")}
                >
                  Start a Campaign
                </Button>
                <Button
                  className="w-48 block"
                  type="secondary"
                  onClick={() => Router.push("/discover")}
                >
                  Discover a Cause
                </Button>
              </div>
            </div>
            <div className="w-1/2">
              <img alt="hero-image" src={"/young-people.png"} />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
