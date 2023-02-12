import styles from "@/styles/CreateBox.module.css";
import Navbar from "@/components/Navbar/AppNavbar";

export default function CreateBox() {
  return (
    <>
      <main className={styles.background}>
        <Navbar activePage="createbox" />
      </main>
    </>
  );
}
