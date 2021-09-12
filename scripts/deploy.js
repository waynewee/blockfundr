const path = require("path");
const fs = require("fs");

async function main() {
  // We get the contract to deploy
  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  console.log("CampaignFactory deployed to:", campaignFactory.address);

  const filePath = path.resolve(
    __dirname,
    "../config",
    "campaignFactoryAddress.js"
  );

  fs.writeFileSync(filePath, `export default "${campaignFactory.address}"`, {
    flag: "w",
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
