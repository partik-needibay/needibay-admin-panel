import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk('customer/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})


// ** Fetch Leads
export const fetchData = createAsyncThunk(
  'customer/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/customer/list`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/customer/list`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchCustomerDataByCustomerId = createAsyncThunk(
  'customer/fetchCustomerDataByCustomerId',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      console.log(storedToken)
      console.log(data)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/customer/profile/` + data
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/profile/` + data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

// ** Fetch Customers
export const fetchCustomerOrderByCustomerId = createAsyncThunk(
  'customer/fetchCustomerOrderByCustomerId',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      console.log(storedToken)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/customer/${data}/orders`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/customer/${data}/orders`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchCustomerAddressByCustomerId = createAsyncThunk(
  'customer/fetchCustomerAddressByCustomerId',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    try {
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${data}/address`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${data}/address`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      console.log(e.getMessage())
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const addCustomerShippingAddress = createAsyncThunk(
  'appVendors/addCustomerShippingAddress',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${getState().order?.order?.customerId}/address/shipping`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${getState().order?.order?.customerId}/address/shipping`,
          data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      //dispatch(fetchData(getState().vendor.params))
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const addCustomerBillingAddress = createAsyncThunk(
  'appVendors/addCustomerBillingAddress',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${getState().order?.order?.customerId}/address/billing`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/${getState().order?.order?.customerId}/address/billing`,
          data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      //dispatch(fetchData(getState().vendor.params))
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)


export const fetchCustomerPaymentByCustomerId = createAsyncThunk(
  'customer/fetchCustomerPaymentByCustomerId',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      console.log(storedToken)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/payment/customer/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/payment/customer/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchCustomerInvoiceByCustomerId = createAsyncThunk(
  'customer/fetchCustomerInvoiceByCustomerId',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      console.log(storedToken)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/customer/list`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/customer/list`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error.getMessage())
    }
  }
)
export const customerSlice = createSlice({
  name: 'customer',
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
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    }),
      builder.addCase(fetchCustomerAddressByCustomerId.fulfilled, (state, action) => {
        state.customerAddress = action.payload
      }),
      builder.addCase(fetchCustomerDataByCustomerId.fulfilled, (state, action) => {
        state.customerData = action.payload
      }),
      builder.addCase(fetchCustomerOrderByCustomerId.fulfilled, (state, action) => {
        state.customerOrder = action.payload
      }),
      builder.addCase(fetchCustomerPaymentByCustomerId.fulfilled, (state, action) => {
        state.customerPayment = action.payload
      }),
      builder.addCase(fetchCustomerInvoiceByCustomerId.fulfilled, (state, action) => {
        state.customerInvoice = action.payload
      })
      builder.addCase(setLoader.fulfilled, (state, action) => {
        state.loader = action.payload
      })
  }
})

export default customerSlice.reducer
