import { createSlice } from "@reduxjs/toolkit";
import { itemList } from "./Data";

const itemSlice = createSlice({
  name: "items",
  initialState: itemList,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, name, buy, sell, stock, picture } = action.payload;
      const uu = state.find((item) => item.id == id);
      if (uu) {
        uu.name = name;
        uu.buy = buy;
        uu.sell = sell;
        uu.stock = stock;
        uu.picture = picture;
      }
    },
    deleteItem: (state, action) => {
      const { id, name, buy, sell, stock, picture } = action.payload;
      const uu = state.find((item) => item.id == id);
      if (uu) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
