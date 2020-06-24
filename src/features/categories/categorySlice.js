import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getAllCategories = createAsyncThunk(
  'categories/getAllCategories',
  async (payload, thunkAPI) => {
    const response = await fetch('https://tebri.test/api/categories')
    const json = await response.json()
    return json
  },
  {
    condition(arg, api) {
      const { categories } = api.getState()
      if (categories.loading || categories.all.length) {
        return false
      }
    }
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    loading: false,
    all: [],
    errors: []
  },
  reducers: {
    addCategory: (state, action) => {
      state.all.push(action.payload)
    },

    replaceCategories: (state, action) => {
      state.all = action.payload
    }
  },
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.loading = true
    },

    [getAllCategories.fulfilled]: (state, action) => {
      state.loading = false
      state.all = action.payload
    },

    [getAllCategories.rejected]: (state, action) => {
      state.loading = false
      state.errors = action.payload
    }
  }
})

export const {addCategory, replaceCategories} = categorySlice.actions

export const allCategories = (state) => state.categories.all

export default categorySlice.reducer