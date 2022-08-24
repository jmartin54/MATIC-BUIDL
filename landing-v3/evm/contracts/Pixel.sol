// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// contract Pixel is ERC721URIStorage {

//   struct Metadata {
//     address owner;
//     uint color;
//     string message;
//     string image;
//     string url;
//   }

//   address public owner;
//   int public mintableAmount;
//   mapping(int => mapping(int => mapping( int => Metadata))) public pixels;

//   constructor(address _owner) {
//     owner = _owner;
//   }
  
//   modifier onlyOwner() {
//     require(msg.sender == owner, "Pixel: you're not the owner");
//     _;
//   }

//   modifier onlyMintable() {
//     require(mintableAmount > 0, "Pixel: minting is paused");
//     mintableAmount -= 1;
//     _;
//   }

//   function setMintable(int _mintableAmount) onlyOwner public {
//     mintableAmount = _mintableAmount;
//   }

//   function mint(int x, int y, int z, uint _color, string memory _message, string memory _image,  string memory _url) onlyMintable  public{
//     pixels[x][y][z] = Metadata(msg.sender, _color, _message, _image, _url);
//   }


// event Transfer(address from, address to, uint256 tokenId);
// event Approval(address owner, address approved, uint256 tokenId);
// event ApprovalForAll(address owner, address operator, bool approved);

// function balanceOf(address owner) external returns(uint) {}

// function ownerOf(uint tokenId) external returns(address) {}

// function safeTransferFrom(address from, address to, uint tokenId, bytes calldata data) external {}

// function safeTransferFrom(address from, address to, uint tokenId) external {}

// function transferFrom(address from, address to, uint tokenId) external {}

// function approve(address to, uint tokenId) external {}

// function setApprovalForAll(address operator, bool _approved) external {}

// function getApproved(uint tokenId) external returns (address) {}

// function isApprovedForAll(address owner, address operator) external returns (bool) {}


// }
