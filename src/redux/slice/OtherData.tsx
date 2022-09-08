import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { FLEXIPAY_TOKEN } from '../../utils/constants'

let initialState = {
  token: localStorage.getItem(FLEXIPAY_TOKEN) || null,
  isAuth: localStorage.getItem(FLEXIPAY_TOKEN) ? true : false,
}


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem(FLEXIPAY_TOKEN, action.payload)
      state.isAuth = true
      state.token = action.payload
    },
    unsetToken: (state) => {
      localStorage.removeItem(FLEXIPAY_TOKEN)
      state.isAuth = false
      state.token = null
    }
  }
})

export const { 
  setToken,
  unsetToken
} = dataSlice.actions

export default dataSlice.reducer