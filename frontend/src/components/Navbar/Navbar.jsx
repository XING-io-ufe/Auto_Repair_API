import styles from "./Nabvar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src="/login.png" alt="GoService Logo" className={styles.logo} />
      </div>
      <div className={styles.menu}>
        <a href="/" className={styles.menuBtn}>
          Нүүр хуудас
        </a>
        <a href="/about" className={styles.menuBtn}>
          Бидний тухай
        </a>
        <a href="/intro" className={styles.menuBtn}>
          Танилцуулга
        </a>
        <a href="/login" className={styles.menuBtn}>
          Бүртгэл
        </a>
      </div>
    </nav>
  );
}
