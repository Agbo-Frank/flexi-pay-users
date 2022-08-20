import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IModalReducer} from '../interface'

let initialState = {
  token: localStorage.getItem('flexi-token') || null,
  isAuth: localStorage.getItem('flexi-token') ? true : false,
}


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem('flexi-token', action.payload)
      state.isAuth = true
      state.token = action.payload
    },
    unsetToken: (state) => {
      localStorage.removeItem('flexi-token')
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