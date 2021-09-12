/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.7.1",
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/ce80622906f64a549288fc75a7a60dda",
      accounts: [
        "5f8270e95ac685260139f2bb827660813a83646520dcf573b8f887fefef20d40",
      ],
    },
  },
};
