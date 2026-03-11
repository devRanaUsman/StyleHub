import { createSlice } from "@reduxjs/toolkit";

const BagSlice = createSlice({
  name: "bag",
  initialState: {
    bagItems: [],
  },
  reducers: {
    addTobag: (state, action) => {
    
        let state1 = [...state.bagItems, action.payload];
        console.log(state.bagItems);
        
        state.bagItems = state1;
        console.log(state.bagItems);
    },
    
    removeFrombag: (state, action) => {
  let newstate=state.bagItems.filter(item => item.id != action.payload);
  console.log(newstate);
  state.bagItems=newstate;
  
     
      //  let bagItems = state.bagItems.filter(bagItemId => bagItemId != itemId);
     },
}});

export const BagActions = BagSlice.actions;
export default BagSlice;
