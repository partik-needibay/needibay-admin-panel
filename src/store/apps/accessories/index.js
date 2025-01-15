import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

// ** Fetch Accessoriess
export const fetchData = createAsyncThunk('appAccessories/fetchData', async (data, { getState, dispatch, rejectWithValue }) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
  const response = await axios.get(
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/accessories/`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/accessories/`,
    {
      headers: {
        Authorization: 'Bearer ' + storedToken
      }
    }
  )
  console.log(response)
  return response.data
})

export const appAccessoriesSlice = createSlice({
  name: 'appAccessories',
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
  }
})

export default appAccessoriesSlice.reducer
