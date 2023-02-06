import styles from "@/styles/Modal.module.css";

const crossButtonX = (
  <i
    class="bi bi-x"
    style={{
      background: "transparent",
      fontSize: "30px",
      color: "#1010147b",
    }}
    onMouseEnter={(e) => {
      e.target.style.color = "#101014ca";
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#1010147b";
    }}
  />
);

const TransactionInProcess = ({ etherscanTxLink, backHandler }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.modalCrossButton}
            onClick={() => {
              backHandler(false);
            }}
          >
            {crossButtonX}
          </button>
        </div>
        <div className={styles.modalFooter}>
          <img src="loading.gif" className={styles.loadingGif} />
          <h3 className={styles.modalHeaderText}>Transaction In Process</h3>
          <p className={styles.modalText}>Waiting for confirmation</p>
          <a
            className={styles.etherscanLink}
            href={etherscanTxLink}
            target="_blank"
            rel="noreferrer"
          >
            <button className={styles.etherscanButton}>
              View on Etherscan
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const TransactionCompleted = ({
  etherscanTxLink,
  amount,
  type,
  backHandler,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button
            className={styles.modalCrossButton}
            onClick={() => {
              backHandler(false);
            }}
          >
            {crossButtonX}
          </button>
        </div>
        <div className={styles.modalFooter}>
          <img src="success.jpeg" className={styles.successImg} />
          <h3 className={styles.modalHeaderText}>Transaction Completed</h3>
          <p className={styles.modalText}>
            {type === "buy" && `Box Tokens worth ${amount} ETH bought`}
            {type === "sell" && `${amount} Box Tokens sold`}
          </p>
          <a
            className={styles.etherscanLink}
            href={etherscanTxLink}
            target="_blank"
            rel="noreferrer"
          >
            <button className={styles.etherscanButton}>
              View on Etherscan
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const TransactionFailed = ({ backHandler, error }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContentFail}>
        <div className={styles.modalHeader}>
          <button
            className={styles.modalCrossButton}
            onClick={() => {
              backHandler(false);
            }}
          >
            {crossButtonX}
          </button>
        </div>
        <div className={styles.modalFooter}>
          <img src="failed.png" className={styles.failImg} />
          <h3 className={styles.modalHeaderText}>Transaction Failed</h3>
          <p className={styles.modalText}>
            {error ? error : "No error given"}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export { TransactionCompleted, TransactionInProcess, TransactionFailed };
