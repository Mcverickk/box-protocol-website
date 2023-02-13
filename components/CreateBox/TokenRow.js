import styles from "@/styles/CreateBox.module.css";
import { useState } from "react";
import { SUPPORTED_TOKENS } from "../constants";

const TokenRow = ({ id }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState("MATIC");

  return (
    <div className={styles.addTokenRow}>
      <input
        autocomplete="off"
        type="number"
        name="Token Percentage"
        className={styles.input}
        placeholder="Token % "
      />
      <div className={styles.dropdown}>
        <button
          className={styles.tokenButton}
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {selectedToken}{" "}
          <i
            class="bi bi-chevron-down"
            style={{
              background: "transparent",
              color: "rgba(240, 248, 255, 0.9)",
            }}
          />
        </button>
        {isDropdownOpen && (
          <ul className={styles.dropdownContent}>
            {SUPPORTED_TOKENS.map((token) => {
              return (
                <button
                  className={styles.tokenName}
                  key={token}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedToken(token);
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  <li className={styles.dropdownContentItems}>{token}</li>
                </button>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export { TokenRow };
