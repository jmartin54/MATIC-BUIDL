// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fireaf {

  address payable public owner;
  uint public price;
  uint public rentalPrice;
  uint public rentalPlatformFee;
  uint public rentDuration;
  uint public renterCooldown;
  uint public nftMaxCount;

  mapping (uint => uint) idToColor;
  mapping (uint => address payable) idToOwner;
  mapping (uint => uint) idToRentedOn; 
  mapping (address => uint) renterToCooldown;
  uint idCount;
  mapping (address => uint) ownerToCashh;
  uint platformCassh;
  constructor() {
    owner = payable(msg.sender);
    price = 2000000000000000000;
    rentalPrice  = 20000000000000000;
    rentalPlatformFee = 10000000000000000;
    rentDuration = 10 minutes;
    renterCooldown = 10 minutes;
    nftMaxCount = 1000000;
    idCount = 0;
    platformCassh = 0;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Fireaf: only owner");
    _;
  }

  function setPrice(uint _price) onlyOwner external { price = _price; }
  function setRentalPrice(uint _rentalPrice) onlyOwner external { rentalPrice = _rentalPrice; }
  function setRentalPlatformFee(uint _rentalPlatformFee) onlyOwner external { rentalPlatformFee = _rentalPlatformFee; }
  function setRentDuration(uint _rentDuration) onlyOwner external { rentDuration = _rentDuration; }
  function setRenterCooldown(uint _renterCooldown) onlyOwner external { renterCooldown = _renterCooldown;}
  function setOwner(address payable _owner) onlyOwner external { owner = _owner; }
  function setNFTMaxCount(uint _nftMaxCount) onlyOwner external { nftMaxCount = _nftMaxCount;}

  function rent(uint _color, uint _id) external payable {
    require(msg.value > rentalPrice, "Fireaf: send more money ya fool");
    require(block.timestamp > idToRentedOn[_id] + rentDuration, "Fireaf: that's a spicy pixel there bud"); // TODO: check these? What about init to 0?
    require(block.timestamp > renterToCooldown[msg.sender], "Fireaf: uhh. maybe do less.");
    
    renterToCooldown[msg.sender] = block.timestamp + rentDuration;
    idToRentedOn[_id] = block.timestamp;
    idToColor[_id] = _color;

    platformCassh += rentalPlatformFee;
    ownerToCashh[idToOwner[_id]] += msg.value - rentalPlatformFee;
  }

  function mint(uint _color) external payable {
    require(msg.value > price, "Fireaf: send more money fool");
    require(idCount < nftMaxCount, "Fireaf: sold out bud");

    idToColor[idCount] = _color;
    idToOwner[idCount] = payable(msg.sender);

    idCount += 1;
  }

  function withdraw() external {
    require(ownerToCashh[msg.sender] > 0, "Fireaf: you ain't got no money buddd");
    uint casshhboi = ownerToCashh[msg.sender];
    ownerToCashh[msg.sender] = 0;
    payable(msg.sender).transfer(casshhboi);
  }

  function platformWidthdraw() onlyOwner external {
    owner.transfer(platformCassh);
    platformCassh = 0;
  }

  function emergencyWidthdraw() onlyOwner external {
    selfdestruct(owner); 
  }

}
