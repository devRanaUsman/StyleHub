import Footer from "./Footer";
import Header from "./Header";

const bag = () => {
  return (
    <>
     <Header />
      <main>
        <div className="bag-page">
          <div className="bag-items-container"></div>
          <div className="bag-summary"> <BagSummary /></div>
        </div>
      </main>
    <Footer />
      <script src="../data/items.js"></script>
      <script src="../scripts/index.js"></script>
      <script src="../scripts/bag.js"></script>
   </>
  );
};
export default bag;
