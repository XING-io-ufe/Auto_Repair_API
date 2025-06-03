// components/PlateInputGroup.js
"use client";
import { useRef } from "react";
import styles from "@/styles/plateInputs.module.css";

export default function PlateInputGroup({
  digits = 4,
  letters = 3,
  plateDigits,
  plateLetters,
  setPlateDigits,
  setPlateLetters,
  plateDigitsLabel = "Тоо",
  plateLettersLabel = "Үсэг",
}) {
  const digitsRefs = useRef([]);
  const lettersRefs = useRef([]);

  const handleDigitInput = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    const arr = plateDigits.slice();
    arr[idx] = val ? val[0] : "";
    setPlateDigits(arr);
    if (val && idx < digits - 1) digitsRefs.current[idx + 1]?.focus();
    else if (val && idx === digits - 1) lettersRefs.current[0]?.focus();
  };

  const handleDigitKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const arr = plateDigits.slice();
      if (arr[idx]) {
        arr[idx] = "";
        setPlateDigits(arr);
      } else if (idx > 0) {
        digitsRefs.current[idx - 1]?.focus();
        const prevArr = plateDigits.slice();
        prevArr[idx - 1] = "";
        setPlateDigits(prevArr);
      }
    }
  };

  const handleLetterInput = (e, idx) => {
    const val = e.target.value.replace(/[^A-Za-zА-Яа-яЁёӨөҮү]/g, "");
    const arr = plateLetters.slice();
    arr[idx] = val ? val[0].toUpperCase() : "";
    setPlateLetters(arr);
    if (val && idx < letters - 1) lettersRefs.current[idx + 1]?.focus();
  };

  const handleLetterKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const arr = plateLetters.slice();
      if (arr[idx]) {
        arr[idx] = "";
        setPlateLetters(arr);
      } else if (idx > 0) {
        lettersRefs.current[idx - 1]?.focus();
        const prevArr = plateLetters.slice();
        prevArr[idx - 1] = "";
        setPlateLetters(prevArr);
      }
    }
  };

  return (
    <div>
      <div className={styles.plateInputsGrid}>
        {plateDigits.map((d, i) => (
          <input
            key={"digit-" + i}
            type="text"
            value={d}
            maxLength={1}
            className={styles.plateDigit}
            ref={(el) => (digitsRefs.current[i] = el)}
            onChange={(e) => handleDigitInput(e, i)}
            onKeyDown={(e) => handleDigitKeyDown(e, i)}
            inputMode="numeric"
            autoComplete="off"
          />
        ))}
        <span className={styles.plateSeparator}></span>
        {plateLetters.map((l, i) => (
          <input
            key={"letter-" + i}
            type="text"
            value={l}
            maxLength={1}
            className={styles.plateLetter}
            ref={(el) => (lettersRefs.current[i] = el)}
            onChange={(e) => handleLetterInput(e, i)}
            onKeyDown={(e) => handleLetterKeyDown(e, i)}
            style={{ textTransform: "uppercase" }}
            autoComplete="off"
          />
        ))}
      </div>
      <div className={styles.plateLabelsRow}>
        <span className={styles.plateLabel}>{plateDigitsLabel}</span>
        <span className={styles.plateLabels}>{plateLettersLabel}</span>
      </div>
    </div>
  );
}
