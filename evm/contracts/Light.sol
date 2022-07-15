// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Light is ERC721 {
  constructor() ERC721("Light", "LT") {
  }

  // Mapping
  struct LightInfo { 
    address owner;
    uint color;
  }
  mapping(uint => mapping(uint => mapping(uint => LightInfo))) public light;
  
  // Colors
  event UpdatedColor(uint x, uint y, uint z,uint color, address updater);
  function setColor(uint _x, uint _y, uint _z,uint _color) public {
    light[_x][_y][_z].color = _color;
    emit UpdatedColor(_x, _y, _z, _color, msg.sender);
  }

  // Minting
  event Minted(uint x, uint y, uint z, address minter);
  function mint(uint _x, uint _y, uint _z, uint _color, address _owner) public {
    light[_x][_y][_z] = LightInfo(_owner, _color);
    emit Minted(_x, _y, _z, _owner);
  }

}
