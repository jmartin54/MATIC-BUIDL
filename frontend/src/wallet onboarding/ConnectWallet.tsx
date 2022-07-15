import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

type ConnectWalletProps = {
  then: JSX.Element;
};
export default function ConnectWallet({ then }: ConnectWalletProps) {
  const ethereum = (window as any).ethereum;
  const selectedAddress = ethereum.selectedAddress;
  const [connected, setConnected] = useState(false);

  const handleConnect = useCallback(function () {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    (async () => {
      await provider.send("eth_requestAccounts", []);
      const _signer = provider.getSigner();
      setConnected(true);
    })();
  }, []);

  const accountsListener = useCallback((accounts: string[]) => {
    if (accounts.length == 0) setConnected(false);
    else setConnected(true);
  }, []);

  useEffect(() => {
    ethereum.on("accountsChanged", accountsListener);

    return () => {
      ethereum.removeListener("accountsChanged", accountsListener);
    };
  }, []);

  useEffect(() => {
    setConnected(selectedAddress != "");
  }, [selectedAddress]);

  if (connected) return then;
  return (
    <div className="box">
      <h1>Connect your wallet</h1>
      <p>
        This website is built ontop of the blockchain. In order to use it, you
        must connect a Web3 wallet.
      </p>
      <button onClick={handleConnect}>Connect Wallet</button>
    </div>
  );
}
