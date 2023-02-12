import styles from "@/styles/Investments.module.css";
import Navbar from "../components/Navbar/AppNavbar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ADDRESS, NETWORK_ID } from "@/components/constants";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

export default function Investments() {
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();

  return (
    <>
      <div className={styles.background}>
        <Navbar activePage="Investments" />
        <div className={styles.body}>
          <button className={styles.backButton}>
            <Link className={styles.backButton} href="/app">
              <i
                className="bi bi-chevron-left"
                style={{
                  background: "transparent",
                  fontSize: "17px",
                  color: "rgba(240, 248, 255, 0.75)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "rgba(240, 248, 255, 0.9)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgba(240, 248, 255, 0.75)";
                }}
              />
              <p className={styles.backButtonText}>&nbsp;Back</p>
            </Link>
          </button>
          <h3 className={styles.investmentsTitle}>My Investments</h3>
        </div>
      </div>
    </>
  );
}
