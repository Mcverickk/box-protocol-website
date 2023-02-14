import dynamic from "next/dynamic";
import styles from "@/styles/BoxSwap.module.css";
import BBstyles from "@/styles/BuyBox.module.css";
import SBstyles from "@/styles/SellBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState, useEffect, useRef, useContext } from "react";
import {
  OFFICIAL_BOXES,
  ADDRESS,
  ABI,
  NETWORK_ID,
} from "@/components/constants";
import { useAccount, useNetwork, useSigner, useContract } from "wagmi";
import {
  TransactionCompleted,
  TransactionInProcess,
  TransactionFailed,
} from "@/components/Modals/TransactionModal";
import {
  SwitchNetworkButton2,
  SwitchNetworkButton,
} from "@/components/Buttons/SwitchNetworkButton";
const Web3Button = dynamic(
  () => {
    return import("@/components/Buttons/Web3button.js");
  },
  { ssr: false }
);

export default function BoxSwap() {
  const [buyPrice, setBuyPrice] = useState("Loading...");
  const [buyBalance, setBuyBalance] = useState("Loading...");
  const [sellPrice, setSellPrice] = useState("Loading...");
  const [sellBalance, setSellBalance] = useState("Loading...");
  const [buyBoxId, setBuyBoxId] = useState(1);
  const [sellBoxId, setSellBoxId] = useState(0);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isSellDropdownOpen, setIsSellDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState();
  const [appArea, setAppArea] = useState();

  const { data: signer, isError, isLoading } = useSigner();
  const { chain } = useNetwork();
  const contract = useContract({
    address: ADDRESS,
    abi: ABI,
    signerOrProvider: signer,
  });

  const { address, isConnected } = useAccount();

  // useEffect(() => {
  //   if (isConnected && chain.id === NETWORK_ID) {
  //     getBalance(buyBoxId, setBuyBalance);
  //     getPrice(buyBoxId, setBuyPrice);
  //     getBalance(sellBoxId, setSellBalance);
  //     getPrice(sellBoxId, setSellPrice);
  //     setAppArea(<LogInView />);
  //   } else {
  //     setAppArea(<LogOutView />);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isConnected) {
  //     if (chain.id === NETWORK_ID) {
  //       getBalance(buyBoxId, setBuyBalance);
  //       getPrice(buyBoxId, setBuyPrice);
  //       getBalance(sellBoxId, setSellBalance);
  //       getPrice(sellBoxId, setSellPrice);
  //       setAppArea(<LogInView />);
  //     } else {
  //       setAppArea(
  //         <div className={styles.connectWalletBody}>
  //           <SwitchNetworkButton2 />
  //         </div>
  //       );
  //     }
  //   } else {
  //     setAppArea(
  //       <div className={styles.connectWalletBody}>
  //         <h4 className={styles.connectWalletBodyText}>
  //           Wallet is not connected!
  //         </h4>
  //         <Web3Button />
  //       </div>
  //     );
  //   }
  // }, [isConnected, chain]);

  const getBalance = async (boxId, setBalance) => {
    try {
      if (address) {
        const result = await contract.balanceOf(address, boxId);
        const bal = (result / 100).toFixed(2).toString();
        setBalance(bal);
      } else {
        console.log("address undefined");
      }
    } catch (e) {
      console.log(e);
      console.log("Error: getBalance >> BoxSwap");
    }
  };

  const getPrice = async (boxId, setPrice) => {
    try {
      const priceTemp = await contract.getBoxTokenPrice(boxId);
      const price = priceTemp / 10 ** 18;
      setPrice("$" + price.toFixed(2).toString());
    } catch (e) {
      console.log(e);
      console.log("Error: getPrice >> BoxSwap");
    }
  };

  const PriceInfo = (props) => {
    return (
      <div className={styles.priceInfo2}>
        <p className={styles.infoHeader2}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount2}>{props.value}</p>
      </div>
    );
  };

  const PriceInfo2 = (props) => {
    return (
      <div className={styles.priceInfo2}>
        <p className={styles.infoHeader2}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount3}>{props.value}</p>
      </div>
    );
  };

  const Info = (props) => {
    return (
      <div className={styles.info}>
        <p className={styles.infoHeader}>{props.title}</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const BoxInfo = ({
    boxType,
    box,
    price,
    balance,
    setIsDropdownOpen,
    isDropdownOpen,
    setBoxId,
  }) => {
    return (
      <>
        <h2 className={styles.boxType}></h2>

        <div className={styles.dropdown}>
          <button
            className={styles.boxName}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {box.boxName}&nbsp;
            {isDropdownOpen ? (
              <i
                class="bi bi-chevron-up"
                style={{
                  background: "transparent",
                  color: "rgba(240, 248, 255, 0.9)",
                }}
              />
            ) : (
              <i
                class="bi bi-chevron-down"
                style={{
                  background: "transparent",
                  color: "rgba(240, 248, 255, 0.9)",
                }}
              />
            )}
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdownContentBox}>
              <ul className={styles.dropdownContent}>
                {OFFICIAL_BOXES.map((box) => {
                  return (
                    <li key={box.boxId}>
                      <button
                        className={styles.dropdownContentItems}
                        onClick={() => {
                          setBoxId(box.boxId);
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                      >
                        <h3 className={styles.dropdownBoxName}>
                          {box.boxName}
                        </h3>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.infoArea}>
          <div className={styles.infoBox}>
            <PriceInfo title={`${boxType} Price:`} value={price} />
            <PriceInfo2 title="Box Token Balance:" value={balance} />
          </div>
          {box.tokenDistribution.map((t) => {
            return <Info title={t.token} value={t.value} key={t.token} />;
          })}
        </div>
      </>
    );
  };

  const BuyBox = () => {
    getBalance(buyBoxId, setBuyBalance);
    getPrice(buyBoxId, setBuyPrice);
    return (
      <div className={BBstyles.outerBox}>
        <div className={BBstyles.buyBox}>
          <BoxInfo
            boxType="Buy"
            box={OFFICIAL_BOXES[buyBoxId]}
            price={buyPrice}
            balance={buyBalance}
            setIsDropdownOpen={setIsBuyDropdownOpen}
            isDropdownOpen={isBuyDropdownOpen}
            setBoxId={setBuyBoxId}
          />
        </div>
      </div>
    );
  };

  const SellBox = () => {
    getBalance(sellBoxId, setSellBalance);
    getPrice(sellBoxId, setSellPrice);
    return (
      <div className={SBstyles.outerBox}>
        <div className={SBstyles.buyBox}>
          <BoxInfo
            boxType="Sell"
            box={OFFICIAL_BOXES[sellBoxId]}
            price={sellPrice}
            balance={sellBalance}
            setIsDropdownOpen={setIsSellDropdownOpen}
            isDropdownOpen={isSellDropdownOpen}
            setBoxId={setSellBoxId}
          />
        </div>
      </div>
    );
  };

  const swapHandler = async (event) => {
    event.preventDefault();
    if (buyBoxId != sellBoxId) {
      try {
        const tx = await contract.swapBox(sellBoxId, buyBoxId);
        const etherscanLink = `https://polygonscan.com/tx/${tx.hash}`;
        setModal(
          <TransactionInProcess
            etherscanTxLink={etherscanLink}
            backHandler={setModalOpen}
          />
        );
        setModalOpen(true);
        const tx1 = await tx.wait();
        console.log({ tx1 });
        setModal(
          <TransactionCompleted
            etherscanTxLink={etherscanLink}
            sellBoxId={sellBoxId}
            buyBoxId={buyBoxId}
            type="swap"
            backHandler={setModalOpen}
          />
        );
        setModalOpen(true);
        getBalance();
        getPrice();
      } catch (e) {
        console.log(e);
        setModal(
          <TransactionFailed backHandler={setModalOpen} error={e.reason} />
        );
        setModalOpen(true);
      }
    } else {
      alert("Can't swap with same boxes");
    }
  };

  const LogInView = () => {
    try {
      if (!address) {
        return (
          <>
            <p className={styles.loadingScreen}>Connect Wallet!</p>
          </>
        );
      }
      return (
        <div className={styles.swapArea}>
          <SellBox />
          <div className={styles.betweenBoxes}>
            <div className={styles.root}>
              <button
                className={styles.glowingBtn}
                onClick={(event) => {
                  swapHandler(event);
                }}
              >
                <span className={styles.glowingTxt}>
                  Swap&nbsp;
                  <i
                    class="bi bi-arrow-right"
                    style={{
                      fontSize: "17px",
                    }}
                  />
                </span>
              </button>
            </div>
          </div>
          <BuyBox />
        </div>
      );
    } catch (e) {
      console.log(e);
    }
  };

  // const LogOutView = () => {
  //   return (
  //     <div className={styles.connectWalletBody}>
  //       {isConnected ? (
  //         <SwitchNetworkButton2 />
  //       ) : (
  //         <>
  //           <h4 className={styles.connectWalletBodyText}>
  //             Wallet is not connected!
  //           </h4>
  //           <Web3Button />
  //         </>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <>
      <main className={styles.background}>
        <Navbar activePage="boxswap" />
        <LogInView />
        {isModalOpen && modal}
      </main>
    </>
  );
}
