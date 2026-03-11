import {createSlice} from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState: {
        items: [],
    },
    reducers:{
        addInitialItems: (state, action) => {
          
           
            state.items = action.payload[0];
        },
    }
});
export const itemsAction = itemSlice.actions;
export default itemSlice;
