import Navbar from "../components/Navbar/AppNavbar";
import BuySellTab from "@/components/App/BuySellTab";
import { useEffect, useState, useContext } from "react";
import styles from "@/styles/App.module.css";
import { useProvider, useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";
import {
  ABI,
  ADDRESS,
  OFFICIAL_BOXES,
  NETWORK_ID,
  NETWORK_NAME,
} from "@/components/constants";
import dynamic from "next/dynamic";
import { TxModalContext } from "@/components/Modals/TxModalContext";
import {
  TransactionCompleted,
  TransactionFailed,
  TransactionInProcess,
} from "@/components/Modals/TransactionModal";

const Web3Button = dynamic(
  () => {
    return import("@/components/Buttons/Web3button.js");
  },
  { ssr: false }
);

export default function App() {
  const [modal, setModal] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [allBox, setBoxes] = useState(OFFICIAL_BOXES);
  const [appArea, setAppArea] = useState();

  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const {
    chains,
    error: switchNetworkError,
    isLoading: switchNetworkIsLoading,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();

  const provider = useProvider();
  const boxProtocolContract = new ethers.Contract(ADDRESS, ABI, provider);

  useEffect(() => {
    if (isConnected && chain.id === NETWORK_ID) {
      setAppArea(<LogInView />);
    } else {
      setAppArea(<LogOutView />);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      if (chain.id === NETWORK_ID) {
        setAppArea(<LogInView />);
      } else {
        setAppArea(
          <div className={styles.connectWalletBody}>
            <SwitchNetworkButton />
          </div>
        );
      }
    } else {
      setAppArea(
        <div className={styles.connectWalletBody}>
          <h4 className={styles.connectWalletBodyText}>
            Wallet is not connected!
          </h4>
          <Web3Button />
        </div>
      );
    }
  }, [isConnected, allBox, chain]);

  const LogOutView = () => {
    return (
      <div className={styles.connectWalletBody}>
        {isConnected ? (
          <SwitchNetworkButton />
        ) : (
          <>
            <h4 className={styles.connectWalletBodyText}>
              Wallet is not connected!
            </h4>
            <Web3Button />
          </>
        )}
      </div>
    );
  };

  const LogInView = () => {
    const values = { setModal, setModalOpen };
    return (
      <div className={styles.body}>
        <TxModalContext.Provider value={values}>
          <BuySellTab buyBoxes={allBox} sellBoxes={allBox} />
        </TxModalContext.Provider>
      </div>
    );
  };

  const SwitchNetworkButton = () => {
    const swichToText = NETWORK_NAME;
    const switchId = NETWORK_ID;
    const currentNetworkName = chain.name;

    return (
      <>
        <div className={styles.loginText}>
          <h3 className={styles.currentNetworkName}>
            Connected to {currentNetworkName}
          </h3>
          <p className={styles.demoNetworkText}>
            Currently the app only works on {swichToText}
          </p>
        </div>
        {chain.id !== switchId && (
          <button
            className={styles.networkSwitchButton}
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

  return (
    <>
      <main>
        <Navbar activePage="App" />
        {appArea}
        {isModalOpen && modal}
      </main>
    </>
  );
}
