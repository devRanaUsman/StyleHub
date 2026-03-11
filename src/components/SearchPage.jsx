import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import itemService from "../services/itemService";
import { useDispatch } from "react-redux";
import { BagActions } from "../store/BagSlice";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        if (q.trim()) {
          const data = await itemService.getSection1(undefined, undefined, q.trim());
          setItems(data || []);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [q]);

  const handleAddToBag = (e, item) => {
    e.preventDefault();
    dispatch(BagActions.addTobag({ ...item, id: item._id }));
  };

  return (
    <div className="search-page-container">
      <div className="search-page-header">
        <h1 className="search-title">Search Results</h1>
        <p className="search-subtitle">
          {q ? `Showing results for "${q}"` : "Enter a search term to find products"}
        </p>
      </div>

      {isLoading ? (
        <div className="search-loading">
          <div className="search-spinner"></div>
        </div>
      ) : items.length > 0 ? (
        <div className="search-results-grid">
          {items.map((item) => {
            const priceObj = item.price?.[0] || {};
            const discount = priceObj.discount || 0;
            const hasDiscount = discount > 0;

            return (
              <Link to={`/items/${item._id}`} key={item._id} className="search-item-card">
                <div className="search-item-image-wrapper">
                  <img
                    src={item.imageUrl || item.ImageUrl}
                    alt={item.name}
                    className="search-item-image"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300";
                    }}
                  />
                  {item.isFeatured && (
                    <span className="search-item-badge">Featured</span>
                  )}
                  {hasDiscount && (
                    <span className="search-item-discount">-{discount}%</span>
                  )}
                </div>
                <div className="search-item-details">
                  {item.brand && <div className="search-item-brand">{item.brand}</div>}
                  <h3 className="search-item-name">{item.name}</h3>
                  <div className="search-item-rating">
                    <FiStar className="search-star-icon" />
                    <span>{item.rating?.average || 0} ({item.rating?.count || 0})</span>
                  </div>
                  <div className="search-item-footer">
                    <div className="search-item-price-col">
                      <span className="search-item-price">Rs. {priceObj.price || 0}</span>
                      {hasDiscount && (
                        <span className="search-item-original-price">
                          Rs. {priceObj.original}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToBag(e, item)}
                      className="search-btn-add"
                      title="Add to Cart"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="search-no-results">
          <div className="search-no-results-icon">🔍</div>
          <h2>No items found</h2>
          <p>We couldn't find anything matching "{q}". Try adjusting your search term.</p>
          <Link to="/" className="search-btn-home">
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
