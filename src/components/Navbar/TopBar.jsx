import { useState, useEffect, useRef } from "react";
import { IoBagOutline, IoPersonOutline, IoMenuOutline, IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import itemService from "../../services/itemService";

export default function TopBar({ bagitemsCount, isAuthenticated, user, handleLogout, onMenuClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authHover, setAuthHover] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Close suggestions if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear search state on navigation away
  useEffect(() => {
    setShowSuggestions(false);
  }, [location.pathname]);

  // Debounced search effect
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await itemService.getSection1(undefined, undefined, searchQuery.trim());
        setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (item) => {
    setShowSuggestions(false);
    navigate(`/items/${item._id}`);
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#fff", borderBottom: "1px solid #eee" }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "68px",
        height: "auto",
        gap: "10px",
      }}>

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="mobile-menu-btn"
          aria-label="Open menu"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#5355e9",
            padding: "4px",
            flexShrink: 0,
          }}
        >
          <IoMenuOutline />
        </button>

        {/* Logo */}
        <Link to="/" style={{
          textDecoration: "none",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          lineHeight: 1.1,
        }}>
          <span style={{ fontSize: "22px", fontWeight: "900", color: "#5355e9", letterSpacing: "-0.5px" }}>StyleHub</span>
          <span style={{ fontSize: "8px", fontWeight: "700", color: "#6366f1", textTransform: "uppercase", letterSpacing: "1px" }}>FASHION FORWARD</span>
        </Link>

        {/* Search Bar */}
        <div className="desktop-search" ref={searchRef} style={{ flex: 1, maxWidth: "580px", margin: "0 10px", position: "relative" }}>
          <form onSubmit={handleSearch} style={{
            display: "flex",
            alignItems: "center",
            border: "2px solid #5355e9",
            borderRadius: "999px",
            overflow: "hidden",
            backgroundColor: "#fff",
            height: "44px",
            position: "relative",
            zIndex: 100
          }}>
            <input
              type="text"
              placeholder="Search styles, brands, trends..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                padding: "0 20px",
                fontSize: "14px",
                color: "#333",
                fontFamily: "inherit",
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(""); setSuggestions([]); setShowSuggestions(false); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  padding: "0 10px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <IoCloseOutline size={20} />
              </button>
            )}
            <button
              type="submit"
              disabled={!searchQuery.trim()}
              style={{
                width: "50px",
                height: "45px",
                backgroundColor: "#5355e9",
                border: "none",
                borderRadius: "1020px",
                cursor: searchQuery.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px",
                flexShrink: 0,
                opacity: searchQuery.trim() ? 1 : 0.8
              }}
            >
              <IoSearchOutline style={{ fontSize: "20px", color: "#fff" }} />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim().length > 0 && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: "10px",
              right: "10px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              border: "1px solid #eee",
              zIndex: 99,
              overflow: "hidden"
            }}>
              {isSearching ? (
                <div style={{ padding: "16px", textAlign: "center", color: "#666", fontSize: "14px" }}>
                  Searching...
                </div>
              ) : suggestions.length > 0 ? (
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {suggestions.map((item) => (
                    <li key={item._id}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(item)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "12px 16px",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid #f5f5f5",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9f9fa"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <div style={{ 
                          width: "40px", height: "40px", borderRadius: "6px", 
                          overflow: "hidden", flexShrink: 0, backgroundColor: "#f5f5f5" 
                        }}>
                          <img 
                            src={item.imageUrl || item.ImageUrl} 
                            alt={item.name} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "14px", fontWeight: 600, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: "12px", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                            {item.brand && <span style={{ fontWeight: 600, color: "#5355e9" }}>{item.brand}</span>}
                            <span>•</span>
                            <span>Rs. {item.price?.[0]?.price || 0}</span>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={handleSearch}
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "#f9f9fa",
                        border: "none",
                        color: "#5355e9",
                        fontWeight: 600,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "6px"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f5"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9f9fa"}
                    >
                      View all results for "{searchQuery}" <IoSearchOutline />
                    </button>
                  </li>
                </ul>
              ) : (
                <div style={{ padding: "16px", textAlign: "center", color: "#666", fontSize: "14px" }}>
                  No items match "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Seller + Auth + Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
          
          {/* Seller Dashboard Link (Only visible to sellers) */}
          {isAuthenticated && user?.role === "seller" && (
            <Link to="/seller/dashboard" style={{
              textDecoration: "none",
              color: "#5355e9",
              fontSize: "14px",
              fontWeight: 700,
              padding: "6px 12px",
              backgroundColor: "#f5f3ff",
              borderRadius: "999px",
              transition: "background-color 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#ede9fe"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#f5f3ff"}
            >
              Seller
            </Link>
          )}

          {/* Auth Block - uses paddingBottom on wrapper to bridge the gap to the dropdown */}
          <div
            style={{ position: "relative", paddingBottom: authHover ? "8px" : "0" }}
            onMouseEnter={() => setAuthHover(true)}
            onMouseLeave={() => setAuthHover(false)}
          >
            {/* Trigger */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "4px",
            }}>
              <IoPersonOutline style={{ fontSize: "28px", color: "#5355e9" }} />
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
                <span style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>Welcome</span>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#5355e9" }}>
                  {isAuthenticated ? (user?.name || "Account") : "Sign In / Register"}
                </span>
              </div>
            </div>

            {/* Dropdown - positioned so it's inside the hover zone */}
            {authHover && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                border: "1px solid #eee",
                zIndex: 9999,
                minWidth: "220px",
                padding: "16px",
              }}>
                {!isAuthenticated ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <button
                      onClick={() => { navigate("/auth"); setAuthHover(false); }}
                      style={{
                        width: "100%",
                        backgroundColor: "#5355e9",
                        color: "#fff",
                        border: "none",
                        borderRadius: "999px",
                        padding: "12px",
                        fontSize: "15px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#4338ca"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "#5355e9"}
                    >
                      Sign In
                    </button>
                    <div style={{ textAlign: "center", fontSize: "13px", color: "#666" }}>
                      New Customer?{" "}
                      <span
                        onClick={() => { navigate("/auth?mode=signup"); setAuthHover(false); }}
                        style={{ fontWeight: 700, color: "#5355e9", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Register
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {user?.role === "seller" && (
                      <button
                        onClick={() => { navigate("/add-item"); setAuthHover(false); }}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          textAlign: "left",
                          padding: "10px 12px",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#333",
                          cursor: "pointer",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <MdAddCircleOutline fontSize={18} /> Add Item
                      </button>
                    )}
                    <button
                      onClick={() => { handleLogout(); setAuthHover(false); }}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        padding: "10px 12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#dc2626",
                        cursor: "pointer",
                        borderRadius: "8px",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#fef2f2"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/bag" style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
            gap: "2px",
          }}>
            <div style={{ position: "relative" }}>
              <IoBagOutline style={{ fontSize: "30px", color: "#5355e9" }} />
              <span style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                backgroundColor: "#5355e9",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 700,
                borderRadius: "10px",
                minWidth: "18px",
                padding: "1px 4px",
                textAlign: "center",
                border: "2px solid #fff",
                lineHeight: "14px",
              }}>
                {bagitemsCount}
              </span>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#5355e9" }}>Cart</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mobile-search" style={{ padding: "0 16px 12px" }}>
        <form onSubmit={handleSearch} style={{
          display: "flex",
          alignItems: "center",
          border: "2px solid #5355e9",
          borderRadius: "999px",
          overflow: "hidden",
          backgroundColor: "#fff",
          height: "40px",
        }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 16px", fontSize: "14px", fontFamily: "inherit" }}
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", padding: "0 8px", color: "#999" }}>
              <IoCloseOutline size={18} />
            </button>
          )}
          <button type="submit" disabled={!searchQuery.trim()} style={{
            width: "44px", height: "36px", backgroundColor: "#5355e9", border: "none",
            borderRadius: "999px", cursor: searchQuery.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", margin: "2px",
            opacity: searchQuery.trim() ? 1 : 0.8
          }}>
            <IoSearchOutline style={{ fontSize: "18px", color: "#fff" }} />
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; margin-right: -5px; }
          .mobile-search { display: block !important; }
          .desktop-search { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-search { display: none !important; }
        }
      `}</style>
    </div>
  );
}
