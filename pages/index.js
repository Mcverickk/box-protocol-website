import HomeNavbar from "../components/Navbar/HomeNavbar";
import styles from "@/styles/Home.module.css";
import AppButton from "@/components/Buttons/AppButton";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <HomeNavbar />
        <div className={styles.body}>
          <div className={styles.textArea}>
            {/* <img src="./logo.png" className={styles.logo}/> */}
            <h4 className={styles.maintext}>
              Invest in Web3 ideas,
              <br />
              with Box Protocol.
            </h4>
            <p className={styles.detailText}>
              Get in on the Web3 revolution with our easy, self-custodial way
              <br /> to invest in boxes representing the hottest ideas and
              sectors in Web3!
            </p>
            <AppButton text="Launch App" />
          </div>
          <div className={styles.imgArea}>
            <img src="./image3.png" className={styles.img} />
          </div>
        </div>
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Copyright &copy; 2023 Box Protocol
          </p>
        </footer>
      </main>
    </>
  );
}
