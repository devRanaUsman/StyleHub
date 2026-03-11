import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <footer className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h6>Shop Categories</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Trends
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Casual
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Formal
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Sports
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Accessories
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Lifestyle
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h6>Useful Links</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Blog
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Site Maps
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Help
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-2 mb-3">
              <h6>Customer Service</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Orders & Returns
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Shipping
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Help
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Site Maps
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Site News
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Careers
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-body-secondary">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-5 offset-md-1 mb-3">
              <div className={styles["footer-Section-3"]}>
                <div className={styles["orignal-div"]}>
                  <img
                    src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
                    alt=""
                  />
                  <div>
                    <strong>100% AUTHENTIC</strong> guarantee for all products
                    at StyleHub.com
                  </div>
                </div>
                <div className={styles["orignal-div"]}>
                  <img
                    src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png"
                    alt=""
                  />
                  <div className={styles["Footer-return"]}>
                    <strong>Return within 14days</strong> of receiving your
                    order
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2025 StyleHub Fashion, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a
                  className="link-body-emphasis"
                  href="#"
                  aria-label="Instagram"
                >
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a
                  className="link-body-emphasis"
                  href="#"
                  aria-label="Facebook"
                >
                  <svg className="bi" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </footer>
    </>
  );
}

export default Footer;
