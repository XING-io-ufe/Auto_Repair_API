"use client";
import { useEffect, useState } from "react";
import styles from "./addCar.module.css";
import { useRouter } from "next/navigation";
import PlateInputGroup from "@/components/PlateInputGroup";
import Toast from "@/components/Toast";
import Dropdown from "@/components/Dropdown";
import { getcar } from "@/api/car";
import { addedcar } from "@/api/car";
import { getmanufacturer } from "@/api/manufacturer";
import { useUser } from "../../context/UserContext";


export default function AddCarPage() {
  const [manufacturers, setManufacturers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [plateDigits, setPlateDigits] = useState(Array(4).fill(""));
  const [plateLetters, setPlateLetters] = useState(Array(3).fill(""));

  const [toast, setToast] = useState(null);
  const router = useRouter();
  const { user } = useUser();


  useEffect(() => {
    const fetchmanufacturer = async () => {
      try {
        const manufacturerData = await getmanufacturer();
        setManufacturers(manufacturerData);
      } catch (err) {
        showToast('Салбаруудыг авахад алдаа гарлаа', 'error');
      }
    }
    const fetchcar = async () => {
      try {
        const serviceData = await getcar();
        setBrands(serviceData);
      } catch (err) {
        showToast('Үйлчилгээ авахад алдаа гарлаа', 'error');
      }
    }
    fetchmanufacturer();
    fetchcar();
  }, []);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (msg, type) => setToast({ msg, type });

  const validate = () => {
    if (!manufacturer) return showToast("Үйлдвэрлэгчээ сонгоно уу!", "error");
    if (!brand) return showToast("Маркаа сонгоно уу!", "error");
    if (!year || isNaN(Number(year)) || year.length !== 4)
      return showToast("Үйлдвэрлэсэн оноо зөв оруулна уу!", "error");
    if (plateDigits.some((d) => !d) || plateLetters.some((l) => !l))
      return showToast("Дугаараа бүрэн оруулна уу!", "error");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem('userId');
      const plate = plateDigits.join("") + plateLetters.join("");
      console.log(token, userId, manufacturer, brand, year, plate);
      const car = await addedcar({ token, userId, manufacturer: manufacturer, brand, year, plate });

      showToast(car.message, "success");
    } catch (err) {
      console.error("амжилтгүй addcar!", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className={styles.container}>
        <div className={styles.topbar}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            &#8592;
          </button>
          <span className={styles.title}>Машин нэмэх</span>
          <span className={styles.spacer}></span>
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.warning}>
            <span>❗</span> Та автомашины дугаар болон серийн үсгийг үнэн зөв
            оруулна уу.
          </div>
          <Dropdown
            label="Үйлдвэрлэгч"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            options={manufacturers.map((m) => ({ id: m.id, name: m.name }))}
          />
          <Dropdown
            label="Марк"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            options={brands.map((b) => ({ id: b.id, name: b.name }))}
          />
          <label className={styles.label}>Үйлдвэрлэсэн он</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
            placeholder="Үйлдвэрлэсэн он"
            maxLength={4}
            className={styles.input}
          />
          <label className={styles.label}>Дугаар</label>
          <PlateInputGroup
            digits={4}
            letters={3}
            plateDigits={plateDigits}
            plateLetters={plateLetters}
            setPlateDigits={setPlateDigits}
            setPlateLetters={setPlateLetters}
          />

          <button className={styles.submitBtn} type="submit">
            Баталгаажуулах
          </button>
        </form>
      </div>
    </div>
  );
}
