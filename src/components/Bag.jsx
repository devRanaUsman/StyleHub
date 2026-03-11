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
   </>
  );
};
export default bag;
