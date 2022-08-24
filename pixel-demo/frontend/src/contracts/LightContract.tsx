import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";

// const LightArtifact = require("./build/Light.json");
const LightArtifact = require("./build/HardHatLight.json");
export enum LightContractStates {
  loading,
  loaded,
}
export type LightInfo = {
  minted: boolean;
  owner: string;
  color: string;
};
type LightContractParams = {
  x: number;
  y: number;
};
export default function LightContract({ x, y }: LightContractParams) {
  const [state, setState] = useState(LightContractStates.loading);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [info, setInfo] = useState<LightInfo | null>(null);

  async function updateInfo() {
    if (!contract) return;
    // fetch
    const info = await contract.light.call(1, x, y, 0);
    // format
    const minted = info.minted;
    const owner = info.owner;
    const color =
      "#" + info.color.toHexString().replaceAll("0x", "").padStart(8, "0");
    // set
    setInfo({ minted, owner, color });
  }

  function handleEvent(
    _x: BigNumber,
    _y: BigNumber,
    color: string,
    sender?: string
  ) {
    if (_x.eq(x) && _y.eq(y)) {
      if (sender) {
        setInfo({ minted: true, owner: sender, color });
      }
      if (!sender) {
        setInfo({ minted: true, owner: info?.owner ?? "", color });
      }
    }
  }

  function mint(color: number) {
    if (!contract) throw "Called Light.mint without a contract";
    setState(LightContractStates.loading);
    const sender = (window as any).ethereum.selectedAddress;
    (async () => {
      await contract.mint(x, y, 0, color, sender);
      await updateInfo();
      setState(LightContractStates.loaded);
    })();
  }

  function setColor(color: number) {
    if (!contract) throw "Called Light.setColor without a contract";
    setState(LightContractStates.loading);
    (async () => {
      await contract.setColor(x, y, 0, color);
      await updateInfo();
      setState(LightContractStates.loaded);
    })();
  }

  function UpdatedColor(
    x: BigNumber,
    y: BigNumber,
    z: BigNumber,
    color: BigNumber,
    updater: string,
    block: any
  ) {
    handleEvent(
      x,
      y,
      `0x${color.toHexString().replace("0x", "").padStart(8, "0")}`
    );
  }
  function Minted(
    x: BigNumber,
    y: BigNumber,
    z: BigNumber,
    color: BigNumber,
    minter: string,
    block: any
  ) {
    handleEvent(
      x,
      y,
      `0x${color.toHexString().replace("0x", "").padStart(8, "0")}`,
      minter
    );
  }

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const address = "0x9499b3a38305090c4646E000712F495eC373237c";
    (window as any).provider = provider;
    (window as any).address = address;
    const abi = LightArtifact.abi;
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(address, abi, signer);
    (window as any).contract = _contract;
    setContract(_contract);

    _contract.on("UpdatedColor", UpdatedColor);
    _contract.on("Minted", Minted);
    return () => {
      _contract.off("UpdatedColor", UpdatedColor);
      _contract.off("Minted", Minted);
    };
  }, []);

  useEffect(() => {
    (async () => {
      await updateInfo();
      setState(LightContractStates.loaded);
    })();
  }, [contract, x, y]);

  return { state, info, mint, setColor };
}
