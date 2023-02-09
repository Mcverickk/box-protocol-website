import { NETWORK_ID, NETWORK_NAME } from "../constants";
import styles from "@/styles/Web3Button.module.css";
import styles2 from "@/styles/App.module.css";
import { useNetwork, useSwitchNetwork } from "wagmi";

const SwitchNetworkButton = ({ setIsDropdownOpen }) => {
  const { chain } = useNetwork();
  const {
    chains,
    error: switchNetworkError,
    isLoading: switchNetworkIsLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const swichToText = NETWORK_NAME;
  const switchId = NETWORK_ID;

  return (
    <>
      {chain.id !== NETWORK_ID && (
        <button
          className={styles.networkSwitchButton}
          onClick={() => {
            switchNetwork?.(switchId);
            setIsDropdownOpen(false);
          }}
        >
          Switch to {swichToText}
        </button>
      )}
    </>
  );
};

const CurrentNetworkText = () => {
  const { chain } = useNetwork();
  const currentNetworkName = chain.name;
  return (
    <>
      <h3 className={styles.currentNetworkName}>
        Connected to {currentNetworkName}
      </h3>
    </>
  );
};

const SwitchNetworkButton2 = () => {
  const { chain } = useNetwork();
  const {
    chains,
    error: switchNetworkError,
    isLoading: switchNetworkIsLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const swichToText = NETWORK_NAME;
  const switchId = NETWORK_ID;
  const currentNetworkName = chain.name;

  return (
    <>
      <div className={styles2.loginText}>
        <h3 className={styles2.currentNetworkName}>
          Connected to {currentNetworkName}
        </h3>
        <p className={styles2.demoNetworkText}>
          Currently the app only works on {swichToText}
        </p>
      </div>
      {chain.id !== NETWORK_ID && (
        <button
          className={styles2.networkSwitchButton}
          onClick={() => {
            switchNetwork?.(switchId);
          }}
        >
          Switch to {swichToText}
        </button>
      )}
    </>
  );
};

export { SwitchNetworkButton, SwitchNetworkButton2, CurrentNetworkText };
