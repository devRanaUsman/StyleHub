import {createSlice} from "@reduxjs/toolkit";

const fetchingSlice = createSlice({
    name: "fetch",
    initialState: {
        fetching: false,
        fetched: false,

    },
    reducers:{
        fetchedState: (state) => {
            state.fetched = true;
        },
        markFetchedDone: (state) => {
            state.fetched = true;
            state.fetching = false;  // ✅ Stop the loader!
        },
        markFetchingStart: (state) => {
            state.fetching = true;
            state.fetched = false;   // ✅ Reset fetched state
        }
    }
});
export const fetchAction = fetchingSlice.actions;
export default fetchingSlice;
