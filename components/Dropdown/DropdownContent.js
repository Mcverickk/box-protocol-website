import styles from "@/styles/DropdownContent.module.css";

const DropdownContent = () => {
  return (
    <>
      <ul className={styles.dropdownContent}>
        <li className={styles.dropdownContentItems}>
          <span className={styles.dropdownIcons}>
            <i class="bi bi-coin" />
          </span>
          My Investments
        </li>
        <li className={styles.dropdownContentItems}>Transaction History</li>
        <li className={styles.dropdownContentItems}>Option 3</li>
      </ul>
    </>
  );
};

export { DropdownContent };
