"use client";
import { useState, useEffect } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { validatePhone } from "@/utils/phoneValidation";
export default function AdminLoginPage() {
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  function showToast(msg, type) {
    setToast({ msg, type });
  }

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const check = validatePhone(phone);
    if (!check.valid) {
      showToast(check.msg, "error");
      return;
    }
    if (check) {
      showToast("Амжилттай, OTP авах хуудасруу шилжлээ");
      setTimeout(() => router.push("/admin/verifySignIn"), 2400);
    }
    // энд та сервер рүүгээ хүсэлт явуулах боломжтой
    // try {
    //   const res = await axios.post("http://localhost:3001/api/admin/login", {
    //     phone,
    //   });
    //   // Амжилттай бол
    //   if (res.data.success) {
    //     router.push("/admin/dashboard");
    //   } else {
    //     showToast({
    //       msg: res.data.message || "Нэвтрэхэд алдаа гарлаа.",
    //       type: "error",
    //     });
    //   }
    // } catch (err) {
    //   showToast({ msg: "Сервертэй холбогдож чадсангүй.", type: "error" });
    // }
  };
  const handleRegister = () => {
    const check = validatePhone(phone);
    if (!check.valid) {
      showToast(check.msg, "error");
      return;
    }
    if (check) {
      showToast("Амжилттай, OTP авах хуудасруу шилжлээ");
      setTimeout(() => router.push("/admin/register"), 2400);
    }
  };
  return (
    <div className={styles.wrapper}>
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "error" ? styles.toastError : styles.toastSuccess
          }`}
          onClick={() => setToast(null)}
        >
          {toast.msg}
        </div>
      )}
      <div className={styles.logoBox}>
        <img src="/login.png" alt="GoService" />
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Утасны дугаар"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          maxLength={8}
          className={styles.input}
        />
        <button className={styles.loginBtn}>Нэвтрэх</button>
        <button
          type="button"
          className={styles.registerBtn}
          onClick={handleRegister}
        >
          Бүртгүүлэх
        </button>
      </form>
    </div>
  );
}
