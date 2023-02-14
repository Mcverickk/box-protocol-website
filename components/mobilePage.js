import styles2 from "@/styles/HomeMobile.module.css";

function MobilePage() {
  return (
    <>
      <div className={styles2.background}>
        <img className={styles2.logo} src="logo.png" />
        <div className={styles2.body}>
          <div className={styles2.imgArea}>
            <img src="./image3.png" className={styles2.img} />
          </div>
          <div className={styles2.textArea}>
            <h4 className={styles2.maintext}>
              Invest in Web3 ideas,
              <br /> with Box Protocol.
            </h4>
            <p className={styles2.detailText}>
              Get in on the Web3 revolution with our easy, self-custodial way to
              invest in boxes representing the hottest ideas and sectors in
              Web3!
            </p>
          </div>
          <div className={styles2.textArea2}>
            <p className={styles2.detailText2}>
              Currently the app is only supported for desktop.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export { MobilePage };
