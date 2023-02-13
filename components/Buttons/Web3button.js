import { useConnect, useAccount, useEnsName } from "wagmi";
import styles from "@/styles/Web3Button.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SwitchNetworkButton, CurrentNetworkText } from "./SwitchNetworkButton";
import { DisconnectButton } from "./DisconnectButton";

const crossButtonX = (
  <i
    class="bi bi-x"
    style={{
      background: "transparent",
      fontSize: "25px",
      color: "#1010147b",
    }}
    onMouseEnter={(e) => {
      e.target.style.color = "#101014ca";
    }}
    onMouseLeave={(e) => {
      e.target.style.color = "#1010147b";
    }}
  />
);

const iconStyle = {
  background: "transparent",
  fontSize: "15px",
  color: "#f0f8ff",
};

const Web3Button = () => {
  const [copyStatus, setCopyStatus] = useState("./copy.png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    connect,
    connectors,
    error: connectError,
    isLoading: connectIsLoading,
    pendingConnector,
  } = useConnect();
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();

  const { data: ensName } = useEnsName({
    address: address,
  });

  const copyAddressHandler = () => {
    navigator.clipboard.writeText(address);
    setCopyStatus("./check.png");
    setTimeout(() => {
      setCopyStatus("./copy.png");
    }, 1000);
  };

  const ConnectWalletButton = () => {
    return (
      <>
        {connectors.map((connector) => (
          <button
            className={styles.connectButton}
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            Connect Wallet
          </button>
        ))}
      </>
    );
  };

  const DisconnectWalletButton = () => {
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setIsDropdownOpen]);

    let displayAddress =
      address.substring(0, 6) + "...." + address.substring(address.length - 4);

    if (ensName) {
      displayAddress = ensName;
    }

    return (
      <div className={styles.disconnectArea}>
        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            className={styles.diconnectButtonHandler}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {displayAddress}&nbsp;&nbsp;
            {isDropdownOpen ? (
              <i
                class="bi bi-chevron-up"
                style={{
                  background: "transparent",
                  color: "#2ba2d1f6",
                }}
              />
            ) : (
              <i
                class="bi bi-chevron-down"
                style={{
                  background: "transparent",
                  color: "#2ba2d1f6",
                }}
              />
            )}
          </button>
          {isDropdownOpen && (
            <ul className={styles.dropdownContent}>
              <li className={styles.dropdownContentItems}>
                <div className={styles.dropdownHeader}>
                  <h2 className={styles.dropdownHeaderText}>
                    {displayAddress}
                    {isConnected && (
                      <button
                        className={styles.dropdownCopyButton}
                        onClick={copyAddressHandler}
                      >
                        <img
                          className={styles.dropdownCopyIcon}
                          src={copyStatus}
                        />
                      </button>
                    )}
                  </h2>
                  <CurrentNetworkText />
                </div>
              </li>
              {/* <li className={styles.dropdownContentItems}>
                <Link
                  href="/investments"
                  className={styles.dropdownOptionsLink}
                >
                  <button className={styles.dropdownOptionsButton}>
                    <i class="bi bi-wallet2" style={iconStyle} />
                    &nbsp;&nbsp;&nbsp;&nbsp;My Investments
                  </button>
                </Link>
              </li> */}
              <li className={styles.dropdownContentItems}>
                <Link href="/tx" className={styles.dropdownOptionsLink}>
                  <button className={styles.dropdownOptionsButton}>
                    <i class="bi bi-journal-text" style={iconStyle} />
                    &nbsp;&nbsp;&nbsp;&nbsp;Transaction History
                  </button>
                </Link>
              </li>
              <li className={styles.dropdownContentItems}>
                <SwitchNetworkButton setIsDropdownOpen={setIsDropdownOpen} />
              </li>
              <li className={styles.dropdownContentItems}>
                <DisconnectButton setIsDropdownOpen={setIsDropdownOpen} />
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <>{isConnected ? <DisconnectWalletButton /> : <ConnectWalletButton />}</>
  );
};

export default Web3Button;
