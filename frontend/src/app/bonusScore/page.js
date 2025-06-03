"use client";
import styles from "./bonus.module.css";
import { useRouter } from "next/navigation";

const BONUS_LIST = [
  {
    id: 1,
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48">
        <rect x="6" y="12" width="36" height="24" rx="8" fill="#ECECEC" />
        <rect x="16" y="22" width="16" height="10" rx="3" fill="#bbb" />
        <rect x="21" y="26" width="6" height="4" rx="2" fill="#E8E8E8" />
      </svg>
    ),
    message: (
      <>
        Баяр хүргэе! Танд 10,000 бонус оноо нэмэгдлээ. <br />
        Энэ оноогоо дараагийн захиалгандаа ашиглаарай.
      </>
    ),
    date: "2 өдөр 53 минут",
  },
  {
    id: 2,
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48">
        <rect x="6" y="12" width="36" height="24" rx="8" fill="#ECECEC" />
        <rect x="16" y="22" width="16" height="10" rx="3" fill="#bbb" />
        <rect x="21" y="26" width="6" height="4" rx="2" fill="#E8E8E8" />
      </svg>
    ),
    message: (
      <>
        Таны 10,000 бонус оноо амжилттай ашиглагдаж, хөнгөлөлт бодогдлоо.
        <br />
        Манайхаар үйлчлүүлсэнд баярлалаа.
      </>
    ),
    date: "2 өдөр 53 минут",
  },
];

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
      <div
        className={styles.content}
        style={{ justifyContent: "flex-start", paddingTop: 40 }}
      >
        {BONUS_LIST.map((bonus) => (
          <div className={styles.bonusCard} key={bonus.id}>
            <span className={styles.bonusIcon}>{bonus.icon}</span>
            <div className={styles.bonusInfo}>
              <div className={styles.bonusMessage}>{bonus.message}</div>
              <div className={styles.bonusDate}>{bonus.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
