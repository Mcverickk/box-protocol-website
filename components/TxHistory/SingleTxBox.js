import styles from "@/styles/Tx.module.css";

const SingleTxBox = (props) => {
  return (
    <div className={styles.TxBox}>
      <div className={styles.column1}>
        <p className={styles.txDate}>{props.date}</p>
      </div>
      <div className={styles.column2}>
        <h4
          className={props.txType === "Buy" ? styles.buyType : styles.sellType}
        >
          {props.txType}
        </h4>
      </div>
      <div className={styles.column3}>
        {props.txType === "Buy" ? (
          <h5 className={styles.txAmount}>{props.amount} ETH</h5>
        ) : (
          <h5 className={styles.txAmount}>{props.amount} Box Token</h5>
        )}
      </div>
      <div className={styles.column4}>
        <h3 className={styles.txBoxName}>{props.boxName}</h3>
      </div>
      <div className={styles.column5}>
        <button className={styles.txButton}>View in Etherscan</button>
      </div>
    </div>
  );
};

export { SingleTxBox };
