import styles from "@/styles/Tx.module.css";
import Navbar from "../components/Navbar/AppNavbar";
import { SingleTxBox } from "@/components/TxHistory/SingleTxBox";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ADDRESS, NETWORK_ID } from "@/components/constants";
import axios from "axios";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

export default function Tx() {
  const [txData, setTxData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();

  useEffect(() => {
    axios
      .get(
        `https://api.covalenthq.com/v1/${NETWORK_ID}/address/${ADDRESS}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=ckey_1efdb7be794449c9bb3a7c688b3`
      )
      .then((response) => {
        setTxData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const TxHistoryList = () => {
    try {
      if (!address) {
        return <p className={styles.loadingScreen}>Connect Wallet!</p>;
      }
      let c = 0;
      const x = txData.data.items.map((tx) => {
        if (
          ethers.utils.getAddress(address) ===
            ethers.utils.getAddress(tx.from_address) &&
          tx.successful
        ) {
          let txType;
          let amount;
          let boxId;
          const link = `https://polygonscan.com/tx/${tx.tx_hash}`;
          const date = new Date(tx.block_signed_at);
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          const normalDate = date.toLocaleDateString("en-US", options);
          tx.log_events.map((e) => {
            if (e.decoded && e.decoded.name === "TransferSingle") {
              if (
                ethers.utils.getAddress(e.decoded.params[2].value) ===
                ethers.utils.getAddress(address)
              ) {
                txType = "Buy";
              } else {
                txType = "Sell";
              }
              boxId = e.decoded.params[3].value;
              amount = (e.decoded.params[4].value / 10 ** 2).toFixed(2);
            }
          });

          if (txType === "Buy" || txType === "Sell") {
            c++;
            return (
              <SingleTxBox
                date={normalDate}
                txType={txType}
                amount={amount}
                boxName={boxId}
                etherscanTxLink={link}
              />
            );
          }
        }
      });
      if (c === 0) {
        return <p className={styles.noTransactions}>No transactions</p>;
      }
      return x;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div>
        <Navbar activePage="Tx" />
        <p className={styles.loadingScreen}>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <Navbar activePage="Tx" />
        <p className={styles.loadingScreen}>Error: {error.message}</p>
      </div>
    );
  if (!txData) return null;

  return (
    <>
      <div className={styles.background}>
        <Navbar activePage="Tx" />
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
          <h3 className={styles.txHistoryTitle}>Transaction History</h3>
          <TxHistoryList />
        </div>
      </div>
    </>
  );
}
