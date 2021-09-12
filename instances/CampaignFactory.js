import web3 from "./web3";

import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";

import campaignFactoryAddress from "../config/campaignFactoryAddress";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  campaignFactoryAddress
);

export default instance;
