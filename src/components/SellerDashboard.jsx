import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiStar,
  FiPackage,
  FiX,
  FiCheck,
  FiSearch,
} from "react-icons/fi";
import itemService from "../services/itemService";
import "./SellerDashboard.css";

// Helper hook for debouncing values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SellerDashboard() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Toast state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await itemService.getSellerItems();
      setItems(data?.items || data || []);
    } catch (err) {
      showToast("Failed to fetch products", "error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await itemService.deleteItemById(id);
        fetchItems();
        showToast("Product deleted successfully");
      } catch (err) {
        showToast("Failed to delete product", "error");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/seller/edit-item/${id}`);
  };

  const totalProducts = items.length;
  const featuredProducts = items.filter((item) => item.isFeatured).length;
  const uniqueCategories = new Set(items.map((item) => item.category)).size;

  return (
    <div className="seller-dashboard-container">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type === "error" ? "error" : "success"}`}
          >
            <FiCheck className="w-4 h-4" /> {toast.message}
          </div>
        ))}
      </div>

      <div className="dashboard-main-card">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="dashboard-title-box">
            <h1 className="dashboard-title">Seller Dashboard</h1>
            <p className="dashboard-subtitle">Manage your listed products</p>
          </div>
          <button
            onClick={() => navigate("/add-item")}
            className="btn-add-product"
          >
            <FiPlus className="w-4 h-4" />
            Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by product name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="btn-clear-search"
                aria-label="Clear search"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon-row">
              <div className="summary-icon-box indigo">
                <FiPackage className="w-5 h-5" />
              </div>
              <p className="summary-label">Total Products</p>
            </div>
            <h3 className="summary-value">{totalProducts}</h3>
          </div>
          <div className="summary-card">
            <div className="summary-icon-row">
              <div className="summary-icon-box yellow">
                <FiStar className="w-5 h-5" />
              </div>
              <p className="summary-label">Featured Products</p>
            </div>
            <h3 className="summary-value">{featuredProducts}</h3>
          </div>
          <div className="summary-card">
            <div className="summary-icon-row">
              <div className="summary-icon-box green">
                <FiPackage className="w-5 h-5" />
              </div>
              <p className="summary-label">Categories</p>
            </div>
            <h3 className="summary-value">{uniqueCategories}</h3>
          </div>
        </div>

        {/* Product List Section */}
        <div className="product-list-container">
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-box">
                <FiPackage className="w-6 h-6" />
              </div>
              <h3 className="empty-title">No products found</h3>
              <p className="empty-subtitle">
                You haven't added any products to your catalog yet.
              </p>
              <button
                onClick={() => navigate("/add-item")}
                className="btn-empty-add"
              >
                Add your first product
              </button>
            </div>
          ) : (
            <div className="table-wrapper">
              <div className="table-min-width">
                {/* Table Header Row */}
                <div className="table-header-row">
                  <div className="col-4">Product</div>
                  <div className="col-2">Category</div>
                  <div className="col-2">Section</div>
                  <div className="col-1">Rating</div>
                  <div className="col-1">Price</div>
                  <div className="col-actions">Actions</div>
                </div>

                {/* Table Body Rows */}
                <div className="table-body">
                  {items
                    .filter((item) => {
                      if (!debouncedSearchTerm) return true;
                      const term = debouncedSearchTerm.toLowerCase();
                      return (
                        item.name?.toLowerCase().includes(term) ||
                        item.brand?.toLowerCase().includes(term)
                      );
                    })
                    .map((item) => {
                      const itemPrice = item.price?.[0]?.price || 0;
                      return (
                        <div key={item._id} className="table-row">
                          {/* Sub-column: Image & Basic Info */}
                          <div className="product-info-cell">
                            <div className="product-image-box">
                              <img
                                src={item.ImageUrl || item.imageUrl}
                                alt={item.name}
                                className="product-image"
                              />
                            </div>
                            <div className="product-details">
                              <Link
                                to={`/item/${item._id}`}
                                className="product-name"
                              >
                                {item.name}
                              </Link>
                              <div className="product-badges">
                                {item.brand && (
                                  <span className="product-brand">
                                    {item.brand}
                                  </span>
                                )}
                                {item.isFeatured && (
                                  <span className="badge-featured">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-2">
                            <span className="cell-text">{item.category}</span>
                          </div>
                          <div className="col-2">
                            <span className="cell-text">{item.section}</span>
                          </div>

                          <div className="col-rating-flex">
                            <FiStar className="fill-current w-3.5 h-3.5" />
                            <span className="rating-value">
                              {item.rating?.average || "0.0"}
                            </span>
                          </div>

                          <div className="col-1">
                            <span className="price-text">${itemPrice}</span>
                          </div>

                          <div className="col-actions">
                            <button
                              onClick={() => handleEdit(item._id)}
                              className="btn-action btn-edit"
                            >
                              <FiEdit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item._id, item.name)}
                              className="btn-action btn-delete"
                            >
                              <FiTrash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
