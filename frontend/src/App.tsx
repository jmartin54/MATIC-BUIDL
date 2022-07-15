import "./App.css";
import Lights from "./Lights";
import WalletOnboarding from "./wallet onboarding/WalletOnboarding";

function App() {
  return <WalletOnboarding then={<Lights />} />;
}

export default App;
