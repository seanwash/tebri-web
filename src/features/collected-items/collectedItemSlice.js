import { createSlice } from "@reduxjs/toolkit";

const collectedItemSlice = createSlice({
  name: "collectedItems",
  initialState: {
    byId: {},
  },
  reducers: {
    addCollectedItem: (state, action) => {
      const { id, location } = action.payload;

      if (state.byId[id]) {
        state.byId[id].push(location);
      } else {
        state.byId[id] = [location];
      }
    },

    removeLastCollectedItem: (state, action) => {
      const id = action.payload;
      state.byId[id].pop();
    },
  },
});

// Actions
export const {
  addCollectedItem,
  removeLastCollectedItem,
} = collectedItemSlice.actions;

// Selectors
export const allCollectedItems = (state) => state.collectedItems.byId;
export const collectedItemCount = (state) => tally(state.collectedItems.byId);
export const collectedItemCountByItemId = (id) => (state) => {
  if (state.collectedItems.byId[id]) {
    return state.collectedItems.byId[id].length;
  } else {
    return 0;
  }
};

// Reducer
export default collectedItemSlice.reducer;

// Helpers
function tally(allItems) {
  let count = 0;

  for (const id in allItems) {
    count += allItems[id].length;
  }

  return count;
}
