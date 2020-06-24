import { configureStore } from '@reduxjs/toolkit';
import itemReducer from "../features/items/itemSlice";
import collectedItemReducer from "../features/collected-items/collectedItemSlice";
import categoryReducer from "../features/categories/categorySlice";

export default configureStore({
  reducer: {
    items: itemReducer,
    collectedItems: collectedItemReducer,
    categories: categoryReducer
  },
});
