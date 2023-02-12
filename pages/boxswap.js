import styles from "@/styles/BoxSwap.module.css";
import BBstyles from "@/styles/BuyBox.module.css";
import SBstyles from "@/styles/SellBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState, useEffect, useRef } from "react";
import { OFFICIAL_BOXES, ADDRESS, ABI } from "@/components/constants";
import { useAccount, useProvider, useSigner, useContract } from "wagmi";

export default function BoxSwap() {
  const [buyPrice, setBuyPrice] = useState("Loading...");
  const [buyBalance, setBuyBalance] = useState("Loading...");
  const [sellPrice, setSellPrice] = useState("Loading...");
  const [sellBalance, setSellBalance] = useState("Loading...");
  const [buyBoxId, setBuyBoxId] = useState(1);
  const [sellBoxId, setSellBoxId] = useState(0);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isSellDropdownOpen, setIsSellDropdownOpen] = useState(false);

  const { data: signer, isError, isLoading } = useSigner();
  const contract = useContract({
    address: ADDRESS,
    abi: ABI,
    signerOrProvider: signer,
  });

  const { address } = useAccount();

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
                    <li>
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
                        <p
                          className={styles.dropdownBoxId}
                        >{`Box Id: ${box.boxId}`}</p>
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

  const swapHandler = () => {
    alert("Swap");
  };

  return (
    <>
      <main className={styles.background}>
        <Navbar activePage="boxswap" />
        <div className={styles.swapArea}>
          <SellBox />
          <div className={styles.betweenBoxes}>
            <div className={styles.root}>
              <button className={styles.glowingBtn} onClick={swapHandler}>
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
      </main>
    </>
  );
}
