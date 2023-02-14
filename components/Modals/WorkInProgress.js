import styles from "@/styles/Modal.module.css";

const WorkInProgress = ({ header, message }) => {
  return (
    <>
      <div className={styles.WIPmodalContent}>
        <div className={styles.WIPHeader}>
          <h3 className={styles.WIPMessage}>{header}</h3>
          <p className={styles.WIPDetail}>{message}</p>
        </div>
      </div>
    </>
  );
};

export { WorkInProgress };
