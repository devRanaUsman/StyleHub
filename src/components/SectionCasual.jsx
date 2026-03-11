// /home/rana/Documents/Stylish Hub app/src/components/SectionCasual.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { BagActions } from "../store/BagSlice";
import { useDispatch } from "react-redux";
function SectionCasual({ items, section }) {
  const dispatch = useDispatch();
  console.log(section);

  //     try {
  //       // Ask the backend for items in the current section
  //       const data = await itemService.getSection1(section);
  //       setItems(data);
  //     } catch (error) {
  //       console.error("Failed to load section items:", error);
  //     }
  //   }

  //   fetchSectionItems();
  // }, [section]);?

  const handleAddToBag = (item) => {
    dispatch(
      BagActions.addTobag({
        id: item._id,
        name: item.name,
        price: item.price,
        image: item.ImageUrl,
      })
    );
  };

  if (items.length === 0) {
    return (
      <div className="text-center mt-5">No items found for this section.</div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-capitalize">{section} Section</h2>
      <div className="row g-4">
        {items.map((item) => (
          <div className="col-md-3" key={item._id}>
            <div className="card h-100 shadow-sm">
              <Link
                to={`/item/${item._id}`}
                className="text-decoration-none text-dark"
              >
                <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                  {item.rating?.average ?? 0} ⭐ ({item.rating?.count ?? 0})
                </span>
                <div style={{ overflow: "hidden", transformOrigin: "center" }}>
                  <motion.img
                    whileHover={{
                      scale: 1.05,
                    }}
                    src={item.ImageUrl}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">{item.brand}</p>
                  {item.price?.[0] && (
                    <p className="card-text">
                      <span className="fw-bold me-2">
                        Rs. {item.price[0].price}
                      </span>
                      <span className="text-decoration-line-through text-muted me-2">
                        Rs. {item.price[0].original}
                      </span>
                      <span className="text-success">
                        {item.price[0].discount}% OFF
                      </span>
                    </p>
                  )}
                </div>
              </Link>
              <div className="card-footer bg-transparent border-0">
                <button
                  className="btn btn-outline-success w-100"
                  onClick={() => handleAddToBag(item)}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionCasual;
