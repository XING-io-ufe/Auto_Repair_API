import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div>
          <span>📍 Монгол Улс, Улаанбаатар хот, Баянзүрх дүүрэг</span>
          <br />
          <span>16-р хороо, Амарсанаагийн гудамж-68</span>
        </div>
        <div className={styles.phone}>📞 77777070</div>
        <div className={styles.mail}>✉️ admin@gmail.com</div>
      </div>
      <div className={styles.brand}>
        <img src="/login.png" alt="GoService Logo" className={styles.logo} />
      </div>
    </footer>
  );
}
