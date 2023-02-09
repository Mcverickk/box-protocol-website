import styles from "@/styles/GlowingButton.module.css";
import Link from "next/link";

const GlowingButton = () => {
  return (
    <Link href="/app" className={styles.root}>
      <button className={styles.glowingBtn}>
        <span className={styles.glowingTxt}>Launch App</span>
      </button>
    </Link>
  );
};

export default GlowingButton;
