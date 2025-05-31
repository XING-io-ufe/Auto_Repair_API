"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";


import styles from "@/app/verifySignIn/verifySignIn.module.css";
import { verifySignUpOTP } from "@/api/auth";


export default function VerifySignUpPage() {
  const CODE_LENGTH = 6;
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const inputRefs = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  function showToast(msg, type) {
    setToast({ msg, type });
  }

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newCode = code.slice();
    newCode[idx] = val[0];
    setCode(newCode);
    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (!code[idx] && idx > 0) {
        const newCode = code.slice();
        newCode[idx - 1] = "";
        setCode(newCode);
        inputRefs.current[idx - 1].focus();
      } else {
        const newCode = code.slice();
        newCode[idx] = "";
        setCode(newCode);
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputRefs.current[idx - 1].focus();
    if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1)
      inputRefs.current[idx + 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.join("").length !== CODE_LENGTH) return;
    if (!phone) {
      showToast("Утасны дугаар байхгүй байна");
      return;
    }
    setSubmitting(true);
    try {
      const response = await verifySignUpOTP({ phone, otp: code.join("") });
      showToast(response.message, "success");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      showToast(err?.response?.data?.message, "error" || "үл мэдэгдэх алдаа!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.otpWrapper}>
      {toast && (
        <div
          className={`${styles.toast} ${toast.type === "error" ? styles.toastError : styles.toastSuccess
            }`}
          onClick={() => setToast(null)}
        >
          {toast.msg}
        </div>
      )}
      <div className={styles.verifyBox}>
        <h2 className={styles.heading}>Бүртгүүлэх</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.instruction}>
            <b>Танд SMS</b> -ээр ирсэн баталгаажуулах кодыг оруулна уу
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
