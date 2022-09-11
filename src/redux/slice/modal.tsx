import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IModalReducer} from '../../interface'

let initialState: IModalReducer = {
  productReview: false,
  addAddress: false,
  addCreditCard: false,
  withdrawalForm: false,
  editProfile: false,
  snackBar: {
    open: false,
    message: "",
    severity: 'success'
  }
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleProductReview: (state) => {
      state.productReview = !state.productReview
    },
    toggleAddAddress: (state) => {
      state.addAddress = !state.addAddress
    },
    toggleAddCreditcard: (state) => {
      state.addCreditCard = !state.addCreditCard
    },
    toggleWithdrawalForm: (state) => {
      state.withdrawalForm = !state.withdrawalForm
    },
    toggleEditProfile: (state) => {
      state.editProfile = !state.editProfile
    },
    toggleSnackBar: (state, action) => {
      state.snackBar.message = action.payload.message
      state.snackBar.open = action.payload.open
      state.snackBar.severity = action.payload.severity
    }
  },
})

export const { 
  toggleProductReview, 
  toggleAddAddress,
  toggleAddCreditcard,
  toggleWithdrawalForm,
  toggleEditProfile,
  toggleSnackBar
} = modalSlice.actions

export default modalSlice.reducer