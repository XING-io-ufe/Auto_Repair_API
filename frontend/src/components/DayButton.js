import styles from "@/styles/dayButton.module.css";
export default function DayButton({ days, selectedDay, setSelectedDay }) {
  return (
    <div className={styles.dayButtons}>
      {days.map((d) => (
        <button
          type="button"
          key={d.value}
          className={`${styles.dayBtn}  ${
            selectedDay === d.value ? "selected" : ""
          }`}
          onClick={() => setSelectedDay(d.value)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}
