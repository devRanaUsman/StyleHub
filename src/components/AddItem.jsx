import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdCloudUpload, MdImage } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import itemService from "../services/itemService";

const AddItem = () => { 
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discount: "0",
    category: "Casual",
    section: "Casual",
    brand: "",
    image: "",
    sizes: [],
    isFeatured: false,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [success, setSuccess] = useState(false);

  const categories = ["Casual", "FORMAL", "Sports", "ACCESSORIES", "LIFESTYLE"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (isEditing) {
      const fetchItem = async () => {
        try {
          const item = await itemService.getItemById(id);
          const priceData = item.price?.[0] || {};
          let parsedSizes = [];
          if (item.Size && typeof item.Size === "string") {
            parsedSizes = item.Size.split(',').map(s => s.trim());
          }
          
          setFormData({
            title: item.name || "",
            description: item.description || "",
            originalPrice: priceData.original || "",
            discount: priceData.discount || "0",
            category: item.category || "Casual",
            section: item.section || "Casual",
            brand: item.brand || "",
            image: item.ImageUrl || item.imageUrl || "",
            sizes: parsedSizes,
            isFeatured: item.isFeatured || false,
          });
          setImagePreview(item.ImageUrl || item.imageUrl || "");
        } catch (error) {
          console.error("Failed to fetch item for editing:", error);
          alert("Failed to fetch product details.");
        } finally {
          setIsFetching(false);
        }
      };
      fetchItem();
    }
  }, [id, isEditing]);

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we'll use a placeholder image URL
      // In production, you'd upload to cloud storage (Cloudinary, AWS S3, etc.)
      const imageUrl = `/images/${Math.floor(Math.random() * 8) + 1}.jpg`;
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please sign in to add items");
      return;
    }

    setIsLoading(true);
    try {
      const original = parseFloat(formData.originalPrice);
      const discount = parseFloat(formData.discount) || 0;
      
      const payload = {
        name: formData.title,
        brand: formData.brand,
        category: formData.category,
        section: formData.section,
        size: formData.sizes.join(", ") || "One Size",
        description: formData.description,
        imageUrl: formData.image,
        isFeatured: formData.isFeatured,
        price: [{
          original,
          discount,
          price: original - discount
        }]
      };

      if (isEditing) {
         await itemService.updateItemById(id, payload);
         setSuccess(true);
         setTimeout(() => navigate("/seller/dashboard"), 1500);
      } else {
         await itemService.addItem(payload);
         setSuccess(true);
         // Reset form
         setFormData({
            title: "", description: "", originalPrice: "", discount: "0",
            category: "Casual", section: "Casual", brand: "", image: "", sizes: [], isFeatured: false
         });
         setImagePreview("");
         setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} item:`, error);
      alert(`Failed to ${isEditing ? 'update' : 'add'} item. Please check your permissions and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="add-item-container unauthorized">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="unauthorized-message"
        >
          <h2>Authentication Required</h2>
          <p>Please sign in to manage items.</p>
        </motion.div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="add-item-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="add-item-card"
      >
        <div className="add-item-header">
          <h1>{isEditing ? "Edit Product" : "Add New Product"}</h1>
          <p>{isEditing ? "Update your product details" : "Share your fashion finds with the StyleHub community"}</p>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-message"
          >
            🎉 Item {isEditing ? "updated" : "added"} successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="add-item-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="input-group">
              <label htmlFor="title">Item Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Elegant Summer Dress"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the item, material, fit, and styling tips..."
                rows={4}
                required
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Zara, H&M"
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., T-Shirts"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="section">Section *</label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  placeholder="e.g., Casual"
                  required
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group price-input">
                <label htmlFor="originalPrice">Original Price *</label>
                <div className="price-wrapper">
                  <span className="price-currency">₹</span>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="999"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="input-group price-input">
                <label htmlFor="discount">Discount Amount</label>
                <div className="price-wrapper">
                  <span className="price-currency">₹</span>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="input-group mt-4 flex items-center gap-3">
              <label className="relative flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                <span className="text-sm font-medium text-gray-700">Display as Featured Product</span>
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-section">
            <h3>Product Image</h3>
            <div className="image-upload-section">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              <label htmlFor="image" className="image-upload-label">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <div className="image-overlay">
                      <MdCloudUpload />
                      <span>Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <MdImage />
                    <span>Upload Product Image</span>
                    <small>JPG, PNG up to 5MB</small>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Sizes */}
          <div className="form-section">
            <h3>Available Sizes</h3>
            <div className="sizes-grid">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`size-btn ${
                    formData.sizes.includes(size) ? "active" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                {isEditing ? "Saving Changes..." : "Adding Item..."}
              </>
            ) : (
              isEditing ? "Save Changes" : "Add Item to Catalog"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddItem;
