import styles from "@/styles/CreateBox.module.css";
import { useState } from "react";
import { SUPPORTED_TOKENS } from "../constants";

const TokenRow = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={styles.addTokenRow}>
      <input
        autocomplete="off"
        type="number"
        name="Token Percentage"
        className={styles.input}
        placeholder="Token Percentage"
      />
      <div className={styles.dropdown}>
        <button
          className={styles.tokenButton}
          onClick={(e) => {
            e.preventDefault();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          ETH{" "}
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
                <li className={styles.dropdownContentItems}>
                  <h3 className={styles.tokenName}>{token}</h3>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export { TokenRow };
