const { artifacts, web3, assert } = require("hardhat");

const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

describe("Campaign Factory", function () {
  before(async function () {
    accounts = await web3.eth.getAccounts();
    recipient = accounts[1];
  });

  it("Should create a campaign", async function () {
    const campaignFactory = await CampaignFactory.new();
    await campaignFactory.createCampaign("", 1000, recipient);
    const campaigns = await campaignFactory.getDeployedCampaigns();
    assert.equal(campaigns.length, 1);
  });

  it("Should create multiple campaigns", async function () {
    const campaignFactory = await CampaignFactory.new();
    await campaignFactory.createCampaign("", 1000, recipient);
    await campaignFactory.createCampaign("", 1000, recipient);
    await campaignFactory.createCampaign("", 1000, recipient);
    const campaigns = await campaignFactory.getDeployedCampaigns();
    assert.equal(campaigns.length, 3);
  });

  it("Should set the manager of the campaign", async function () {
    const campaignFactory = await CampaignFactory.new();
    await campaignFactory.createCampaign("", 1000, recipient, {
      from: accounts[5],
    });
    const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
    const campaign = await Campaign.at(campaignAddress);
    const manager = await campaign.manager();

    assert.equal(manager, accounts[5]);
  });
});

describe("Campaign", function () {
  before(async function () {
    campaignFactory = await CampaignFactory.new();
    accounts = await web3.eth.getAccounts();
  });

  it("Should allow for contributions", async function () {
    const recipient = accounts[0];
    await campaignFactory.createCampaign("", 1000, recipient, {
      from: accounts[0],
    });
    const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
    const campaign = await Campaign.at(campaignAddress);

    await campaign.contribute({ from: accounts[1], value: 12345 });
    await campaign.contribute({ from: accounts[2], value: 23456 });

    const balance = await web3.eth.getBalance(campaignAddress);

    assert.equal(balance, 12345 + 23456);
  });
});
