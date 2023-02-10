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
import { SwitchNetworkButton2 } from "@/components/Buttons/SwitchNetworkButton";

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
            <SwitchNetworkButton2 />
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
          <SwitchNetworkButton2 />
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

  return (
    <>
      <div className={styles.background}>
        <Navbar activePage="App" />
        {appArea}
        {isModalOpen && modal}
      </div>
    </>
  );
}
