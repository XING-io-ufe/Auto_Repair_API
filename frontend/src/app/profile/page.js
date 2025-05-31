"use client";
import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useRouter } from "next/navigation";

import { userUpdate } from "@/api/auth";

export default function ProfilePage() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [toast, setToast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  function showToast(msg, type = "info") {
    setToast({ msg, type });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lastName || !firstName || !phone || !email) {
      showToast("Бүх талбарыг бөглөнө үү!", "error");
      return;
    }
    if (!/^\d{8}$/.test(phone)) {
      showToast("8 оронтой утасны дугаар оруулна уу!", "error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast("Зөв цахим хаяг оруулна уу!", "error");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const Update = await userUpdate({ token, lastName, firstName, phone, email });
      showToast(Update.message, "success");
    } catch (err) {
      console.error("Бонус оноо олдсонгүй!", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {toast && (
          <div
            className={`${styles.toast} ${toast.type === "error"
              ? styles.toastError
              : toast.type === "success"
                ? styles.toastSuccess
                : styles.toastInfo
              }`}
            onClick={() => setToast(null)}
          >
            {toast.msg}
          </div>
        )}
        <div className={styles.topbar}>
          <button
            className={styles.backBtn}
            aria-label="Буцах"
            onClick={() => router.back()}
          >
            &#8592;
          </button>
          <span className={styles.title}>Хувийн мэдээлэл</span>
          <span style={{ width: 24 }} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <span className={styles.icon}>
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#333"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0116 0" />
              </svg>
            </span>
            <input
              className={styles.input}
              type="text"
              placeholder="Овог"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <span className={styles.icon}>
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#333"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0116 0" />
              </svg>
            </span>
            <input
              className={styles.input}
              type="text"
              placeholder="Нэр"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <span className={styles.icon}>
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#333"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="6" y="3" width="12" height="18" rx="2" />
                <circle cx="12" cy="17" r="1" />
              </svg>
            </span>
            <input
              className={styles.input}
              type="tel"
              placeholder="Утасны дугаар"
              maxLength={8}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
            />
          </div>
          <div className={styles.inputRow}>
            <span className={styles.icon}>
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#333"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <input
              className={styles.input}
              type="email"
              placeholder="Цахим хаяг"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className={styles.saveBtn} type="submit">
            Хадгалах
          </button>
        </form>
      </div>
    </div>
  );
}
