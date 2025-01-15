import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk(
  'appQuotation/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

// ** Fetch Quotations
export const fetchData = createAsyncThunk(
  'appQuotation/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation`,
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

export const fetchLastQuotationId = createAsyncThunk(
  'appQuotation/fetchLastQuotationId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/quotation/last-quotation-id`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation/last-quotation-id`,
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

export const fetchQuotationById = createAsyncThunk(
  'appQuotation/fetchQuotationById',
  async (params, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      console.log(params)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/v1/contact/admin/quotation/` + params.id
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation/` + params.id,
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

export const deleteQuotation = createAsyncThunk('appQuotation/deleteData', async (id, { getState, dispatch }) => {
  try {
    const response = await axios.delete('/apps/invoice/delete', {
      data: id
    })
    await dispatch(fetchData(getState().invoice.params))

    return response.data
  } catch (error) {
    return rejectWithValue(e.getMessage())
  }
})

// ** Preview Invoice, set in the preview reducer
export const previewQuotation = createAsyncThunk(
  'appQuotation/previewQuotation',
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
          ? `/api/v1/contact/admin/quotation/preview`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/quotation/preview`,
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

// ** Fetch Quotations
export const postQuotation = createAsyncThunk(
  'appQuotation/postQuotation',
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
          ? `/api/v1/contact/admin/quotation`
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

export const appQuotationSlice = createSlice({
  name: 'appQuotation',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    loader: false,
    lastQuotationId: null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('action', action)
      state.data = action.payload
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    }),
      builder.addCase(fetchQuotationById.fulfilled, (state, action) => {
        state.quotationPreview = action.payload
      }),
      builder.addCase(setLoader.fulfilled, (state, action) => {
        state.loader = action.payload
      }),
      builder.addCase(previewQuotation.fulfilled, (state, action) => {
        state.quotationPreview = action.payload
      }),
      builder.addCase(fetchLastQuotationId.fulfilled, (state, action) => {
        state.lastQuotationId = action.payload
      })
  }
})

export default appQuotationSlice.reducer
