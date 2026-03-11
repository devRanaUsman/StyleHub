import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemsSlice";
import  fetchingSlice from "./Fetching";
import BagSlice from "./BagSlice";
import authSlice from "./authSlice";

 const Store =configureStore({
    reducer: {
        item: itemSlice.reducer,
        fetching: fetchingSlice.reducer,
        Bag:BagSlice.reducer,
        auth: authSlice.reducer,
    },
})
export default Store;