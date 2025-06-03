"use client";

import styles from "./notification.module.css";
import { useRouter } from "next/navigation";

const NOTIFICATION_LIST = [
  {
    id: 1,
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 48 48">
        <rect x="6" y="12" width="36" height="24" rx="8" fill="#ECECEC" />
        <path
          d="M24 32c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3zm7-6v-5c0-3.07-1.63-5.64-5-6.32V14a2 2 0 1 0-4 0v.68c-3.37.68-5 3.25-5 6.32v5l-2 2v1h18v-1l-2-2z"
          stroke="#222"
          strokeWidth="1.5"
        />
      </svg>
    ),
    message: (
      <>
        Бид өөрсдийн үйлчилгээг илүү сайжруулах, хэрэглэгчдийн санал хүсэлтэд,
        хяналтдаа
        <br /> нийцүүлэх зорилгоор судалгаа явуулж байна.
      </>
    ),
    date: "2 өдөр 53 минут",
  },
];

export default function NotificationPage() {
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
        <span className={styles.title}>Мэдэгдэл</span>
        <span style={{ width: 24 }} />
      </div>
      <div className={styles.content}>
        {NOTIFICATION_LIST.map((item) => (
          <div className={styles.notificationCard} key={item.id}>
            <span className={styles.icon}>{item.icon}</span>
            <div className={styles.textBlock}>
              <div className={styles.message}>{item.message}</div>
              <div className={styles.date}>{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
