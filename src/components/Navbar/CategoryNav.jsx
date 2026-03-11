import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { IoChevronDownOutline } from "react-icons/io5";

const MAIN_CATEGORIES = [
  { id: "home", label: "Home", path: "/" },
  { id: "Casual", label: "Casual", path: "/section/Casual" },
  { id: "ACCESSORIES", label: "Accessories", path: "/section/ACCESSORIES" },
  { id: "FORMAL", label: "Formal", path: "/section/FORMAL" },
  { id: "Sports", label: "Sports", path: "/section/Sports" },
  { id: "Premium", label: "Premium", path: "/section/Premium" },
];

const MORE_CATEGORIES = [
  { id: "Streetwear", label: "Streetwear" },
  { id: "Activewear", label: "Activewear" },
  { id: "ACCESSORIES", label: "Accessories" },
  { id: "Footwear", label: "Footwear" },
  { id: "Outerwear", label: "Outerwear" },
  { id: "Traditional", label: "Traditional & Cultural" },
  { id: "Swimwear", label: "Swimwear" },
  { id: "Lingerie", label: "Lingerie & Loungewear" },
  { id: "PlusSize", label: "Plus Size" },
  { id: "Kids", label: "Kids & Youth" },
];

export default function CategoryNav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/" || path === "/home") {
      setActiveTab("home");
    } else if (path.includes("/section/")) {
      const section = path.split("/").pop();
      setActiveTab(section);
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{ backgroundColor: "#fff", borderBottom: "1px solid #e5e7eb", display: "none" }}
      className="category-nav-bar"
    >
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        // Use same left padding as TopBar (24px) so links start at same x-position as the logo
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "28px",
        height: "42px",
      }}>
        {MAIN_CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.id;
          return (
            <NavLink
              key={cat.id}
              to={cat.path}
              onClick={() => setActiveTab(cat.id)}
              style={{
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: cat.isAccent || isActive ? 700 : 500,
                color: cat.isAccent ? "#e53e3e" : isActive ? "#5355e9" : "#555",
                whiteSpace: "nowrap",
                padding: "4px 2px",
                borderBottom: isActive && !cat.isAccent ? "2px solid #5355e9" : "2px solid transparent",
                transition: "color 0.15s ease, border-color 0.15s ease",
                display: "inline-block",
              }}
              onMouseEnter={e => {
                if (!cat.isAccent) e.currentTarget.style.color = "#5355e9";
              }}
              onMouseLeave={e => {
                if (!cat.isAccent) e.currentTarget.style.color = isActive ? "#5355e9" : "#555";
              }}
            >
              {cat.label}
            </NavLink>
          );
        })}

        {/* More Dropdown — paddingBottom bridges gap so mouse doesn't leave */}
        <div
          ref={dropdownRef}
          style={{ position: "relative", paddingBottom: isMoreOpen ? "8px" : "0" }}
          onMouseEnter={() => setIsMoreOpen(true)}
          onMouseLeave={() => setIsMoreOpen(false)}
        >
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: isMoreOpen ? "#5355e9" : "#555",
              padding: "4px 2px",
              fontFamily: "inherit",
              transition: "color 0.15s ease",
            }}
          >
            More
            <IoChevronDownOutline
              style={{
                fontSize: "14px",
                transition: "transform 0.25s ease",
                transform: isMoreOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {isMoreOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                border: "1px solid #eee",
                zIndex: 9999,
                minWidth: "220px",
                paddingTop: "8px",
                paddingBottom: "8px",
                animation: "fadeSlideDown 0.15s ease",
              }}
            >
              {MORE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/section/${cat.id}`}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setIsMoreOpen(false);
                  }}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: activeTab === cat.id ? 700 : 400,
                    color: activeTab === cat.id ? "#5355e9" : "#444",
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
          )}
        </div>
      </div>

      <style>{`
        .category-nav-bar { display: block !important; }
        @media (max-width: 768px) {
          .category-nav-bar { display: none !important; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
