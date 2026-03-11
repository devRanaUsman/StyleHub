import { useSelector } from "react-redux";
import Bagitem from "../components/Bagitem";
import BagSummary from "../components/BagSummary";

const bag = () => {
  let bagitems1 = useSelector((store) => store.Bag.bagItems);
  let bagitems = bagitems1;
  console.log(bagitems);
  

  if (bagitems.length === 0) {
    return (
      <main className="main-section1">
        <div className="empty-bag">
          <h2>Your bag is empty</h2>
          <p>Add some items to get started!</p>
        </div>
      </main>
    );
  }
  return (
    <>
      {/* <main className="main-section1">
        < div className="bag-page">
        <div className="bag-items-container">
        {bagitems.map((item)=> { return<Bagitem key={item.id} item={item} />})}
</div>
          <BagSummary />
   </div>
       
        
      </main> */}
      <main className="main-section1">
        <div className="bag-page">
          <div className="bag-items-container">
            {bagitems.map((item) => (
              <Bagitem key={item.id} item={item} />
            ))}
          </div>
          <BagSummary />
        </div>
      </main>
    </>
  );
};
export default bag;
