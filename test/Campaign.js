// const { artifacts, web3, assert } = require("hardhat");

// const Campaign = artifacts.require("Campaign");
// const CampaignFactory = artifacts.require("CampaignFactory");

// describe("Campaign Factory", function () {
//   before(async function () {
//     accounts = await web3.eth.getAccounts();
//   });

//   it("Should create a campaign", async function () {
//     const campaignFactory = await CampaignFactory.new();
//     await campaignFactory.createCampaign(1000);
//     const campaigns = await campaignFactory.getDeployedCampaigns();
//     assert.equal(campaigns.length, 1);
//   });

//   it("Should create multiple campaigns", async function () {
//     const campaignFactory = await CampaignFactory.new();
//     await campaignFactory.createCampaign(1000);
//     await campaignFactory.createCampaign(2000);
//     await campaignFactory.createCampaign(3000);
//     const campaigns = await campaignFactory.getDeployedCampaigns();
//     assert.equal(campaigns.length, 3);
//   });

//   it("Should set the manager of the campaign", async function () {
//     const campaignFactory = await CampaignFactory.new();
//     await campaignFactory.createCampaign(1000, { from: accounts[5] });
//     const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
//     const campaign = await Campaign.at(campaignAddress);
//     const manager = await campaign.manager();

//     assert.equal(manager, accounts[5]);
//   });
// });

// describe("Campaign", function () {
//   before(async function () {
//     campaignFactory = await CampaignFactory.new();
//     accounts = await web3.eth.getAccounts();
//   });

//   it("Should allow for contributions", async function () {
//     await campaignFactory.createCampaign(1000, { from: accounts[0] });
//     const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
//     const campaign = await Campaign.at(campaignAddress);

//     await campaign.contribute({ from: accounts[1], value: 12345 });
//     await campaign.contribute({ from: accounts[2], value: 23456 });

//     const balance = await web3.eth.getBalance(campaignAddress);

//     assert.equal(balance, 12345 + 23456);
//   });

//   it("Should allow creation of requests", async function () {
//     const manager = accounts[0];
//     const recipient = accounts[1];
//     await campaignFactory.createCampaign(1000, { from: manager });
//     const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
//     const campaign = await Campaign.at(campaignAddress);

//     await campaign.createRequest("This is a request", 9999, recipient, {
//       from: manager,
//     });

//     const numRequests = await campaign.numRequests();
//     assert(numRequests, 1);
//   });

//   it("Should allow approval of requests", async function () {
//     const manager = accounts[0];
//     const contributer = accounts[1];
//     const recipient = accounts[3];

//     await campaignFactory.createCampaign(1000, { from: manager });
//     const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
//     const campaign = await Campaign.at(campaignAddress);

//     await campaign.createRequest("This is a request", 9999, recipient, {
//       from: manager,
//     });

//     await campaign.contribute({ from: contributer, value: 2000 });

//     await campaign.approveRequest(0, { from: contributer });
//     const approvalCount = await campaign.getRequestApprovalCount(0);
//     assert.equal(approvalCount, 1);
//   });

//   it("Should restrict approval of requests", async function () {
//     const manager = accounts[0];
//     const nonContributer = accounts[2];
//     const recipient = accounts[3];

//     await campaignFactory.createCampaign(1000, { from: manager });
//     const [campaignAddress] = await campaignFactory.getDeployedCampaigns();
//     const campaign = await Campaign.at(campaignAddress);

//     await campaign.createRequest("This is a request", 9999, recipient, {
//       from: manager,
//     });

//     await campaign.approveRequest(0, { from: nonContributer });
//     const approvalCount = await campaign.getRequestApprovalCount(0);
//     assert.isNotNumber(approvalCount);
//   });
// });
