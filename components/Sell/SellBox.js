import styles from "@/styles/SellBox.module.css";
import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { ADDRESS, ABI } from "../constants";
import { useAccount } from "wagmi";
import { TxModalContext } from "../Modals/TxModalContext";
import {
  TransactionCompleted,
  TransactionInProcess,
  TransactionFailed,
} from "../Modals/TransactionModal";

const SellBox = ({ box }) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("Fetching...");
  const [price, setPrice] = useState("Fetching...");
  const { address } = useAccount();
  const { setModal, setModalOpen } = useContext(TxModalContext);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);

  const sellHandler = async (event) => {
    event.preventDefault();
    if (amount && amount != 0) {
      try {
        const sellAmount = (amount * 100).toFixed(0);
        const tx = await contract.sell(box.boxId, sellAmount);
        const etherscanLink = `https://goerli.etherscan.io/tx/${tx.hash}`;
        setModal(
          <TransactionInProcess
            etherscanTxLink={etherscanLink}
            backHandler={setModalOpen}
          />
        );
        setModalOpen(true);
        const tx1 = await tx.wait();
        console.log({ tx1 });
        setModal(
          <TransactionCompleted
            etherscanTxLink={etherscanLink}
            amount={amount}
            type="sell"
            backHandler={setModalOpen}
          />
        );
        setModalOpen(true);
        getBalance();
        getData();
      } catch (e) {
        console.log(e);
        setModal(
          <TransactionFailed backHandler={setModalOpen} error={e.reason} />
        );
        setModalOpen(true);
      }
    } else {
      alert("Enter a sell amount");
    }
    setAmount("");
  };

  const getBalance = async () => {
    if (address) {
      const result = await contract.balanceOf(address, box.boxId);
      const bal = (result / 100).toFixed(2).toString();
      setBalance(bal);
    } else {
      console.log("address undefined");
    }
  };

  const getData = async () => {
    const priceTemp = await contract.getBoxTokenPrice(box.boxId);
    const price = priceTemp / 10 ** 18;
    setPrice("$" + price.toFixed(2).toString());
  };

  useEffect(() => {
    getBalance();
    getData();
  }, []);

  const PriceInfo = (props) => {
    return (
      <div className={styles.infoBox}>
        <div className={styles.priceInfo}>
          <p className={styles.infoHeader}>{props.title}&nbsp;</p>
          <p className={styles.infoAmount}>{price}</p>
        </div>
        <div className={styles.priceInfo}>
          <p className={styles.infoHeader}>Box Token Balance:&nbsp;</p>
          <p className={styles.infoAmount}>{balance}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.outerBox}>
        <div className={styles.buyBox}>
          <h2 className={styles.boxName}>{box.boxName}</h2>

          <div className={styles.infoArea}>
            <form onSubmit={sellHandler} className={styles.inputForm}>
              <PriceInfo title="Sell Price:" />
              <p className={styles.enterAmounttext}>Enter Token Amount:</p>
              <input
                className={styles.inputBox}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className={styles.buyButton} type="submit" value="Submit">
                SELL
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellBox;
