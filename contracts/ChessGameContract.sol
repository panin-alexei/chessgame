// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract ChessGameContract {

  // Function to reward the winner with tokens and claim rewards
  function win() public {
    // Address of the current user (replace with how we identify the winner)
    
    address winner = msg.sender;

    // Transfer 10 tokens to the winner (replace with your token transfer logic)
    transferToken(winner, 10);

    // Call the external contract's claimReward function for the winner
    claimExternalReward(winner);
  }

  // Function to transfer tokens within your contract (replace with actual implementation)
  function transferToken(address recipient, uint256 amount) internal {
    // Implement your token transfer logic here (e.g., deduct from contract balance, update recipient balance)
  }

  // Function to call the external contract's claimReward (assuming it exists)
  function claimExternalReward(address user) private {
    // Replace with the actual address of the target contract
    address externalContractAddress = 0x4691F60c894d3f16047824004420542E4674E621;

    bytes memory data = abi.encodeWithSignature("claimReward(address)", user);

    // Perform a regular call (potentially modifies state) to the external contract
    (bool success,) = externalContractAddress.call(data);

    // Check for successful call
    require(success, "External claim reward failed");
  }
}
