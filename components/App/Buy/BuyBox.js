import styles from "@/styles/BuyBox.module.css";
import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { ADDRESS, ABI } from "../../constants";
import { TxModalContext } from "../../Modals/TxModalContext";
import { useAccount } from "wagmi";
import {
  TransactionCompleted,
  TransactionInProcess,
  TransactionFailed,
} from "../../Modals/TransactionModal";

const BuyBox = ({ box }) => {
  const [showBuy, setShowBuy] = useState(false);
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("Fetching...");
  const [balance, setBalance] = useState("Fetching...");
  const [tvl, setTvl] = useState("");
  const [TVL_TEXT, setTvlText] = useState("");

  const { setModal, setModalOpen } = useContext(TxModalContext);
  const { address } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(ADDRESS, ABI, signer);

  const navigationHandler = () => {
    setShowBuy(!showBuy);
  };

  useEffect(() => {
    getData();
    getBalance();
  }, []);

  const buyHandler = async (event) => {
    event.preventDefault();
    if (amount && amount != 0) {
      try {
        const txValue = ethers.utils.parseEther(amount).toString();
        const tx = await contract.buy(box.boxId, {
          value: txValue,
        });
        const etherscanLink = `https://polygonscan.com/tx/${tx.hash}`;
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
    try {
      const priceTemp = await contract.getBoxTokenPrice(box.boxId);
      const tvlTemp = await contract.getBoxTVL(box.boxId);
      const price = priceTemp / 10 ** 18;
      const tvl = tvlTemp / 10 ** 18;
      await setPrice("$" + price.toFixed(2).toString());
      await setTvl("$" + tvl.toFixed(2).toString());
      await setTvlText("TVL");
    } catch (e) {
      console.log(e);
      console.log("Error: getData >> BuyBox");
    }
  };

  const getBalance = async () => {
    try {
      if (address) {
        const result = await contract.balanceOf(address, box.boxId);
        const bal = (result / 100).toFixed(2).toString();
        setBalance(bal);
      } else {
        console.log("address undefined");
      }
    } catch (e) {
      console.log(e);
      console.log("Error: getBalance >> BuyBox");
    }
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
      <div className={styles.priceInfo2}>
        <p className={styles.infoHeader2}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount2}>{props.value}</p>
      </div>
    );
  };

  const PriceInfo2 = (props) => {
    return (
      <div className={styles.priceInfo2}>
        <p className={styles.infoHeader2}>{props.title}&nbsp;</p>
        <p className={styles.infoAmount3}>{props.value}</p>
      </div>
    );
  };

  const Box = ({ box }) => {
    return (
      <div className={styles.outerBox}>
        <div className={styles.box}>
          <br />
          <h2 className={styles.boxName}>{box.boxName}</h2>
          <div className={styles.boxData}>
            <h2 className={styles.boxPrice}>{price}</h2>

            {tvl !== "Fetching..." && (
              <>
                <h2 className={styles.boxTVL}>{tvl}</h2>
                <h2 className={styles.boxTVL2}>{TVL_TEXT}</h2>
              </>
            )}
          </div>

          <div className={styles.infoArea}>
            {box.tokenDistribution.map((t) => {
              return <Info title={t.token} value={t.value} key={t.token} />;
            })}
          </div>
          <div className={styles.buyPageButtonDiv}>
            <button
              className={styles.buyPageButton}
              onClick={navigationHandler}
            >
              Proceed to Buy
            </button>
          </div>
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
                  e.target.style.color = "rgba(240, 248, 255, 0.7)";
                }}
              />
              <p className={styles.backButtonText}>&nbsp;Back</p>
            </button>

            <div className={styles.infoArea}>
              <form onSubmit={buyHandler} className={styles.inputForm}>
                <div className={styles.infoBox}>
                  <PriceInfo title="Buy Price:" value={price} />
                  <PriceInfo2 title="Box Token Balance:" value={balance} />
                </div>
                <p className={styles.enterAmounttext}>Enter Amount in MATIC:</p>
                <div className={styles.sellButtonLine}>
                  <input
                    className={styles.inputBox}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder=""
                  />

                  <button
                    className={styles.buyButton}
                    type="submit"
                    value="Submit"
                  >
                    BUY
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyBox;
