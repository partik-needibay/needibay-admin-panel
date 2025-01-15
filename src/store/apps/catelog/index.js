import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk(
  'product/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

// ** Fetch Leads
export const fetchData = createAsyncThunk(
  'product/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchDisabledProduct = createAsyncThunk(
  'product/fetchDisabledProduct',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    const productWithOffer = {
      dataOption: 'or',
      searchCriteriaList: [
        {
          filterKey: 'isActive',
          operation: 'eq',
          value: false,
          attributeValue: 'true'
        },
      ]
    }
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product/search`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product/search`,
        productWithOffer,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const fetchOfferProduct = createAsyncThunk(
  'product/fetchOfferProduct',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    const productWithOffer = {
      dataOption: 'or',
      searchCriteriaList: [
        {
          filterKey: 'offerCode',
          operation: 'eq',
          value: 'WEEKLY_SALE',
          attributeValue: 'true'
        },
        {
          filterKey: 'offerCode',
          operation: 'eq',
          value: 'DAILY_SALE',
          attributeValue: 'true'
        },
        {
          filterKey: 'offerCode',
          operation: 'eq',
          value: 'FLASH_SALE',
          attributeValue: 'true'
        }
      ]
    }
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product/search`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/product/search`,
        productWithOffer,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

// ** Fetch Leads
export const disableProductById = createAsyncThunk(
  'product/disableProductById',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.patch(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/product/${data}`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.message)
    }
  }
)

export const fetchLooksByVendorId = createAsyncThunk(
  'vlooks/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/contact/vlook`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/vlook`,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const selectedAtrributes = createAsyncThunk(
  'product/selectedAtrributes',
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      return data
    } catch (e) {
      return rejectWithValue(e.getMessage())
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    responseData: {},
    serviceCategory: [],
    selectedAttributes: [],
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
      builder.addCase(fetchOfferProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      }),
      builder.addCase(fetchDisabledProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      }),
      builder.addCase(fetchLooksByVendorId.fulfilled, (state, action) => {
        state.data = action.payload
        state.total = action.payload.total
        state.params = action.payload.params
        state.allData = action.payload.allData
      }),
      builder.addCase(selectedAtrributes.fulfilled, (state, action) => {
        state.selectedAtrributes = action.payload
      })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default productSlice.reducer
