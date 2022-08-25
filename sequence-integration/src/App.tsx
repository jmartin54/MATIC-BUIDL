import "./App.css";
import { sequence } from "0xsequence";
import { useCallback, useState } from "react";
import Pixel from "./Pixel";

function App() {
  const [connected, setConnected] = useState(false);
  const [connectDetails, setConnectDetails] =
    useState<sequence.provider.ConnectDetails | null>(null);

  const connect = useCallback(() => {
    (async () => {
      const wallet = await sequence.initWallet("mumbai");
      const connectDetails = await wallet.connect();
      console.log(connectDetails);
      setConnected(connectDetails.connected);
      setConnectDetails(connectDetails);
    })();
  }, []);

  const open = useCallback(() => {
    (async () => {
      const wallet = sequence.getWallet();
      wallet.openWallet();
    })();
  }, []);

  return (
    <>
      <h1>connected: {`${connected}`}</h1>
      {!connected && <button onClick={connect}>connect wallet</button>}
      {connected && (
        <>
          <p>connected to {connectDetails?.session?.accountAddress}</p>
          <button onClick={open}>open wallet</button>
          <p>
            on network{" "}
            {connectDetails?.chainId == "0x013881"
              ? "mumbai"
              : "unknown network (only mumbai is deployed)"}
          </p>
          <button onClick={open}>change network</button>
        </>
      )}
      {connected && (
        <div>
          <hr />
          <div style={{ display: "flex" }}>
            <Pixel at={[0, 0]} />
            <Pixel at={[0, 1]} />
            <Pixel at={[0, 2]} />
            <Pixel at={[0, 3]} />
            <Pixel at={[0, 4]} />
            <Pixel at={[0, 5]} />
            <Pixel at={[0, 6]} />
            <Pixel at={[0, 7]} />
            <Pixel at={[0, 8]} />
            <Pixel at={[0, 9]} />
            <Pixel at={[0, 10]} />
            <Pixel at={[0, 11]} />
            <Pixel at={[0, 12]} />
            <Pixel at={[0, 13]} />
            <Pixel at={[0, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[1, 0]} />
            <Pixel at={[1, 1]} />
            <Pixel at={[1, 2]} />
            <Pixel at={[1, 3]} />
            <Pixel at={[1, 4]} />
            <Pixel at={[1, 5]} />
            <Pixel at={[1, 6]} />
            <Pixel at={[1, 7]} />
            <Pixel at={[1, 8]} />
            <Pixel at={[1, 9]} />
            <Pixel at={[1, 10]} />
            <Pixel at={[1, 11]} />
            <Pixel at={[1, 12]} />
            <Pixel at={[1, 13]} />
            <Pixel at={[1, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[2, 0]} />
            <Pixel at={[2, 1]} />
            <Pixel at={[2, 2]} />
            <Pixel at={[2, 3]} />
            <Pixel at={[2, 4]} />
            <Pixel at={[2, 5]} />
            <Pixel at={[2, 6]} />
            <Pixel at={[2, 7]} />
            <Pixel at={[2, 8]} />
            <Pixel at={[2, 9]} />
            <Pixel at={[2, 10]} />
            <Pixel at={[2, 11]} />
            <Pixel at={[2, 12]} />
            <Pixel at={[2, 13]} />
            <Pixel at={[2, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[3, 0]} />
            <Pixel at={[3, 1]} />
            <Pixel at={[3, 2]} />
            <Pixel at={[3, 3]} />
            <Pixel at={[3, 4]} />
            <Pixel at={[3, 5]} />
            <Pixel at={[3, 6]} />
            <Pixel at={[3, 7]} />
            <Pixel at={[3, 8]} />
            <Pixel at={[3, 9]} />
            <Pixel at={[3, 10]} />
            <Pixel at={[3, 11]} />
            <Pixel at={[3, 12]} />
            <Pixel at={[3, 13]} />
            <Pixel at={[3, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[4, 0]} />
            <Pixel at={[4, 1]} />
            <Pixel at={[4, 2]} />
            <Pixel at={[4, 3]} />
            <Pixel at={[4, 4]} />
            <Pixel at={[4, 5]} />
            <Pixel at={[4, 6]} />
            <Pixel at={[4, 7]} />
            <Pixel at={[4, 8]} />
            <Pixel at={[4, 9]} />
            <Pixel at={[4, 10]} />
            <Pixel at={[4, 11]} />
            <Pixel at={[4, 12]} />
            <Pixel at={[4, 13]} />
            <Pixel at={[4, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[5, 0]} />
            <Pixel at={[5, 1]} />
            <Pixel at={[5, 2]} />
            <Pixel at={[5, 3]} />
            <Pixel at={[5, 4]} />
            <Pixel at={[5, 5]} />
            <Pixel at={[5, 6]} />
            <Pixel at={[5, 7]} />
            <Pixel at={[5, 8]} />
            <Pixel at={[5, 9]} />
            <Pixel at={[5, 10]} />
            <Pixel at={[5, 11]} />
            <Pixel at={[5, 12]} />
            <Pixel at={[5, 13]} />
            <Pixel at={[5, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[6, 0]} />
            <Pixel at={[6, 1]} />
            <Pixel at={[6, 2]} />
            <Pixel at={[6, 3]} />
            <Pixel at={[6, 4]} />
            <Pixel at={[6, 5]} />
            <Pixel at={[6, 6]} />
            <Pixel at={[6, 7]} />
            <Pixel at={[6, 8]} />
            <Pixel at={[6, 9]} />
            <Pixel at={[6, 10]} />
            <Pixel at={[6, 11]} />
            <Pixel at={[6, 12]} />
            <Pixel at={[6, 13]} />
            <Pixel at={[6, 14]} />
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[7, 0]} />
            <Pixel at={[7, 1]} />
            <Pixel at={[7, 2]} />
            <Pixel at={[7, 3]} />
            <Pixel at={[7, 4]} />
            <Pixel at={[7, 5]} />
            <Pixel at={[7, 6]} />
            <Pixel at={[7, 7]} />
            <Pixel at={[7, 8]} />
            <Pixel at={[7, 9]} />
            <Pixel at={[7, 10]} />
            <Pixel at={[7, 11]} />
            <Pixel at={[7, 12]} />
            <Pixel at={[7, 13]} />
            <Pixel at={[7, 14]} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
