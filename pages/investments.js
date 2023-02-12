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
      </div>
    </>
  );
}
