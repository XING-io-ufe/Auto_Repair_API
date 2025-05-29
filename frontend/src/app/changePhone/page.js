"use client";
import { useState, useEffect } from "react";
import styles from "./changeP.module.css";
import { validatePhones } from "@/utils/phoneValidation";
import { useRouter } from "next/navigation";

import { api_url } from '../../settings/apiUrl';
import axios from 'axios';

export default function ChangePhonePage() {
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();
  function showToast(msg, type) {
    setToast({ msg, type });
  }
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2300);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, msg } = validatePhones(currentPhone, newPhone);
    if (!valid) {
      showToast(msg, "error");
      return;
    }

    const token = localStorage.getItem("token");
    const res = await axios.get(`${api_url}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res) {
      showToast("Амжилттай!", "success");
      console.log(res)
    }
  };

  return (
    <div className={styles.wrapper}>
      {toast && (
        <div
          className={`${styles.toast} ${toast.type === "error" ? styles.toastError : styles.toastSuccess
            }`}
          onClick={() => setToast(null)}
        >
          {toast.msg}
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.topbar}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            &#8592;
          </button>
          <span className={styles.title}>Утасны дугаар өөрчлөх</span>
          <span style={{ width: 28 }} />
        </div>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label className={styles.label}>Одоогийн утасны дугаар</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Одоогийн дугаараа оруулна уу"
            value={currentPhone}
            maxLength={8}
            onChange={(e) => setCurrentPhone(e.target.value.replace(/\D/, ""))}
            inputMode="numeric"
          />

          <label className={styles.label}>Шинэ утасны дугаар</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Шинэ дугаараа оруулна уу"
            value={newPhone}
            maxLength={8}
            onChange={(e) => setNewPhone(e.target.value.replace(/\D/, ""))}
            inputMode="numeric"
          />

          <button className={styles.saveBtn}>Үргэлжлүүлэх</button>
        </form>
      </div>
    </div>
  );
}
