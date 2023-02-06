import styles from "@/styles/Navbar.module.css";
import Link from "next/link";

const AppButton = (props) => {
  return (
    <Link href="/app" className={styles.buttonText}>
      <button className={styles.connectButton}>{props.text}</button>
    </Link>
  );
};

export default AppButton;
