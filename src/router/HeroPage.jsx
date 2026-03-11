import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <>
      <main className="main">
        {/* Hero Banner Section */}
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">Discover Your Style</h1>
            <p className="hero-subtitle">
              Premium fashion for the modern lifestyle
            </p>
            <Link to="/Home" className="hero-cta">
              Shop Now
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center"
              alt="StyleHub Fashion Collection"
            />
          </div>
        </div>

        {/* Promotional Strip */}
        <div className="promo-strip">
          <div className="promo-content">
            <span className="promo-text">
              ✨ Free Shipping on Orders Over $99 | 30-Day Returns | Premium
              Quality Guaranteed
            </span>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="featured-categories">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated collections</p>
          </div>

          <div className="categories-grid">
            <Link to="/Home" className="category-card large">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop"
                alt="Trending Fashion"
              />
              <div className="category-overlay">
                <h3>Trending Now</h3>
                <p>Latest fashion trends</p>
              </div>
            </Link>

            <Link to="/Home" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop"
                alt="Casual Wear"
              />
              <div className="category-overlay">
                <h3>Casual</h3>
                <p>Everyday comfort</p>
              </div>
            </Link>

            <Link to="/Home" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
                alt="Formal Wear"
              />
              <div className="category-overlay">
                <h3>Formal</h3>
                <p>Professional style</p>
              </div>
            </Link>

            <Link to="/Home" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop"
                alt="Sports Wear"
              />
              <div className="category-overlay">
                <h3>Sports</h3>
                <p>Active lifestyle</p>
              </div>
            </Link>

            <Link to="/Home" className="category-card">
              <img
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=400&fit=crop"
                alt="Accessories"
              />
              <div className="category-overlay">
                <h3>Accessories</h3>
                <p>Perfect finishing touches</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Brand Showcase */}
        <section className="brand-showcase">
          <div className="brand-banner">
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=300&fit=crop"
              alt="Premium Brands"
            />
            <div className="brand-overlay">
              <h2>Premium Brands</h2>
              <p>Curated selection from top designers</p>
            </div>
          </div>
        </section>

        {/* Special Offers Grid */}
        <section className="special-offers">
          <div className="section-header">
            <h2 className="section-title">Special Offers</h2>
            <p className="section-subtitle">
              Limited time deals you don't want to miss
            </p>
          </div>

          <div className="offers-grid">
            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop"
                alt="Summer Collection"
              />
              <div className="offer-content">
                <h3>Summer Sale</h3>
                <p>Up to 50% off</p>
              </div>
            </Link>

            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop"
                alt="New Arrivals"
              />
              <div className="offer-content">
                <h3>New Arrivals</h3>
                <p>Fresh styles weekly</p>
              </div>
            </Link>

            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=200&fit=crop"
                alt="Premium Collection"
              />
              <div className="offer-content">
                <h3>Premium</h3>
                <p>Luxury fashion</p>
              </div>
            </Link>

            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=200&fit=crop"
                alt="Evening Wear"
              />
              <div className="offer-content">
                <h3>Evening Wear</h3>
                <p>Elegant styles</p>
              </div>
            </Link>

            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop"
                alt="Footwear"
              />
              <div className="offer-content">
                <h3>Footwear</h3>
                <p>Step in style</p>
              </div>
            </Link>

            <Link to="/Home" className="offer-card">
              <img
                src="https://images.unsplash.com/photo-1506629905607-d9c297d3d45b?w=300&h=200&fit=crop"
                alt="Jewelry"
              />
              <div className="offer-content">
                <h3>Jewelry</h3>
                <p>Shine bright</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}

      </main>
    </>
  );
};
export default HeroPage;
