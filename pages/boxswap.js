import styles from "@/styles/BoxSwap.module.css";
import BBstyles from "@/styles/BuyBox.module.css";
import SBstyles from "@/styles/SellBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState, useEffect, useRef } from "react";
import { OFFICIAL_BOXES } from "@/components/constants";

export default function BoxSwap() {
  const [amount, setAmount] = useState(0);
  const [buyPrice, setBuyPrice] = useState("Loading...");
  const [buyBalance, setBuyBalance] = useState("Loading...");
  const [sellPrice, setSellPrice] = useState("Loading...");
  const [sellBalance, setSellBalance] = useState("Loading...");
  const [buyBoxId, setBuyBoxId] = useState(1);
  const [sellBoxId, setSellBoxId] = useState(0);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isSellDropdownOpen, setIsSellDropdownOpen] = useState(false);

  const BlackButton = () => {
    return <button className={BBstyles.buyButton}>BUY</button>;
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
    return (
      <div className={BBstyles.outerBox}>
        <div className={BBstyles.buyBox}>
          <BoxInfo
            boxType="Buy"
            box={OFFICIAL_BOXES[buyBoxId]}
            price="$4.1"
            balance="3.54"
            setIsDropdownOpen={setIsBuyDropdownOpen}
            isDropdownOpen={isBuyDropdownOpen}
            setBoxId={setBuyBoxId}
          />
        </div>
      </div>
    );
  };

  const SellBox = () => {
    return (
      <div className={SBstyles.outerBox}>
        <div className={SBstyles.buyBox}>
          <BoxInfo
            boxType="Sell"
            box={OFFICIAL_BOXES[sellBoxId]}
            price="$4.1"
            balance="3.54"
            setIsDropdownOpen={setIsSellDropdownOpen}
            isDropdownOpen={isSellDropdownOpen}
            setBoxId={setSellBoxId}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <main className={styles.background}>
        <Navbar activePage="boxswap" />
        <div className={styles.swapArea}>
          <SellBox />
          <div className={styles.betweenBoxes}>
            <div className={styles.root}>
              <button className={styles.glowingBtn}>
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
