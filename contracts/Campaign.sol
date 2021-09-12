pragma solidity 0.7.1;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(string memory ipfsUrl, uint goal, address payable recipient) public {
        Campaign newCampaign = new Campaign(ipfsUrl, goal, msg.sender, recipient);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
 
    string public ipfsUrl;
    address public manager;
    uint public goal;
    address payable recipient;
    bool public complete;
  
    uint public contributerCount;
    mapping(address => bool) public contributers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(string memory campaignIpfsUrl, uint campaignGoal, address campaignManager, address payable campaignRecipient) {
        ipfsUrl = campaignIpfsUrl;
        manager = campaignManager;
        goal = campaignGoal;
        recipient = campaignRecipient;
    }

    function contribute() public payable {

        require(!complete);

        contributers[msg.sender] = true;
        contributerCount++;
    }

    function closeCampaign() public restricted {
       complete = true;
    }
}