// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Light is ERC721 {
  constructor() ERC721("Light", "LT") {
  }

  // Mapping
  struct LightInfo { 
    bool minted;
    address owner;
    uint color;
  }
  mapping(int => mapping(int => mapping(int => LightInfo))) public light;
  function getLightInfo(int _x, int _y, int _z) public view returns (address owner, uint color) {
    LightInfo memory info = light[_x][_y][_z];
    address _owner = info.owner;
    uint _color = info.color;
    return (_owner, _color);
  }

  // Colors
  event UpdatedColor(int x, int y, int z, uint color, address updater);
  function setColor(int _x, int _y, int _z,uint _color) public {
    light[_x][_y][_z].color = _color;
    emit UpdatedColor(_x, _y, _z, _color, msg.sender);
  }

  // Minting
  event Minted(int x, int y, int z, uint color, address minter);
  function mint(int _x, int _y, int _z, uint _color, address _owner) public {
    require(light[_x][_y][_z].minted == false, "Light: this NFT has already been minted");
    light[_x][_y][_z] = LightInfo(true, _owner, _color);
    emit Minted(_x, _y, _z, _color, _owner);
  }

}
