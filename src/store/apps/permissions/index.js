// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const setLoader = createAsyncThunk('appPermissions/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})

// ** Fetch Invoices
export const fetchData = createAsyncThunk('appPermissions/fetchData', async (data, { getState, dispatch, rejectWithValue }) => {
  const response = await axios.get('/apps/permissions/data', {
    params
  })

  return response.data
})

export const appPermissionsSlice = createSlice({
  name: 'appPermissions',
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
      state.data = action.payload.permissions
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default appPermissionsSlice.reducer
