import { ethers } from "ethers";
import { useEffect, useState } from "react";

const LightArtifact = require("./build/Light.json");
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
  //   useEffect(() => {
  //     switch (state) {
  //       case LightContractStates.loading:
  //         setTimeout(
  //           () => setState(LightContractStates.error),
  //           (y * 3 + x) * 500 + 500
  //         );
  //         break;
  //       case LightContractStates.error:
  //         setTimeout(
  //           () => setState(LightContractStates.loading),
  //           (y * 3 + x) * 500 + 500
  //         );
  //         break;
  //     }
  //   }, [state]);

  async function updateInfo() {
    if (!contract) return;
    // fetch
    const LightInfo = { minted: 0, owner: 1, color: 2 };
    const info = await contract.light.call(1, x, y, 0);
    // format
    console.log(info);
    const minted = info.minted;
    const owner = info.owner;
    const color = "#" + info.color.toHexString().replaceAll("0x", "");
    console.log("color", color);
    // set
    setInfo({ minted, owner, color });
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

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const address = LightArtifact.networks["5777"].address;
    const abi = LightArtifact.abi;
    const signer = provider.getSigner();
    const _contract = new ethers.Contract(address, abi, signer);
    (window as any).contract = _contract;
    setContract(_contract);
  }, []);

  useEffect(() => {
    (async () => {
      await updateInfo();
      setState(LightContractStates.loaded);
    })();
  }, [contract, x, y]);

  return { state, info, mint, setColor };
}
