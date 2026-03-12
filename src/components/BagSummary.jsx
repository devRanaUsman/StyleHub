import { useSelector } from "react-redux";

const BagSummary = () => {
  let CONVENIENCE_FEES = 99;
  let bagitems = useSelector((store) => store.Bag.bagItems);
  let totalItem = 0;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagitems.forEach((bagItem) => {
    let quantity = bagItem.quantity || 1;
    totalItem += quantity;
    let originalPrice = bagItem.price?.[0]?.original || 0;
    let currentPrice = bagItem.price?.[0]?.price || 0;

    totalMRP += originalPrice * quantity;
    totalDiscount += (originalPrice - currentPrice) * quantity;
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  return (
    <div className="bag-summary">
      {" "}
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS ( {totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">$ {totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -$ {totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">$5</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">$ {finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order">
        <div className="BTN-PLACEORDER btn btn-danger">PLACE ORDER</div>
      </button>
    </div>
  );
};
export default BagSummary;
