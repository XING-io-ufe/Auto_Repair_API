"use client";
import { useEffect, useState } from "react";
import styles from "./booking.module.css";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import DayButton from "@/components/DayButton";
import Toast from "@/components/Toast";
import { getbranch } from "@/api/branch";
import { getservice } from "@/api/service";
import axios from "axios";

export default function BookingPage() {


  const router = useRouter();
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [carId, setCarId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [times, setTimes] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const branchData = await getbranch();
        setBranches(branchData);
      } catch (err) {
        showToast('Салбаруудыг авахад алдаа гарлаа', 'error');
      }
    }
    const fetchservice = async () => {
      try {
        const serviceData = await getservice();
        setServices(serviceData);
      } catch (err) {
        showToast('Үйлчилгээ авахад алдаа гарлаа', 'error');
      }
    }
    fetchBranch();
    fetchservice();
  }, []);

  useEffect(() => {
    if (selectedDay) {
      setTimes(["09:00", "10:00", "11:00", "12:30", "14:00", "15:30"]);
    } else {
      setTimes([]);
    }
  }, [selectedDay]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2400);
      return () => clearTimeout(t);
    }
  }, [toast]);

  function showToast(msg, type) {
    setToast({ msg, type });
    return false;
  }

  const validate = () => {
    if (!serviceId) return showToast("Үйлчилгээгээ сонгоно уу!", "error");
    if (!branchId) return showToast("Салбараа сонгоно уу!", "error");
    if (!selectedDay) return showToast("Өдрөө сонгоно уу!", "error");
    if (!selectedTime) return showToast("Цагаа сонгоно уу!", "error");
    return true;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const carId = localStorage.getItem('carId');  // эсвэл state-аас авах

      const res = await axios.post('http://localhost:3001/user/booking', {
        serviceId,
        branchId,
        userId,
        carId,
        selectedDay,
        selectedTime,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      // Хүсвэл энд router-рээ шилжүүлэх гэх мэт

    } catch (err) {
      alert(err.response?.data?.message || 'Алдаа гарлаа');
    }
  };

  const days = [
    { label: "Өнөөдөр", value: "today" },
    { label: "Маргааш", value: "tomorrow" },
    { label: "Нөгөөдөр", value: "nextday" },
    { label: "Өөр өдөр сонгох", value: "other" },
  ];
  const cars = [
    { id: "1", name: "Toyota Camry" },
    { id: "2", name: "Honda Civic" },
    { id: "3", name: "BMW X5" },
  ];

  const goBack = () => router.back();

  return (
    <div className={styles.bookingWrapper}>
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className={styles.bookingCard}>
        <div className={styles.topbar}>
          <button
            className={styles.backBtn}
            type="button"
            onClick={goBack}
            title="Буцах"
          >
            &#8592;
          </button>
          <span className={styles.title}>Үйлчилгээний цаг захиалах</span>
          <span className={styles.spacer}></span>
        </div>

        <form
          className={styles.bookingForm}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className={styles.bonusInfo}>
            <span>⚠️</span> Таны цаг захиалга үүсгэгдсэн бүртгэл дээр бонус оноо
            бодогдож орохыг анхаарна уу?.
          </div>
          <Dropdown
            label="Үйлчилгээ"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            options={services.map((s) => ({ id: s.id, name: s.name }))}
          />
          <Dropdown
            label="Машин"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            options={cars.map(car => ({ id: car.id, name: car.name }))}
          />
          <Dropdown
            label="Боломжит салбар"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            options={branches.map((b) => ({ id: b.id, name: b.name }))}
            setBranchId
          />
          <label>Өдөр</label>
          <DayButton
            days={days}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />

          <Dropdown
            label="Цаг"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            options={times.map((t) => ({ value: t, label: t }))}
            disabled={!selectedDay}
          />

          <button className={styles.submitBtn} type="submit">
            Баталгаажуулах
          </button>
        </form>
      </div>
    </div>
  );
}
