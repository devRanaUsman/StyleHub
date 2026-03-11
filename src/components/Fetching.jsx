// import { useDispatch, useSelector } from "react-redux";
// import { fetchAction } from "../store/Fetching";
// import { itemsAction } from "../store/itemsSlice";
// import { useEffect } from "react";

// const Fetching = ()=>{
// const dispatch = useDispatch();
//   const fetchState = useSelector((state) => state.fetching);

//   useEffect(() => {
//     // Start fetching when app loads
//     dispatch(fetchAction.markFetchingStart());
//     if (fetchState.fetched) {
//       return;
//     }
//      const controller = new AbortController();
//      const signal = controller.signal;

//      fetch("http://localhost:8080/items",
//        { signal },
//      )
//        .then((response) => response.json())
//        .then(({ items }) => {

//           dispatch(fetchAction.markFetchedDone());
//           dispatch(itemsAction.addInitialItems(items));
//        })
//        .catch((error) => {
//          console.error('Error:', error);
//          dispatch(fetchAction.markFetchedDone());
//        });

//   }, [dispatch]);

// };
// export default Fetching;
