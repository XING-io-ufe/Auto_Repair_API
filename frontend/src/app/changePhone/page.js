"use client";
import { useState, useEffect } from "react";
import styles from "./changeP.module.css";
import { validatePhones } from "@/utils/phoneValidation";
import { useRouter } from "next/navigation";
import { phoneUpdate, checkToken } from "@/api/auth";
import { logout } from "@/utils/logout";

export default function ChangePhonePage() {
  const [currentPhone, setCurrentPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [realPhone, setRealPhone] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();
  function showToast(msg, type) {
    setToast({ msg, type });
  }
  useEffect(() => {
    const fetchUserPhone = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await checkToken({ token });
        const serverPhone = res?.user?.phone;
        console.log(serverPhone);
        setRealPhone(serverPhone);
      } catch (err) {
        console.error("Жинхэнэ дугаар авахад алдаа гарлаа:", err);
        router.push("/");
      }
    };
    fetchUserPhone();
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentFullPhone = `976${currentPhone}`;
    if (currentFullPhone !== realPhone) {
      showToast("Оруулсан одоогийн дугаар буруу байна!", "error");
      return;
    }

    if (currentPhone === newPhone) {
      showToast("Шинэ дугаар нь одоогийн дугаартай ижил байна!", "error");
      return;
    }
    const { valid, msg } = validatePhones(currentPhone, newPhone);
    if (!valid) {
      showToast(msg, "error");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const Update = await phoneUpdate({ token, newPhone });
      showToast(Update.message, "success");
      setTimeout(() => {
        router.push("/login");
        logout()
      }, 1500);
    } catch (err) {
      showToast(err?.message, "error" || "үл мэдэгдэх алдаа!", "error");
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
