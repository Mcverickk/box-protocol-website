import styles from "@/styles/BoxSwap.module.css";
import BBstyles from "@/styles/BuyBox.module.css";
import SBstyles from "@/styles/SellBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState } from "react";
import { OFFICIAL_BOXES } from "@/components/constants";

export default function BoxSwap() {
  const [amount, setAmount] = useState(0);

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

  const BoxInfo = ({ boxType, box }) => {
    return (
      <>
        <h2 className={styles.boxType}>{boxType}</h2>
        <h2 className={styles.boxName}>{box.boxName}</h2>
        <div className={styles.infoArea}>
          <div className={styles.infoBox}>
            <PriceInfo title={`${boxType} Price:`} value="$1.2" />
            <PriceInfo2 title="Box Token Balance:" value="50.6" />
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
          <BoxInfo boxType="Buy" box={OFFICIAL_BOXES[0]} />
        </div>
      </div>
    );
  };

  const SellBox = () => {
    return (
      <div className={SBstyles.outerBox}>
        <div className={SBstyles.buyBox}>
          <BoxInfo boxType="Sell" box={OFFICIAL_BOXES[1]} />
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
