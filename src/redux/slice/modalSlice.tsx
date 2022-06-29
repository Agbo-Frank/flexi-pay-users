import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IModalReducer} from '../interface'

let initialState: IModalReducer = {
  orderDetails: false,
  trackOrder: false,
  productReview: false,
  addAddress: false,
  addCreditCard: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    seeOrderDetails: (state) => {
      state.orderDetails = !state.orderDetails
    },
    trackOrder: (state) => {
      state.trackOrder = !state.trackOrder
    },
    toggleProductReview: (state) => {
      state.productReview = !state.productReview
    },
    toggleAddAddress: (state) => {
      state.addAddress = !state.addAddress
    },
    toggleAddCreditcard: (state) => {
      state.addCreditCard = !state.addCreditCard
    }
  },
})

export const { 
  seeOrderDetails, 
  trackOrder, 
  toggleProductReview, 
  toggleAddAddress,
  toggleAddCreditcard 
} = modalSlice.actions

export default modalSlice.reducer