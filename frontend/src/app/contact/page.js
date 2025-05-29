"use client";
import styles from "./contact.module.css";
import { useRouter } from "next/navigation";
export default function ContactPage() {
  const phone = "77777070";
  const serviceName = "Car Service";
  const router = useRouter();
  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topbar}>
          <button
            className={styles.backBtn}
            aria-label="Буцах"
            onClick={() => router.back()}
          >
            &#8592;
          </button>
          <span className={styles.title}>Холбоо барих</span>
          <span style={{ width: 28 }} />
        </div>
        <div className={styles.content}>
          <div className={styles.serviceName}>{serviceName}</div>
          <div className={styles.phoneBox}>
            <span className={styles.icon}>
              <svg
                height="22"
                width="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1bb36d"
                strokeWidth="2"
              >
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a1 1 0 0 1 1 .75l1.21 4.21a1 1 0 0 1-.29 1L8.21 10.21a16 16 0 0 0 6.59 6.59l1.26-1.26a1 1 0 0 1 1-.29l4.21 1.21a1 1 0 0 1 .75 1z" />
              </svg>
            </span>
            <span className={styles.phone}>{phone}</span>
          </div>
          <button className={styles.callBtn} onClick={handleCall}>
            Залгах
          </button>
        </div>
      </div>
    </div>
  );
}
