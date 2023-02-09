import { NETWORK_ID, NETWORK_NAME } from "../constants";
import styles from "@/styles/Web3Button.module.css";
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

export { SwitchNetworkButton, CurrentNetworkText };
