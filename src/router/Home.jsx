import SectionCasual from "../components/SectionCasual";
import { useLoaderData, useParams } from "react-router-dom";

const Home = () => {
  // const [items, setItems] = useState([]);
  const { items } = useLoaderData();
  const { section } = useParams();
  // useEffect(() => {
  //   itemService.getItems().then(setItems).catch(console.error);
  // }, []);
  // console.log(items);

  if (!Array.isArray(items)) {
    return <div>Loading items...</div>;
  }

  // if (items.length === 0)
  //   // Display a loading message or spinner while fetching data
  //   return (
  //     <>
  //       <div className="items-container">
  //         <h1>No items found</h1>
  //         <img src="/loading.gif" alt="" />
  //       </div>
  //     </>
  //   );
  else {
    return (
      // <Homeitem key={item.id} item={item} />
      <>
        <div className="items-container">
          <SectionCasual section={section} items={items} />
        </div>
      </>
    );
  }
};
export default Home;
