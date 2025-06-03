export default function Toast({ msg, type = "error", onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 44,
        right: 25,
        background: type === "success" ? "#1bb36d" : "#f23",
        color: "#fff",
        padding: "13px 28px",
        borderRadius: 10,
        fontWeight: 600,
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      {msg}
    </div>
  );
}
