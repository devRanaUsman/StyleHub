
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="stylehub-loader-logo">
          <span className="loader-logo-text">StyleHub</span>
          <span className="loader-logo-tagline">Fashion Forward</span>
        </div>
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <div className="loading-text">
          <h3>Loading your fashion world...</h3>
          <p>Please wait while we prepare everything for you</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;