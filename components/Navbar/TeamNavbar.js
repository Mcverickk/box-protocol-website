import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import AppButton from "@/components/Buttons/AppButton";

const Web3Button = dynamic(
  () => {
    return import("../Buttons/Web3button.js");
  },
  { ssr: false }
);

const Navbar = ({ activePage }) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img className={styles.logo} src="logo.png" />
      </Link>
      <ul className={styles.navlist}>
        <li className={styles.navlistitem}>
          <AppButton text="Launch App" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
