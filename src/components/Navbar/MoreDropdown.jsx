import { Link } from "react-router-dom";

export default function MoreDropdown({ isOpen, onClose, categories, activeCategory, onCategorySelect }) {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        border: "1px solid #eee",
        zIndex: 9999,
        minWidth: "220px",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/section/${cat.id}`}
          onClick={() => {
            onCategorySelect(cat.id);
            onClose();
          }}
          style={{
            display: "block",
            textDecoration: "none",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: activeCategory === cat.id ? 700 : 400,
            color: activeCategory === cat.id ? "#111" : "#444",
            backgroundColor: "transparent",
            transition: "background-color 0.1s ease",
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f5f5f5"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
