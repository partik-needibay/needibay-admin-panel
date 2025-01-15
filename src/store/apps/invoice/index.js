import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk(
  'appInvoice/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

// ** Fetch Invoices
export const fetchData = createAsyncThunk(
  'appInvoice/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/invoice`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/invoice`,
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

// ** Preview Invoice, set in the preview reducer
export const previewInvoice = createAsyncThunk(
  'appInvoice/previewInvoice',
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
          ? `/api/v1/contact/admin/invoice/preview`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/invoice/preview`,
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

// ** Fetch Invoices
export const postInvoice = createAsyncThunk(
  'appInvoice/postInvoice',
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
          ? `/api/v1/contact/admin/invoice`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/invoice`,
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

// ** Fetch Invoices
export const postQuotation = createAsyncThunk(
  'appInvoice/postQuotation',
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
          ? `/api/v1/contact/admin/invoice`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation`,
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

export const fetchInvoiceById = createAsyncThunk(
  'appInvoice/fetchInvoiceById',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/invoice/` + data.id
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/invoice/` + data.id,
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
      return rejectWithValue(error.message)
    }
  }
)

export const fetchLastInvoiceId = createAsyncThunk(
  'appInvoice/fetchLastInvoiceId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/invoice/last-invoice-id`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/invoice/last-invoice-id`,
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

export const deleteInvoice = createAsyncThunk('appInvoice/deleteData', async (id, { getState, dispatch }) => {
  try {
    const response = await axios.delete('/apps/invoice/delete', {
      data: id
    })
    await dispatch(fetchData(getState().invoice.params))

    dispatch(setLoader(false))
    return response.data
  } catch (error) {
    dispatch(setLoader(false))
    return rejectWithValue(error.getMessage())
  }
})

export const appInvoiceSlice = createSlice({
  name: 'appInvoice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    invoicePreview: {},
    loader: false,
    lastInvoiceId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    }),
      builder.addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.invoicePreview = action.payload
      })
    builder.addCase(previewInvoice.fulfilled, (state, action) => {
      state.invoicePreview = action.payload
    })

    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
    builder.addCase(fetchLastInvoiceId.fulfilled, (state, action) => {
      state.lastInvoiceId = action.payload
    })
  }
})

export default appInvoiceSlice.reducer
