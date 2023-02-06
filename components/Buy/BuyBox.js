import styles from "@/styles/BuyBox.module.css";
import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { ADDRESS, ABI } from "../constants";
import { TxModalContext } from "../Modals/TxModalContext";
import {
  TransactionCompleted,
  TransactionInProcess,
  TransactionFailed,
} from "../Modals/TransactionModal";

const BuyBox = ({ box }) => {
  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("Fetching...");
  const [tvl, setTvl] = useState("Fetching...");
  const { setModal, setModalOpen } = useContext(TxModalContext);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);

  const navigationHandler = () => {
    setShowBuy(!showBuy);
  };

  useEffect(() => {
    getData();
  }, []);

  const buyHandler = async (event) => {
    event.preventDefault();
    if (amount && amount != 0) {
      try {
        const txValue = ethers.utils.parseEther(amount).toString();
        const tx = await contract.buy(box.boxId, {
          value: txValue,
        });
        const etherscanLink = `https://goerli.etherscan.io/tx/${tx.hash}`;
        navigationHandler();
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
            type="buy"
            backHandler={setModalOpen}
          />
        );
        setModalOpen(true);
        getData();
      } catch (e) {
        console.log(e);
        navigationHandler();
        setModal(
          <TransactionFailed backHandler={setModalOpen} error={e.reason} />
        );
        setModalOpen(true);
      }
    } else {
      navigationHandler();
      alert("Enter a buy amount");
    }
    setAmount("");
  };

  const getData = async () => {
    const priceTemp = await contract.getBoxTokenPrice(box.boxId);
    const tvlTemp = await contract.getBoxTVL(box.boxId);
    const price = priceTemp / 10 ** 18;
    const tvl = tvlTemp / 10 ** 18;
    setPrice("$" + price.toFixed(2).toString());
    setTvl("$" + tvl.toFixed(2).toString());
  };

  const Info = (props) => {
    return (
      <div className={styles.info}>
        <p className={styles.infoHeader}>{props.title}</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const PriceInfo = (props) => {
    return (
      <div className={styles.priceInfo}>
        <p className={styles.infoHeader}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const InfoWithBorder = (props) => {
    return (
      <div className={styles.infoWithBorder}>
        <p className={styles.infoHeader}>{props.title}</p>
        <p className={styles.infoAmount}>{props.value}</p>
      </div>
    );
  };

  const Box = ({ box }) => {
    return (
      <div className={styles.outerBox}>
        <div className={styles.box}>
          <h2 className={styles.boxName}>{box.boxName}</h2>
          <div className={styles.infoArea}>
            {box.tokenDistribution.map((t) => {
              return <Info title={t.token} value={t.value} key={t.token} />;
            })}
          </div>
          <div className={styles.infoArea}>
            <InfoWithBorder title="Price" value={price} />
            <InfoWithBorder title="Total Value Locked" value={tvl} />
          </div>

          <button className={styles.buyPageButton} onClick={navigationHandler}>
            Proceed to Buy
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {!showBuy ? (
        <Box box={box} />
      ) : (
        <div className={styles.outerBox}>
          <div className={styles.buyBox}>
            <button className={styles.backButton} onClick={navigationHandler}>
              Back
            </button>

            <div className={styles.infoArea}>
              <form onSubmit={buyHandler} className={styles.inputForm}>
                <PriceInfo title="Buy Price:" value={price} />
                <p className={styles.enterAmounttext}>Enter Amount in ETH:</p>
                <input
                  className={styles.inputBox}
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button
                  className={styles.buyButton}
                  type="submit"
                  value="Submit"
                >
                  BUY
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyBox;
