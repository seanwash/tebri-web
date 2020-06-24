import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

// Async Actions
export const fetchAllItems = createAsyncThunk(
  'items/fetchAllItems',
  async (payload, thunkAPI) => {
    const response = await fetch('https://tebri.test/api/items')
    const json = await response.json()

    return json
  }
)

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    loading: false,
    errors: [],
    all: []
  },
  reducers: {
    addItem: (state, action) => {
      state.all.push(action.payload)
    },

    replaceItems: (state, action) => {
      state.all = action.payload
    },
  },
  extraReducers: {
    [fetchAllItems.pending]: (state, action) => {
      state.loading = true
    },

    [fetchAllItems.fulfilled]: (state, action) => {
      console.log(action)

      state.loading = false
      state.all = action.payload
    },

    [fetchAllItems.rejected]: (state, action) => {
      console.log(action)
      state.loading = false
      state.errors = action.payload
    }
  }
})

// Actions
export const { addItem, replaceItems } = itemSlice.actions

// Selectors
export const allItems = (state) => state.items.all

// Reducer
export default itemSlice.reducer