import { useCallback, useEffect, useRef, useState } from "react";
import { sequence } from "0xsequence";
import { ethers } from "ethers";
import lightBuild from "./Light.json";

type LightInfo = {
  minted: boolean;
  owner: string;
  color: string;
};

enum ViewStates {
  loading,
  show,
  setForm,
  mintForm,
}

type PixelProps = {
  at: [number, number];
};

export default function Pixel({ at: [x, y] }: PixelProps) {
  const [info, setInfo] = useState<LightInfo | null>(null);
  const [viewState, setViewState] = useState<ViewStates>(ViewStates.loading);
  const colorInput = useRef<HTMLInputElement | null>(null);

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

      setViewState(ViewStates.show);
    })();
  }, []);

  const mint = useCallback(() => {
    const colorValue = colorInput.current?.value;
    const sanitized = `${colorValue}`.replace("#", "0x");
    const color = parseInt(sanitized, 16);

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

      await lightContract.mint(x, y, 0, color, connectedAddress);
      loadInfo();
    })();
  }, []);

  const set = useCallback(() => {
    const colorValue = colorInput.current?.value;
    const sanitized = `${colorValue}`.replace("#", "0x");
    const color = parseInt(sanitized, 16);

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

      await lightContract.setColor(x, y, 0, color);
      loadInfo();
    })();
  }, []);

  const handleClick = useCallback(() => {
    if (info == null) return;
    if (!info.minted) setViewState(ViewStates.mintForm);
    if (info.minted) setViewState(ViewStates.setForm);
  }, [info]);
  return (
    <div
      style={{
        margin: "0.0em",
        width: "7em",
        height: "7em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //border: info?.minted ? `1px solid ${info?.color}` : "1px solid #333",
        backgroundColor: info?.color,
      }}
      onClick={handleClick}
    >
      {ViewStates.loading == viewState && (
        <p style={{ margin: 0, padding: 0 }}>loading...</p>
      )}
      {ViewStates.show == viewState && (
        <h1 style={{ margin: 0, padding: 0 }}>
          {x} x {y}
        </h1>
      )}
      {ViewStates.mintForm == viewState && (
        <>
          <input ref={colorInput} type="color" />
          <button onClick={mint}>mint</button>
        </>
      )}
      {ViewStates.setForm == viewState && (
        <>
          <input ref={colorInput} type="color" />
          <button onClick={set}>set color</button>
        </>
      )}
    </div>
  );
}
