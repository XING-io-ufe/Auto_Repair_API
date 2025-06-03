"use client";
import { useState } from "react";
import styles from "./servicesList.module.css";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Хөдөлгүүрийн тос шүүр солих",
      price: "50000",
      description: "Бүх төрлийн хөдөлгүүр",
    },
    {
      id: 2,
      name: "Дугуй солих",
      price: "80000",
      description: "4 ширхэг дугуй",
    },
    {
      id: 3,
      name: "Тэнхлэг тохиргоо",
      price: "40000",
      description: "Бүх төрлийн авто машин",
    },
    {
      id: 4,
      name: "Улсын үзлэг",
      price: "50000",
      description: "Бүх төрлийн авто машин",
    },
    {
      id: 5,
      name: "Түлшний эд ангийн оношилгоо",
      price: "60000",
      description: "Бүх төрлийн авто машин",
    },
    {
      id: 6,
      name: "Автомат кропны шингэн солих",
      price: "30000",
      description: "Бүх төрлийн авто машин",
    },
  ]);
  const [page] = useState(1);

  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editingRow, setEditingRow] = useState({
    name: "",
    price: "",
    description: "",
  });

  // Нэмэх
  const handleAddRow = () => {
    if (!newRow.name || !newRow.price || !newRow.description) return;
    setServices((svcs) => [...svcs, { id: Date.now(), ...newRow }]);
    setNewRow({ name: "", price: "", description: "" });
    setAdding(false);
  };

  // Засах
  const handleEdit = (svc) => {
    setEditingId(svc.id);
    setEditingRow({
      name: svc.name,
      price: svc.price,
      description: svc.description,
    });
  };
  const handleSaveEdit = (id) => {
    setServices((svcs) =>
      svcs.map((s) => (s.id === id ? { ...s, ...editingRow } : s))
    );
    setEditingId(null);
  };
  // Устгах
  const handleDelete = (id) => {
    setServices((svcs) => svcs.filter((s) => s.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <img src="/login.png" alt="GoService" className={styles.logo} />
        <span className={styles.headerTitle}>Үйлчилгээ оруулах</span>
        <div className={styles.arrowGroup}>
          <button className={styles.iconBtn}>
            <ChevronLeft size={20} />
          </button>
          <button className={styles.iconBtn}>
            <ChevronRight size={20} />
          </button>
          <span className={styles.pageNum}>{page}</span>
        </div>
        <button
          className={styles.plusBtn}
          title="Нэмэх"
          onClick={() => setAdding(true)}
        >
          <Plus size={26} />
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.serviceTable}>
          <thead>
            <tr>
              <th>Нэр</th>
              <th>Үнэ</th>
              <th>Тайлбар</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {adding && (
              <tr className={styles.editRow}>
                <td>
                  <input
                    value={newRow.name}
                    className={styles.tableInput}
                    onChange={(e) =>
                      setNewRow((r) => ({ ...r, name: e.target.value }))
                    }
                    placeholder="Нэр"
                    autoFocus
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newRow.price}
                    className={styles.tableInput}
                    onChange={(e) =>
                      setNewRow((r) => ({ ...r, price: e.target.value }))
                    }
                    placeholder="Үнэ"
                  />
                </td>
                <td>
                  <input
                    value={newRow.description}
                    className={styles.tableInput}
                    onChange={(e) =>
                      setNewRow((r) => ({ ...r, description: e.target.value }))
                    }
                    placeholder="Тайлбар"
                  />
                </td>
                <td colSpan={2} className={styles.addActions}>
                  <button
                    className={styles.saveBtn}
                    onClick={handleAddRow}
                    type="button"
                  >
                    Хадгалах
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setAdding(false)}
                    type="button"
                  >
                    Болих
                  </button>
                </td>
              </tr>
            )}
            {services.map((svc) =>
              editingId === svc.id ? (
                <tr key={svc.id} className={styles.editRow}>
                  <td>
                    <input
                      value={editingRow.name}
                      className={styles.tableInput}
                      onChange={(e) =>
                        setEditingRow((r) => ({ ...r, name: e.target.value }))
                      }
                      autoFocus
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editingRow.price}
                      className={styles.tableInput}
                      onChange={(e) =>
                        setEditingRow((r) => ({ ...r, price: e.target.value }))
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingRow.description}
                      className={styles.tableInput}
                      onChange={(e) =>
                        setEditingRow((r) => ({
                          ...r,
                          description: e.target.value,
                        }))
                      }
                    />
                  </td>
                  <td colSpan={2} className={styles.addActions}>
                    <button
                      className={styles.saveBtn}
                      onClick={() => handleSaveEdit(svc.id)}
                      type="button"
                    >
                      Хадгалах
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setEditingId(null)}
                      type="button"
                    >
                      Болих
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={svc.id}>
                  <td>{svc.name}</td>
                  <td>
                    <b>{svc.price}</b>
                  </td>
                  <td>{svc.description}</td>
                  <td>
                    <button
                      className={styles.iconBtn}
                      onClick={() => handleEdit(svc)}
                      title="Засах"
                    >
                      <Pencil size={18} />
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.iconBtn}
                      onClick={() => handleDelete(svc.id)}
                      title="Устгах"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
