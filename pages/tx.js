import styles from "@/styles/Tx.module.css";
import Navbar from "../components/Navbar/AppNavbar";
import { SingleTxBox } from "@/components/TxHistory/SingleTxBox";
import Link from "next/link";

export default function Team() {
  const txData = [
    { date: "1-05-2023", txType: "Buy", amount: "0.1", boxName: "Box 1" },
    { date: "11-05-2023", txType: "Buy", amount: "2.15", boxName: "Box 2" },
    { date: "28-05-2023", txType: "Sell", amount: "1456", boxName: "Box 1" },
    { date: "1-05-2023", txType: "Buy", amount: "0.1", boxName: "Box 1" },
    { date: "11-05-2023", txType: "Sell", amount: "2.15", boxName: "Box 2" },
    { date: "28-05-2023", txType: "Sell", amount: "1456", boxName: "Box 1" },
    { date: "1-05-2023", txType: "Sell", amount: "0.1", boxName: "Box 1" },
    { date: "11-05-2023", txType: "Buy", amount: "2.15", boxName: "Box 2" },
    { date: "28-05-2023", txType: "Sell", amount: "1456", boxName: "Box 1" },
  ];

  const TxHistoryList = () => {
    const x = txData.map((tx) => {
      return (
        <SingleTxBox
          date={tx.date}
          txType={tx.txType}
          amount={tx.amount}
          boxName={tx.boxName}
        />
      );
    });

    return x;
  };

  return (
    <>
      <main className={styles.main}>
        <Navbar activePage="Tx" />
        <div className={styles.body}>
          <Link href="/app">
            <button className={styles.backButton}>
              <i
                className="bi bi-chevron-left"
                style={{
                  background: "transparent",
                  fontSize: "17px",
                  color: "rgba(240, 248, 255, 0.75)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgba(240, 248, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgba(240, 248, 255, 0.75)";
                }}
              />
              <p className={styles.backButtonText}>&nbsp;Back</p>
            </button>
          </Link>
          <h3 className={styles.txHistoryTitle}>Transaction History</h3>
          <TxHistoryList />
        </div>
      </main>
    </>
  );
}
