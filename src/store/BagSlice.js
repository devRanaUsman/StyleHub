import { createSlice } from "@reduxjs/toolkit";

const BagSlice = createSlice({
  name: "bag",
  initialState: {
    bagItems: []
  },
  reducers: {
    addTobag: (state, action) => {
      // Check if item already exists to avoid duplicates
      const existingItem = state.bagItems.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.bagItems.push({ ...action.payload, quantity: 1 });
      } else {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      }
    },
    
    removeFrombag: (state, action) => {
      state.bagItems = state.bagItems.filter(item => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.bagItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.bagItems.find(item => item.id === action.payload);
      if (item) {
        let currentQuantity = item.quantity || 1;
        if (currentQuantity > 1) {
          item.quantity = currentQuantity - 1;
        } else {
          // Remove if 0
          state.bagItems = state.bagItems.filter(i => i.id !== action.payload);
        }
      }
    },
  }
});

export const BagActions = BagSlice.actions;
export default BagSlice;
