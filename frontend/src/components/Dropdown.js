import styles from "@/styles/dropdown.module.css";
export default function Dropdown({
  label,
  value,
  onChange,
  options,
  disabled,
}) {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={styles.select}
      >
        <option value="">Сонгоно уу</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label ?? opt.name}
          </option>
        ))}
      </select>
    </>
  );
}
