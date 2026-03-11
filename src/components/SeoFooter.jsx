import { useState } from "react";
import "./SeoFooter.css";
import { Link } from "react-router-dom";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

export default function SeoFooter() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="seo-footer-wrapper">
      <div className="seo-footer-container">
        <h2 className="seo-title">StyleHub: Your Best Choice for Online Shopping</h2>
        
        <div className="seo-content-header" onClick={toggleExpand}>
          <h3 className="seo-subtitle">What is StyleHub?</h3>
          <button 
            className="seo-expand-btn"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
          </button>
        </div>

        <div className={`seo-text-content ${isExpanded ? "expanded" : ""}`}>
          <p>
            StyleHub is an elite online fashion destination and cross-border e-commerce platform dedicated to connecting fashion enthusiasts with premium designers and global trends. For more in-depth insights into the fashion community, explore the StyleHub Blog. Welcome to StyleHub, the ultimate marketplace and one-stop website for finding virtually any style you can constantly imagine. Our platform is designed to seamlessly integrate direct designer-to-buyer interactions, providing 100% authentic wear at competitive prices.
          </p>
          {isExpanded && (
            <p>
              Whether you are looking for casual everyday luxury, high-end formal wear, or authentic activewear, StyleHub guarantees a unified, trustworthy shopping experience backed by 24/7 customer service and Buyer Protection.
            </p>
          )}
        </div>

        <div className="seo-links-row">
          <span className="seo-links-label">View more</span>
          <Link to="/" className="seo-link">Blog</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">summer collection</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">formal shirts</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">sneakers</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">accessories</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">sports wear</Link>
          <span className="seo-divider">|</span>
          <Link to="/" className="seo-link">watches</Link>
        </div>
      </div>
    </div>
  );
}
