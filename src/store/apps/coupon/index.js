import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk('coupon/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})


// ** Fetch Leads
export const fetchData = createAsyncThunk('coupon/fetchData', async (data, { getState, dispatch, rejectWithValue }) => {
   dispatch(setLoader(true))
  try {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    console.log()
    const response = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`,
      {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      }
    )
    console.log(response?.data)
    dispatch(setLoader(false))
    return response.data
  } catch (e) {
    debugger;
    dispatch(setLoader(false))
    return rejectWithValue(e.message)
  }
})

export const createCoupon = createAsyncThunk(
  'coupon/createCoupon',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response?.data)
      dispatch(setLoader(false))
      return response?.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const updateCoupon = createAsyncThunk(
  'coupon/updateCoupon',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/coupon`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response?.data)
      dispatch(setLoader(false))
      return response?.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const couponSlice = createSlice({
  name: 'coupon',
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
    builder.addCase(createCoupon.fulfilled, (state, action) => {
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

export default couponSlice.reducer
