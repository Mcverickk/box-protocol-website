import { useState } from "react";
import styles from "@/styles/BuySellTab.module.css";
import BuyContent from "./Buy/BuyContent";
import SellContent from "./Sell/SellContent";

function BuySellTab({ buyBoxes, sellBoxes }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className={styles.buySellArea}>
      <div className={styles.tabHeaderArea}>
        <div className={styles.tabHeaderArea2}>
          <button
            className={
              activeTab === 0 ? styles.buyTabButton : styles.inactiveTabButton
            }
            onClick={() => handleTabClick(0)}
          >
            Buy
          </button>
          <button
            className={
              activeTab === 1 ? styles.sellTabButton : styles.inactiveTabButton
            }
            onClick={() => handleTabClick(1)}
          >
            Sell
          </button>
        </div>
      </div>
      {activeTab === 0 && (
        <div className={styles.tabContent}>
          <BuyContent boxes={buyBoxes} />
        </div>
      )}
      {activeTab === 1 && (
        <div className={styles.tabContent}>
          <SellContent boxes={sellBoxes} />
        </div>
      )}
    </div>
  );
}

export default BuySellTab;
