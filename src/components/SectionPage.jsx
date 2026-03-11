import Homeitem from "./Homeitem";
import { useLoaderData, useParams } from "react-router-dom";
import SectionCasual from "./SectionCasual";

const SectionPage = () => {
  const { items } = useLoaderData();
  const { section } = useParams(); // Comes from the URL (e.g., "Casual")
  console.log(section);
  console.log(items);

  if (!Array.isArray(items)) {
    return <div>Loading items...</div>;
  }

  if (items.length === 0)
    // Display a loading message or spinner while fetching data
    return (
      <>
        <div style={{ minHeight: "60vh", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }} className=" items-container">
          <h1>No items found</h1>
          <img src="/loading.gif" alt="" />
        </div>
      </>
    );
  else {
    return (
      <div className="container py-4">
        <SectionCasual section={section} items={items} />
      </div>
    );
  }
};
export default SectionPage;
