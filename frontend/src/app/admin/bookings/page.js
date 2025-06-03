"use client";
import { useEffect, useState } from "react";
import styles from "./bookingList.module.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Таны API-н үндсэн URL-ыг тохируулна уу!
  const API_BASE = "http://localhost:3001";

  // Хуудаслалтаар захиалгуудыг татах
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(
          `${API_BASE}/api/bookings?page=${page}&limit=12` // энэ бол Жишээ: ?page=1&limit=10
        );
        const data = await res.json();
        setBookings(data.items || []); // Таны backend бүтэц
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setBookings([]);
      }
    }
    fetchBookings();
  }, [page]);

  // Засах, Устгах
  const handleEdit = (id) => {
    // TODO: route эсвэл modal-руу хөтлөх
    alert(`Засах: ${id}`);
  };
  const handleDelete = async (id) => {
    // TODO: confirm dialog & API дуудлага
    if (window.confirm("Устгах уу?")) {
      // await fetch(`${API_BASE}/api/bookings/${id}`, { method: "DELETE" });
      setBookings(bookings.filter((b) => b.id !== id));
    }
  };

  // Хуудас солих
  const prevPage = () => page > 1 && setPage(page - 1);
  const nextPage = () => page < totalPages && setPage(page + 1);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/login.png" className={styles.logo} alt="GoService" />
          <span className={styles.title}>Цаг захиалгууд харах</span>
          <div className={styles.pagingIcons}>
            <button className={styles.iconBtn}>
              <ChevronLeft size={20} />
            </button>
            <button className={styles.iconBtn}>
              <ChevronRight size={20} />
            </button>
            <span className={styles.pageNum}>{page}</span>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Нэр</th>
              <th>Огноо</th>
              <th>Захиалсан цаг</th>
              <th>Цаг засах</th>
              <th>Устгах</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#999" }}>
                  Одоогоор цаг захиалга байхгүй байна.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.name || "Name"}</td>
                  <td>{b.date || "--"}</td>
                  <td>{b.time || "--"}</td>
                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleEdit(b.id)}
                    >
                      Засах
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(b.id)}
                    >
                      Устгах
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
