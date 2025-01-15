import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

export const setLoader = createAsyncThunk(
  'appVendors/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

export const fetchVendorDataByVendorId = createAsyncThunk(
  'customer/fetchVendorDataByVendorId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/admin/vendor/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/vendor/${data}`,
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

// ** Fetch Leads
export const fetchData = createAsyncThunk(
  'appVendors/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/account`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/account`,
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

// ** Add Vendor Account Details
export const addVendorAccountDetails = createAsyncThunk(
  'appVendors/addVendorAccountDetails',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken
          }
        }
      )
      sessionStorage.setItem('accountId', response.data?.data?.id)
      dispatch(setLoader(false))
      return response.data
    } catch (error) {
      dispatch(setLoader(false))
      return rejectWithValue(error)
    }
  }
)

export const fetchVendorAddressByVendorId = createAsyncThunk(
  'vendor/fetchVendorAddressByVendorId',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vendor/${data}/address`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/vendor/${data}/address`,
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

export const verifyGST = createAsyncThunk(
  'appVendors/verifyGST',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/verify-gst/${data}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/verify-gst/${data}`,
        data,
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

export const addVendorContactDetails = createAsyncThunk(
  'appVendors/addVendorContactDetails',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      data.accountId = sessionStorage.getItem('accountId')
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/contact-person`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/contact-person`,
        data,
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

export const addVendorBankDetails = createAsyncThunk(
  'appVendors/addVendorBankDetails',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      data.accountId = sessionStorage.getItem('accountId')
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/bank-details`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/bank-details`,
        data,
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

export const selectVendorDocuments = createAsyncThunk(
  'appVendors/selectVendorDocuments',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

export const uploadSelectVendorDocuments = createAsyncThunk(
  'appVendors/selectVendorDocuments',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      let formdata = new FormData()
      formdata.append('accountId', sessionStorage.getItem('accountId'))
      for (var x = 0; x < getState().vendor.files.length; x++) {
        formdata.append('docs', getState().vendor.files[x].file, getState().vendor.files[x]?.file?.name)
        formdata.append('documentType', getState().vendor.files[x].docType)
      }
      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/documents`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/documents`,
        formdata,
        {
          headers: {
            Authorization: 'Bearer ' + storedToken,
            'Content-Type': 'multipart/encrypted'
          }
        }
      )
      console.log(response.data)
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const addVendorAddressDetails = createAsyncThunk(
  'appVendors/addVendorAddressDetails',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const billingAddress = {
        billingAddressLineOne: data.billingAddressLineOne,
        billingAddressLineTwo: data.billingAddressLineTwo,
        billingState: data.billingState,
        billingZipcode: data.billingZipcode,
        billingCountry: data.billingCountry,
        billingPhone: data.billingPhone
      }
      const shippingAddress = {
        shippingAddressLineOne: data.shippingAddressLineOne,
        shippingAddressLineTwo: data.shippingAddressLineTwo,
        shippingState: data.shippingState,
        shippingZipcode: data.shippingZipcode,
        shippingCountry: data.shippingCountry,
        shippingPhone: data.shippingPhone
      }
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      data.accountId = sessionStorage.getItem('accountId')
      let formdata = new FormData()
      formdata.append('shippingAddress', JSON.stringify(shippingAddress))
      formdata.append('billingAddress', JSON.stringify(billingAddress))
      formdata.append('accountId', sessionStorage.getItem('accountId'))

      const response = await axios.post(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/address`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/admin/account/address`,
        formdata,
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

// ** Delete User
export const deleteUser = createAsyncThunk(
  'appVendors/deleteUser',
  async (id, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))
    try {
      const response = await axios.delete('/apps/leads/delete', {
        data: id
      })
      dispatch(fetchData(getState().vendor.params))
      dispatch(setLoader(false))
      return response.data
    } catch (e) {
      dispatch(setLoader(false))
      return rejectWithValue(e.getMessage())
    }
  }
)

export const appVendorsSlice = createSlice({
  name: 'appVendors',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    responseData: {},
    activeAccountId: null,
    files: [],
    loader: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('action', action)
      state.data = action.payload
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    }),
      builder.addCase(addVendorAccountDetails.fulfilled, (state, action) => {
        state.responseData = action.payload?.data
        state.activeAccountId = action.payload?.data?.id
      })
    builder.addCase(verifyGST.fulfilled, (state, action) => {
      state.verifyGST = action.payload
    })
    builder.addCase(selectVendorDocuments.fulfilled, (state, action) => {
      state.files = action.payload
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
    builder.addCase(fetchVendorDataByVendorId.fulfilled, (state, action) => {
      state.vendorData = action.payload
    })
  }
})

export default appVendorsSlice.reducer
