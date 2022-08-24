import { useCallback, useEffect, useState } from "react";
import { sequence } from "0xsequence";
import { ethers } from "ethers";
import lightBuild from "./Light.json";

type LightInfo = {
  minted: boolean;
  owner: string;
  color: string;
};

type PixelProps = {
  at: [number, number];
};

export default function Pixel({ at: [x, y] }: PixelProps) {
  const [info, setInfo] = useState<LightInfo | null>(null);

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = useCallback(() => {
    (async () => {
      // Get the wallet signer interface
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner();

      const mumbaiAddress = "0x854F5B53ce5960e1c9485BdEE2fa72062d2b06Ea";
      const lightAbi = lightBuild.abi;
      const lightContract = new ethers.Contract(
        mumbaiAddress,
        lightAbi,
        signer
      );

      const info = await lightContract.callStatic.light(x, y, 0);

      (window as any).contract = lightContract;
      console.log(x, y, info);

      const color = info.color.toHexString().replace("0x", "#");
      setInfo({
        minted: info.minted,
        color: color,
        owner: info.owner,
      });
    })();
  }, []);

  const mint = useCallback(() => {
    (async () => {
      // Get the wallet signer interface
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner();

      const mumbaiAddress = "0x854F5B53ce5960e1c9485BdEE2fa72062d2b06Ea";
      const lightAbi = lightBuild.abi;
      const lightContract = new ethers.Contract(
        mumbaiAddress,
        lightAbi,
        signer
      );

      const connectedAddress = await wallet.getAddress();

      await lightContract.mint(x, y, 0, 0x18f25669, connectedAddress);
      loadInfo();
    })();
  }, []);

  const set = useCallback(() => {
    (async () => {
      // Get the wallet signer interface
      const wallet = sequence.getWallet();
      const signer = wallet.getSigner();

      const mumbaiAddress = "0x854F5B53ce5960e1c9485BdEE2fa72062d2b06Ea";
      const lightAbi = lightBuild.abi;
      const lightContract = new ethers.Contract(
        mumbaiAddress,
        lightAbi,
        signer
      );

      await lightContract.setColor(x, y, 0, 0x00ffff69);
      loadInfo();
    })();
  }, []);

  const handleClick = useCallback(() => {
    console.log(x, y, info);
    if (info == null) return;
    if (info.minted) set();
    if (!info.minted) mint();
  }, [info]);
  return (
    <div
      style={{
        margin: "0.5em",
        width: "7em",
        height: "7em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #333",
        backgroundColor: info?.color,
      }}
      onClick={handleClick}
    >
      {info == null && <p style={{ margin: 0, padding: 0 }}>loading...</p>}
      <h1 style={{ margin: 0, padding: 0 }}>
        {x} x {y}
      </h1>
    </div>
  );
}
