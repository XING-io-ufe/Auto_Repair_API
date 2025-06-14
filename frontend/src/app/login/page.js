"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { validatePhone } from "../../utils/phoneValidation";
import { api_url } from '../../settings/apiUrl';
import { signUpPhone, signInPhone } from "@/api/auth";


export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  function showToast(msg, type) {
    setToast({ msg, type });
  }

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const check = validatePhone(phone);
    if (!check.valid) {
      showToast(check.msg, "error");
      return;
    }

    try {
      const response = await signInPhone({ phone });
      showToast(response.message, "success");
      setTimeout(() => {
        router.push(`/verifySignIn?phone=${encodeURIComponent(phone)}`);
      }, 1500);
    } catch (err) {
      showToast(err?.response?.data?.message, "error" || "үл мэдэгдэх алдаа!", "error");
    }
  };

  const handleRegister = async () => {
    const check = validatePhone(phone);
    if (!check.valid) {
      showToast(check.msg, "error");
      return;
    }

    try {
      const response = await signUpPhone({ phone });
      showToast(response.message, "success");
      setTimeout(() => {
        router.push(`/verifySignUp?phone=${encodeURIComponent(phone)}`);
      }, 1500);
    } catch (err) {
      showToast(err?.response?.data?.message, "error" || "үл мэдэгдэх алдаа!", "error");
    }
  };

  return (
    <div className={styles.loginWrapper}>
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
      )
      }

      <div className={styles.loginBox}>
        <button
          className={styles.backBtn}
          aria-label="Буцах"
          onClick={() => router.back()}
        >
          &#8592;
        </button>
        <img src="/login.png" alt="GoService" className={styles.logo} />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Утасны дугаар"
            autoComplete="tel"
            value={phone}
            maxLength={8}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" className={styles.loginBtn}>
            Нэвтрэх
          </button>
          <button
            type="button"
            className={styles.registerBtn}
            onClick={handleRegister}
          >
            Бүртгүүлэх
          </button>
        </form>
      </div>
    </div >
  );
}