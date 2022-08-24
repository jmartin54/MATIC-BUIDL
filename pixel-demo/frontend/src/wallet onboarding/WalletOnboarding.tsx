import { useState, useEffect } from "react";
import ConnectWallet from "./ConnectWallet";
import InstallWallet from "./InstallWallet";

type WalletOnboardingProps = {
  then: JSX.Element;
};
export default function WalletOnboarding({ then }: WalletOnboardingProps) {
  const [loaded, setLoaded] = useState(false);
  const { ethereum } = window as any;
  useEffect(() => {
    setLoaded(ethereum !== undefined);
  }, [ethereum]);
  if (loaded) {
    return <ConnectWallet then={then} />;
  } else {
    return <InstallWallet />;
  }
}
