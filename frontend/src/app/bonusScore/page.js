"use client";

import styles from "./bonus.module.css";
import { useRouter } from "next/navigation";
export default function BonusPage() {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <button
          className={styles.backBtn}
          aria-label="Буцах"
          onClick={() => router.back()}
        >
          &#8592;
        </button>
        <span className={styles.title}>Бонус оноо</span>
        <span style={{ width: 24 }} />
      </div>
      <div className={styles.content}>
        <div className={styles.emptyIcon}>
          <svg width="36" height="36" viewBox="0 0 48 48">
            <rect x="6" y="12" width="36" height="24" rx="8" fill="#ECECEC" />
            <rect x="16" y="22" width="16" height="10" rx="3" fill="#bbb" />
            <rect x="21" y="26" width="6" height="4" rx="2" fill="#E8E8E8" />
          </svg>
        </div>
        <div className={styles.emptyText}>
          <div className={styles.emptyTitle}>Бонус онооны түүх</div>
          <div className={styles.emptyDesc}>
            Одоогоор Бонус онооны түүх байхгүй байна
          </div>
        </div>
      </div>
    </div>
  );
}
