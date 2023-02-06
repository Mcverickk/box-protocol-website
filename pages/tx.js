import styles from "@/styles/Tx.module.css";
import Navbar from "../components/Navbar/TeamNavbar";
import { SingleTxBox } from "@/components/TxHistory/SingleTxBox";

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
        <Navbar activePage="Team" />
        <div className={styles.body}>
          <h3 className={styles.txHistoryTitle}>Transaction History</h3>
          <TxHistoryList />
        </div>
      </main>
    </>
  );
}
