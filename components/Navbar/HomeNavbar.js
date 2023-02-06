import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import AppButton from "../Buttons/AppButton";
import { DOCS_LINK } from "../constants";

const HomeNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img className={styles.logo} src="logo.png" />
      </Link>
      <ul className={styles.navlist}>
        <li className={styles.navlistitem}></li>
        <li className={styles.navlistitem}>
          <a
            className={styles.navText}
            href={DOCS_LINK}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li className={styles.navlistitem}>
          <Link className={styles.navText} href="/team">
            Team
          </Link>
        </li>
        <li className={styles.navlistitem}>
          <AppButton text="Launch App" />
        </li>
      </ul>
    </nav>
  );
};

export default HomeNavbar;
