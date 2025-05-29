import styles from "./page.module.css";

export default function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h2 className={styles.subtitle}>Туйлын зорилго</h2>
        <h1 className={styles.title}>
          Авто машин дахь амьдралыг аз жаргалтай болгоход тусална.
        </h1>
      </div>
    </section>
  );
}
