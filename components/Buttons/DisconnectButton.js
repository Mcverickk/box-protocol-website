import styles from "@/styles/Web3Button.module.css";
import { useDisconnect } from "wagmi";

const DisconnectButton = ({ setIsDropdownOpen }) => {
  const { disconnect } = useDisconnect();

  return (
    <>
      <button
        className={styles.disconnectButton}
        onClick={() => {
          disconnect();
          setIsDropdownOpen(false);
        }}
      >
        Disconnect
      </button>
    </>
  );
};

export { DisconnectButton };
