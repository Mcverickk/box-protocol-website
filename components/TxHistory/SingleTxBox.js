import styles from "@/styles/Tx.module.css";

const SingleTxBox = (props) => {
  return (
    <div className={styles.TxBox}>
      <div className={styles.column1}>
        <p className={styles.txDate}>{props.date}</p>
      </div>
      <div className={styles.column2}>
        <h4
          className={props.txType === "Sell" ? styles.sellType : styles.buyType}
        >
          {props.txType}
        </h4>
      </div>
      <div className={styles.column3}>
        <h5 className={styles.txAmount}>{props.amount} Box Token</h5>
      </div>
      <div className={styles.column4}>
        <h3 className={styles.txBoxName}>Box {props.boxName}</h3>
      </div>
      <div className={styles.column5}>
        <a
          href={props.etherscanTxLink}
          className={styles.etherscanTxLink}
          target="_blank"
          rel="noreferrer"
        >
          <button className={styles.txButton}>View in Polygonscan</button>
        </a>
      </div>
    </div>
  );
};

export { SingleTxBox };
