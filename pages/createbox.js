import styles from "@/styles/CreateBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";
import { useState, useEffect } from "react";
import { TokenRow } from "@/components/CreateBox/TokenRow";

export default function CreateBox() {
  const [n, setN] = useState(2);
  const [addTokenArea, setAddTokenArea] = useState();

  const createBoxHandler = () => {};

  useEffect(() => {
    let tokenColumn = [];
    for (let i = 0; i < n; i++) {
      tokenColumn.push(<TokenRow />);
    }
    setAddTokenArea(tokenColumn);
  }, [n]);

  return (
    <>
      <main className={styles.background}>
        <Navbar activePage="createbox" />
        <div className={styles.body}>
          <div className={styles.outerBox}>
            <form className={styles.buyBox} onSubmit={createBoxHandler}>
              <h2 className={styles.boxName}>Create Box</h2>
              {addTokenArea}
              <div className={styles.addSubButton}>
                <button
                  className={styles.addButton}
                  onClick={(e) => {
                    e.preventDefault();
                    const m = n + 1;
                    setN(m);
                  }}
                >
                  <i
                    class="bi bi-plus-circle-fill"
                    style={{
                      background: "transparent",
                      color: "rgba(240, 248, 255, 0.5)",
                      fontSize: "30px",
                    }}
                  />
                </button>
                {n > 2 && (
                  <button
                    className={styles.subButton}
                    onClick={(e) => {
                      e.preventDefault();
                      const m = n - 1;
                      setN(m);
                    }}
                  >
                    <i
                      class="bi bi-dash-circle-fill"
                      style={{
                        background: "transparent",
                        color: "rgba(240, 248, 255, 0.5)",
                        fontSize: "30px",
                      }}
                    />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
