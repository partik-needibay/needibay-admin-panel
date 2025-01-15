import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authConfig from 'src/configs/auth'
// ** Axios Imports
import axios from 'axios'

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
})

export const setLoader = createAsyncThunk(
  'appUsers/setLoader',
  async (data, { getState, dispatch, rejectWithValue }) => {
    return data
  }
)

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appUsers/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))

    try {
      console.log('called fetchData')
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const config = {
        headers: { Authorization: `Bearer ${storedToken}` }
      }

      const response = await API.get('/auth/user', config)
      // const response = await axios.get('/apps/users/list', { params })

      return {
        users: response.data.data,
        total: response.data.data.length,
        allData: response.data.data
      }
    } catch (error) {
      return rejectWithValue(error.getMessage())
    }
  }
)

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch, rejectWithValue }) => {
  dispatch(setLoader(true))

  try {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const config = {
      headers: { Authorization: `Bearer ${storedToken}` }
    }
    const response = await API.post(
      '/auth/admin/register',
      {
        ...data
      },
      config
    )
    dispatch(fetchData(getState().user.params))
    return response.data
  } catch (error) {
    return rejectWithValue(error.getMessage())
  }
})

// ** Add User
export const addCustomer = createAsyncThunk(
  'appUsers/addCustomer',
  async (data, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoader(true))

    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      const config = {
        headers: { Authorization: `Bearer ${storedToken}` }
      }
      const response = await API.post(
        '/auth/admin/customer/register',
        {
          ...data
        },
        config
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.getMessage())
    }
  }
)

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  try {
    const response = await axios.delete('/apps/users/delete', {
      data: id
    })
    dispatch(fetchData(getState().user.params))

    return response.data
  } catch (error) {
    return rejectWithValue(error.getMessage())
  }
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
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
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
    builder.addCase(setLoader.fulfilled, (state, action) => {
      state.loader = action.payload
    })
  }
})

export default appUsersSlice.reducer
