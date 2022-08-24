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
          </div>
          <div style={{ display: "flex" }}>
            <Pixel at={[1, 0]} />
            <Pixel at={[1, 1]} />
            <Pixel at={[1, 2]} />
            <Pixel at={[1, 3]} />
            <Pixel at={[1, 4]} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
