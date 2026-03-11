import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import itemService from "../services/itemService";
import { FiStar, FiMinus, FiPlus, FiShoppingBag, FiCreditCard } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { BagActions } from "../store/BagSlice";
import "./ItemDetail.css";

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    itemService
      .getItemById(_id)
      .then((data) => {
        setItem(data);
        const itemSize = data.size || data.Size;
        if (itemSize) {
          const sizes = itemSize.split(",").map((s) => s.trim());
          if (sizes.length > 0) setSelectedSize(sizes[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading item:", error);
        setIsLoading(false);
      });
  }, [_id]);

  const handleAddToBag = () => {
    // Add item to the Redux store cart for the selected quantity
    for (let i = 0; i < quantity; i++) {
      dispatch(BagActions.addTobag({ ...item, id: item._id, size: selectedSize }));
    }
  };

  const handleBuyNow = () => {
    // Navigate to /buy and pass selected item plus quantity
    navigate("/buy", { state: { item, quantity, size: selectedSize } });
  };

  if (isLoading) {
    return (
      <div className="item-loading-container">
        <div className="item-loading-spinner"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="item-not-found-container">
        <div className="item-not-found-text">
          <h2 className="item-not-found-title">Item Not Found</h2>
          <button onClick={() => navigate("/")} className="item-not-found-btn">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const priceObj = item.price?.[0] || {};
  const { original = 0, price = 0, discount = 0 } = priceObj;
  const isDiscounted = original > price && discount > 0;

  const itemSizeStr = item.size || item.Size;
  const sizes = itemSizeStr ? itemSizeStr.split(",").map((s) => s.trim()) : [];

  return (
    <div className="item-detail-page">
      <div className="item-detail-card">
        <div className="item-detail-grid">
          
          {/* Left Column: Image */}
          <div className="item-image-col">
            {item.isFeatured && (
              <span className="item-badge-featured">
                Featured
              </span>
            )}
            <div className="item-image-box">
              <img
                src={item.imageUrl || item.ImageUrl}
                alt={item.name}
                className="item-image"
              />
            </div>
          </div>

          {/* Right Column: Content layout strictly follows schema */}
          <div className="item-info-col">
            
            {/* Header / Meta */}
            <div>
              {item.brand && (
                <div className="item-brand-container">
                  <span className="item-brand-badge">
                    {item.brand}
                  </span>
                </div>
              )}
              <h1 className="item-title">
                {item.name}
              </h1>
              <div className="item-category-row">
                {item.category && <span>{item.category}</span>}
                {item.category && item.section && <span className="item-dot-separator">•</span>}
                {item.section && <span>{item.section}</span>}
              </div>
            </div>

            {/* Rating */}
            {(item.rating?.count > 0 || item.rating?.average > 0) && (
              <div className="item-rating-row">
                <div className="item-rating-stars">
                  <FiStar className="fill-current w-3.5 h-3.5" />
                  <span className="item-rating-avg">{item.rating.average}</span>
                </div>
                <span className="item-rating-count">({item.rating.count} reviews)</span>
              </div>
            )}

            {/* Pricing Card */}
            <div className="item-price-card">
              <div className="item-price-row">
                <span className="item-price-current">Rs. {price}</span>
                {isDiscounted && (
                  <>
                    <span className="item-price-original">Rs. {original}</span>
                    <span className="item-price-discount">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size block */}
            {sizes.length > 0 && (
              <div>
                <h3 className="item-section-label">Size</h3>
                <div className="item-sizes-wrapper">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`item-btn-size ${selectedSize === size ? "active" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity block */}
            <div>
              <h3 className="item-section-label">Quantity</h3>
              <div className="item-quantity-wrapper">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="item-btn-qty left"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="item-qty-value">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="item-btn-qty right"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="item-actions-wrapper">
              <button
                onClick={handleAddToBag}
                className="item-btn-action item-btn-add"
              >
                <FiShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="item-btn-action item-btn-buy"
              >
                <FiCreditCard className="w-4 h-4" />
                <span>Buy Now</span>
              </button>
            </div>

            {/* Clean muted description text block */}
            {item.description && (
              <div className="item-desc-wrapper">
                <p className="item-desc-text">
                  {item.description}
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
