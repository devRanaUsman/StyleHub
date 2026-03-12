import { useDispatch } from "react-redux";
import { BagActions } from "../store/BagSlice";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

function Homeitem({ item }) {
  let dispatch = useDispatch();

  return (
    <>
      <div className="item1">
        <Link to={`/item/${item._id}`}>
          <span className="rating">
            {" "}
            {item.rating.average} ⭐ |{" "}
            <span className="view"> {item.rating.count}</span>
          </span>
          <div className="img">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={item.ImageUrl}
              alt=""
            />
          </div>
          <div className="name">
            <span> {item.name}</span>
          </div>
          <div className="iteminfo">
            <span> {item.brand}</span>
          </div>
          <div className="price">
            <span className="current">$. {item.price[0].price}</span>{" "}
            <span className="old">$. {item.price[0].original}</span>{" "}
            <span className="discount">{item.price[0].discount}%OFF</span>
          </div>
        </Link>
        <button
          className="addcart btn btn-outline-success"
          data-id={item.id}
          onClick={() => dispatch(BagActions.addTobag(item))}
        >
          Add to Bag
        </button>
      </div>
    </>
  );
}
export default Homeitem;
