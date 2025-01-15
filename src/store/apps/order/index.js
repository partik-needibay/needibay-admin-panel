import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk('appOrder/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})

export const setCustomer = createAsyncThunk('appOrder/setCustomer', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})
export const setShippingAddress = createAsyncThunk('appOrder/setShippingAddress', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})
export const setBillingAddress = createAsyncThunk('appOrder/setBillingAddress', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})
export const setPaymentMethod = createAsyncThunk('appOrder/setPaymentMethod', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})
export const setCheckoutMethod = createAsyncThunk('appOrder/setCheckoutMethod', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})

export const setProducts = createAsyncThunk('appOrder/setProducts', async (data, { getState, dispatch, rejectWithValue }) => {
  console.log(data);
  return data
})

// ** Fetch Orders
export const fetchData = createAsyncThunk(
  'appOrder/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          },
          params: { 
            page: data.page 
          }
        }
      )
      console.log(response)
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error.getMessage())
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'appOrder/fetchOrderById',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/${data}`,
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
      return rejectWithValue(error.getMessage())
    }
  }
)

export const createOrder = createAsyncThunk(
  'appOrder/createOrder',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/order/`,
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
      return rejectWithValue(error.getMessage())
    }
  }
)

export const updateOrderStatus = createAsyncThunk('appOrder/updateOrderStatus', async data => {
  try {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const requestData = {
      status: data.orderStatus,
      comment: data.comment
    }
    const response = await axios.put(
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/order/${data.orderId}/status`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/order/${data.orderId}/status`,
      requestData,
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
})

export const appOrderSlice = createSlice({
  name: 'appOrder',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    loader: false,
    orderById: null,
    order: {
      customerId: null,
      shippingAddress: null,
      billingAddress: null,
      items: "",
      checkoutMethod: "SYSTEM_ADMIN",
      paymentMethod: "COD",
      subtotal: 0.00,
      subtotalWithDiscount: 0.00,
      grandTotal: 0.00,
      isCouponApplied:false,
      couponCode: "",
      discountType: "",
      discountValue: 0.00,
      discountAmount: 0.00,
      tax: 0.00
    }
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
    builder.addCase(setCustomer.fulfilled, (state, action) => {
      state.order.customerId = action.payload
    })
    builder.addCase(setShippingAddress.fulfilled, (state, action) => {
      state.order.shippingAddress = action.payload
    })
    builder.addCase(setBillingAddress.fulfilled, (state, action) => {
      state.order.setBillingAddress = action.payload
    })
    builder.addCase(setCheckoutMethod.fulfilled, (state, action) => {
      state.order.checkoutMethod = action.payload
    })
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.orderById = action.payload
    })
    builder.addCase(setPaymentMethod.fulfilled, (state, action) => {
      state.order.paymentMethod = action.payload
    })
    builder.addCase(setProducts.fulfilled, (state, action) => {
      state.order.items = action.payload?.items,
      state.order.subtotal = action.payload?.subtotal
      state.order.grandTotal = action.payload?.grandTotal
      state.order.tax = action.payload?.taxAmount
    })
  }
})

export default appOrderSlice.reducer
