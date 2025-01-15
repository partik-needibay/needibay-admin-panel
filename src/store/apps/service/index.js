import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk('service/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})


// ** Fetch Leads
export const fetchData = createAsyncThunk(
  'service/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/cart`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/cart`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response.data);
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    responseData: {},
    serviceCategory: [],
    loader: false

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default serviceSlice.reducer
