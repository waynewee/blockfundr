# **blockfundr**

> A proof of concept (POC) work for fundraising using blockchain technology.

As this is a POC work, all transactions take place on the **Rinkeby** testnet. See more on testnets [here](https://ethereum.org/en/developers/docs/networks/).

---

## Motivations

- Setting up a cryptocurrency wallet is easy. Setting up a bank account? Not so. [Three Quarters of the World's Poor are "Unbanked"](https://www.worldbank.org/en/news/feature/2012/04/19/three-quarters-of-the-worlds-poor-are-unbanked).

- No intermediaries. Donations are done through the blockchain without the need for any third party intermediaries.

- Full transparency. Use popular online tools such as [etherscan.io](https://rinkeby.etherscan.io/) to track any and all transactions

---

## Getting Started

### 1. Test the Contracts

`npm run test`

### 2. Compile the Contracts

We use hardhat to compile the solidity contracts

`npm run compile`

### 3. Deploying the Campaign Factory Contract

This step should only be done once as it will deploy the `CampaignFactory` contract on to the blockchain. You can check the address stored at `config/campaignFactoryAddress.js` and decide if you want to use an existing `CampaignFactory`

`npm run deploy`

### 4. Build the React application

`npm run build`

### 5. Start the React application

`npm run start`

The application should start at localhost:3000

---

## Pre-requisites

### Create a MetaMask account

MetaMask is a crypto wallet and a gateway to blockchain applications. You would need a MetaMask account in order to interact with **blockfundr**. Get started [here](https://metamask.io/).

### Get some test ether

Transactions on the blockchain require gas, which is paid for on the ethereum blockchain by ether (Ξ). You can get test ether for free from ether faucets like [these](https://faucet.rinkeby.io/).
