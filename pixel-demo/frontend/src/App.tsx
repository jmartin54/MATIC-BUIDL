import "./App.css";
import LightGrid from "./LightGrid";
import WalletOnboarding from "./wallet onboarding/WalletOnboarding";

function App() {
  return <WalletOnboarding then={<LightGrid />} />;
}

export default App;
