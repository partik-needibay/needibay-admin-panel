import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk(
  'appPurchaseOrder/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

// ** Fetch PurchaseOrders
export const fetchData = createAsyncThunk(
  'appPurchaseOrder/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order`,
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
      return rejectWithValue(e.getMessage())
    }
  }
)

// ** Fetch PurchaseOrders
export const postPurchaseOrder = createAsyncThunk(
  'appPurchaseOrder/postPurchaseOrder',
  async (data, { getState, dispatch, rejectWithValue }) => {
    console.log('=======================line 45 ========================')
    console.log(data)
    dispatch(setLoader(true))
    let formdata = new FormData()
    formdata.append('purchaseOrderId', data.invoiceId)
    formdata.append('customerId', data.customerId)
    formdata.append('salesPersonId', data.salesPersonId)
    formdata.append('customerNotes', data.customerNotes)
    formdata.append('terms', data.terms)
    formdata.append('paymentTerms', data.paymentTerms)
    formdata.append('items', data.items)
    formdata.append('dateIssued', data.dateIssued)
    formdata.append('dueDate', data.dueDate)
    formdata.append('subtotal', data.subtotal)
    formdata.append('subtotalWithDiscount', data.subtotalWithDiscount)
    formdata.append('discount', data.discount)
    formdata.append('discountType', data.discountType)
    formdata.append('adjustment', data.adjustment)
    formdata.append('adjustmentType', data.adjustmentType)
    formdata.append('tax', data.tax)
    formdata.append('grandTotal', data.grandTotal)
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/purchase-order`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )

      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error.getMessage())
    }
  }
)

export const fetchLastPurchaseId = createAsyncThunk(
  'appPurchase/fetchLastPurchaseId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/purchase-order/last-purchase-order-id`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order/last-purchase-order-id`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data?.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error.getMessage())
    }
  }
)

export const fetchPurchaseOrderById = createAsyncThunk(
  'appPurchaseOrder/fetchPurchaseOrderById',
  async (params, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      console.log(params)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/purchase-order/` + params.id
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order/` + params.id,
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
      return rejectWithValue(e.getMessage())
    }
  }
)

// ** Preview Invoice, set in the preview reducer
export const previewPurchaseOrder = createAsyncThunk(
  'appPurchaseOrder/previewPurchaseOrder',
  async (data, { getState, dispatch, rejectWithValue }) => {
    console.log('=======================line 45 ========================')
    console.log(data)
    dispatch(setLoader(true))
    let formdata = new FormData()
    formdata.append('invoiceId', data.invoiceId)
    formdata.append('customerId', data.customerId)
    formdata.append('salesPersonId', data.salesPersonId)
    formdata.append('customerNotes', data.customerNotes)
    formdata.append('terms', data.terms)
    formdata.append('paymentTerms', data.paymentTerms)
    formdata.append('items', data.items)
    formdata.append('dateIssued', data.dateIssued)
    formdata.append('dueDate', data.dueDate)
    formdata.append('subtotal', data.subtotal)
    formdata.append('subtotalWithDiscount', data.subtotalWithDiscount)
    formdata.append('discount', data.discount)
    formdata.append('discountType', data.discountType)
    formdata.append('adjustment', data.adjustment)
    formdata.append('adjustmentType', data.adjustmentType)
    formdata.append('tax', data.tax)
    formdata.append('grandTotal', data.grandTotal)
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/purchase-order/preview`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/purchase-order/preview`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )

      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error.getMessage())
    }
  }
)

export const appPurchaseOrderSlice = createSlice({
  name: 'appPurchaseOrder',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    invoicePreview: {},
    loader: false,
    lastPurchaseOrderId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    }),
      builder.addCase(setLoader.fulfilled, (state, action) => {
        state.loader = action.payload
      }),
      builder.addCase(fetchPurchaseOrderById.fulfilled, (state, action) => {
        state.purchaseOrderPreview = action.payload
      }),
      builder.addCase(previewPurchaseOrder.fulfilled, (state, action) => {
        state.purchaseOrderPreview = action.payload
      }),
      builder.addCase(fetchLastPurchaseId.fulfilled, (state, action) => {
        state.lastPurchaseOrderId = action.payload
      })
  }
})

export default appPurchaseOrderSlice.reducer
