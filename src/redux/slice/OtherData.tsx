import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IModalReducer} from '../interface'

let initialState = {
  token: localStorage.getItem('flexi-token') === '' || localStorage.getItem('flexi-token') === null ? null : localStorage.getItem('flexi-token'),
  isAuth: false
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
  },
})

export const { 
  setToken,
  unsetToken
} = dataSlice.actions

export default dataSlice.reducer