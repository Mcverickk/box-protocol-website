import styles from "@/styles/Tx.module.css";

const SingleTxBox = (props) => {
  return (
    <div className={styles.TxBox}>
      <p className={styles.txDate}>{props.date}</p>
      <h4 className={props.txType === "Buy" ? styles.buyType : styles.sellType}>
        {props.txType}
      </h4>
      {props.txType === "Buy" ? (
        <h5 className={styles.txAmount}>{props.amount} ETH</h5>
      ) : (
        <h5 className={styles.txAmount}>{props.amount} Box Token</h5>
      )}

      <h3 className={styles.txBoxName}>{props.boxName}</h3>
      <button className={styles.txButton}>View in Etherscan</button>
    </div>
  );
};

export { SingleTxBox };
