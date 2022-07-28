pragma solidity ^0.5.0;

// define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./SquareVerifier.sol";
import "./ERC721Mintable.sol";

// define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is Verifier, RealEstateToken {

  // define a solutions struct that can hold an index & an address
  struct Solution {
    bytes32 index;
    address addr;
    uint256 tokenId;
    bool exist;
  }

  // define an array of the above struct
  mapping(uint256 => Solution) solutions;

  // define a mapping to store unique solutions submitted
  mapping(bytes32 => bool) uniqueSolutions;

  // Create an event to emit when a solution is added
  event SolutionAdded(bytes32 key, address addr, uint256 tokenId);


  // Create a function to add the solutions to the array and emit the event
  function addSolution(address addr, uint256 tokenId, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
    
    bytes32 key = keccak256(abi.encodePacked(a, b, c, input));

    require(!uniqueSolutions[key], "This solution has already been used");

    bool isValidProof = verifyTx(a, b, c, input);
    require(isValidProof, "The provided proof is not valid");

    Solution memory solu = Solution(key, addr, tokenId, true);
    solutions[tokenId] = solu;
    uniqueSolutions[key] = true;

    emit SolutionAdded(key, addr, tokenId);
  }


  // Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly
  function mint(address to, uint256 tokenId) public returns(bool) {
    require(solutions[tokenId].exist, "Solution is not unique");
    return super.mint(to, tokenId);
  }

}




  


























