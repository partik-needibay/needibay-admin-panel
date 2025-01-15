import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk('appPayment/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})


// ** Fetch Payments
export const fetchData = createAsyncThunk(
  'appPayment/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/payment/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/payment/`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const appPaymentSlice = createSlice({
  name: 'appPayment',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    loader: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default appPaymentSlice.reducer
