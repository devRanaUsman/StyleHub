import { useDispatch, useSelector } from "react-redux";
import { BagActions } from "../store/BagSlice";
import { IoMdClose } from "react-icons/io";

function Bagitem({ item }) {
  let dispatch = useDispatch();

  return (
    <>
      <div className="bag-item-container">
        <div className="item-left-part">
          <img className="bag-item-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={item.image} alt="" />
        </div>
        <div className="item-right-part">
          <div className="company"> {item.brand}</div>
          <div className="item-name"> {item.name}</div>
          <div className="price-container">
            <span className="current-price">$ {item.price[0].price}</span>
            <span className="original-price">$ {item.price[0].original}</span>
            <span className="discount-percentage">
              ( {item.price[0].discount}% OFF)
            </span>
          </div>
          <div className="return-period">
            <span className="return-period-days">
              {" "}
              {/* {item.return_period} */}7 days
            </span>{" "}
            return available
          </div>
          <div className="delivery-details">
            Delivery by
            <span className="delivery-details-days"> 09/Oct/23</span>
          </div>

          <div className="quantity-control-container" style={{ display: 'flex', alignItems: 'center', marginTop: '15px', gap: '15px' }}>
            <span style={{ fontWeight: '600', color: '#333' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d4d5d9', borderRadius: '4px', overflow: 'hidden' }}>
              <button 
                onClick={() => dispatch(BagActions.decrementQuantity(item.id))} 
                style={{ width: '32px', height: '32px', background: '#f5f5f6', border: 'none', borderRight: '1px solid #d4d5d9', cu$or: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
              >
                -
              </button>
              <div style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', fontSize: '14px', fontWeight: '600' }}>
                {item.quantity || 1}
              </div>
              <button 
                onClick={() => dispatch(BagActions.incrementQuantity(item.id))} 
                style={{ width: '32px', height: '32px', background: '#f5f5f6', border: 'none', borderLeft: '1px solid #d4d5d9', cu$or: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div
          className="remove-from-cart"
          onClick={() => {
            dispatch(BagActions.removeFrombag(item.id));
          }}
        >
          <IoMdClose />
        </div>
      </div>
    </>
  );
}
export default Bagitem;
