import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'


export const setLoader = createAsyncThunk('appLeads/setLoader', async (data, { getState, dispatch, rejectWithValue }) => {
  return data
})

// ** Fetch Leads
export const fetchData = createAsyncThunk(
  'appLeads/fetchData',
  async (data, { getState, dispatch, rejectWithValue }) => {
     dispatch(setLoader(true))
    try {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      console.log(storedToken)
      const response = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/fetch-lead`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/fetch-lead`,
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

export const addLead = createAsyncThunk('appLeads/addLead', async (data, { getState, dispatch, rejectWithValue }) => {
   dispatch(setLoader(true))
  try {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    const response = await axios.post(
      process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/create-lead-admin`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/lead/create-lead-admin`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + storedToken
        }
      }
    )
    dispatch(fetchData(getState().lead))

    dispatch(setLoader(false))
    return response.data
  } catch (error) {
    dispatch(setLoader(false))
    return rejectWithValue(error.getMessage())
  }
})

// ** Add User
export const addUser = createAsyncThunk('appLeads/addUser', async (data, { getState, dispatch, rejectWithValue }) => {
   dispatch(setLoader(true))
  try {
    const response = await axios.post('/apps/leads/add-lead', {
      data
    })
    dispatch(fetchData(getState().lead.params))

    dispatch(setLoader(false))
    return response.data
  } catch (error) {
    dispatch(setLoader(false))
    return rejectWithValue(error.getMessage())
  }
})

// ** Delete User
export const deleteUser = createAsyncThunk('appLeads/deleteUser', async (id, { getState, dispatch }) => {
  try {
    const response = await axios.delete('/apps/leads/delete', {
      data: id
    })
    dispatch(fetchData(getState().lead.params))

    dispatch(setLoader(false))
    return response.data
  } catch (error) {
    dispatch(setLoader(false))
    return rejectWithValue(error.getMessage())
  }
})

export const appLeadsSlice = createSlice({
  name: 'appLeads',
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
      builder.addCase(addLead.fulfilled, (state, action) => {
        state.responseData = action.payload
      })
      builder.addCase(setLoader.fulfilled, (state, action) => {
        state.loader = action.payload
      })
  }
})

export default appLeadsSlice.reducer
