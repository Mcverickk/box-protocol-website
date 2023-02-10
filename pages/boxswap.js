import styles from "@/styles/BoxSwap.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState } from "react";

export default function BoxSwap() {
  const [amount, setAmount] = useState(0);

  return (
    <>
      <main className="main">
        <Navbar activePage="boxswap" />
      </main>
    </>
  );
}

{
  /* <div className={styles.swapBoxBorder}>
          <div className={styles.swapBoxOuter}>
            <div className={styles.header}>
              <h3 className={styles.boxSwapTitle}>Box Swap</h3>
            </div>
            <div className={styles.body}>
              <form className={styles.inputForm}>
                <div className={styles.area1}>
                  <div className={styles.area11}>
                    <input
                      className={styles.inputBox}
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <button className={styles.tokenButton}>
                      TOKEN &nbsp;
                      <i class="bi bi-chevron-down" />
                    </button>
                  </div>

                  <div className={styles.swapAreaFooter}>
                    <p className={styles.priceInUSD}>~$5.01</p>
                    <p className={styles.balance}>Balance: 1.01</p>
                  </div>
                </div>
                <div className={styles.swapLogo}>
                  <i
                    class="bi bi-arrow-down-short"
                    style={{
                      background: "transparent",
                      fontSize: "25px",
                      color: "rgba(240, 248, 255, 0.5)",
                    }}
                  />
                </div>

                <div className={styles.area2}>
                  <div className={styles.area11}>
                    <input
                      className={styles.inputBox2}
                      type="number"
                      value={amount}
                    />
                    <button className={styles.tokenButton}>
                      TO&nbsp;
                      <i class="bi bi-chevron-down" />
                    </button>
                  </div>
                  <div className={styles.swapAreaFooter}>
                    <p className={styles.priceInUSD}>~$5.01</p>
                    <p className={styles.balance}>Balance: 1.01</p>
                  </div>
                </div>

                <button className={styles.swapButton}>Swap</button>
              </form>
            </div>
          </div>
        </div> */
}
