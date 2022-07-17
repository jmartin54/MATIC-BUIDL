import { useState } from "react";
import LightContract, {
  LightContractStates,
  LightInfo,
} from "./contracts/LightContract";
import "./Light.css";
type LightParams = {
  x: number;
  y: number;
};

export default function Light(params: LightParams) {
  const { x, y } = params;
  const { state, info, mint, setColor } = LightContract({ x, y });

  if (state == LightContractStates.loading) return <_Loading {...params} />;
  if (!info?.minted) return <_Mintable mint={mint} />;
  return <_Settable info={info} setColor={setColor} />;
}

function _Loading({ x, y }: LightParams) {
  return (
    <div className="Light">
      [{x}, {y}]
      <p>
        <small>loading</small>
      </p>
    </div>
  );
}

type _MintableParams = {
  mint: (color: number) => void;
};
function _Mintable({ mint }: _MintableParams) {
  const handleClick = () => colorPrompt(mint);
  return (
    <div className="Light" onClick={handleClick}>
      <p>
        <small>tap to mint</small>
      </p>
    </div>
  );
}

type _SettableParams = {
  info: LightInfo;
  setColor: (color: number) => void;
};
function _Settable({ info, setColor }: _SettableParams) {
  const [style, setStyle] = useState({ background: info.color });
  const handleClick = () => colorPrompt(setColor);

  return (
    <div className="Light" style={style} onClick={handleClick}>
      <p>minty</p>
      <small>{info.color}</small>
    </div>
  );
}

// helper
const colorPrompt = (callWithColor: (color: number) => void) => {
  // fetch
  const colorStringRaw = prompt(
    "What hex code (#RRGGBBAA) do you want to set this pixel to when you buy it?"
  );
  // format
  const colorString = colorStringRaw?.replaceAll("#", "");
  const color = Number(`0x${colorString}`);
  const hexLength = colorString?.length ?? 0;
  // evaluate
  if (hexLength !== 8) alert("The hex code must be an 8 digit rgba");
  else if (isNaN(color)) alert("Invalid hex code");
  else callWithColor(color);
};
