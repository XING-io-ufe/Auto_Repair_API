"use client";
import { useRef, useState } from "react";
import styles from "./signIn.module.css";
import { useRouter } from "next/navigation";
export default function AdminVerifySignIn() {
  const CODE_LENGTH = 6;
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const inputRefs = useRef([]);
  const router = useRouter();
  // Кодуудыг input-д оруулах болон backspace хийх logic
  const handleInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newCode = [...code];
    newCode[idx] = val[0];
    setCode(newCode);

    if (idx < CODE_LENGTH - 1 && val) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (code[idx]) {
        const newCode = [...code];
        newCode[idx] = "";
        setCode(newCode);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
        const newCode = [...code];
        newCode[idx - 1] = "";
        setCode(newCode);
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1)
      inputRefs.current[idx + 1]?.focus();
  };

  // Toast logic
  function showToast(msg, type = "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2200);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.join("").length !== CODE_LENGTH) {
      showToast("Бүх кодыг бүрэн оруулна уу!");
      return;
    }
    setSubmitting(true);
    // TODO: Энд сервер рүү баталгаажуулах хүсэлт явуулна
    showToast("Амжилттай! Dashboard хуудасруу шилжлээ", "success");
    setTimeout(() => {
      setSubmitting(false);
      router.push("/admin/adminDashboard");
    }, 2400);
  };

  return (
    <div className={styles.wrapper}>
      {toast && (
        <div
          className={`${styles.toast} ${
            toast.type === "success" ? styles.toastSuccess : styles.toastError
          }`}
        >
          {toast.msg}
        </div>
      )}
      <div className={styles.card}>
        <h2 className={styles.heading}>Нэвтрэх</h2>
        <div className={styles.line} />
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <p className={styles.instruction}>
            Танд SMS -ээр ирсэн
            <br />
            баталгаажуулах кодыг оруулна уу
          </p>
          <div className={styles.otpInputs}>
            {[...Array(CODE_LENGTH)].map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                className={styles.otpInput}
                maxLength={1}
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus={idx === 0}
                value={code[idx]}
                onChange={(e) => handleInput(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                tabIndex={idx + 1}
              />
            ))}
          </div>
          <button
            className={styles.verifyBtn}
            type="submit"
            disabled={code.join("").length !== CODE_LENGTH || submitting}
          >
            Баталгаажуулах
          </button>
        </form>
      </div>
    </div>
  );
}
