import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IModalReducer} from '../../interface'

let initialState: IModalReducer = {
  productReview: false,
  addAddress: {
    open: false,
    type: "create",
    body: null
  },
  addressBook: false,
  addCreditCard: false,
  withdrawalForm: false,
  editProfile: false,
  logout: false,
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
    toggleAddAddress: (state, action) => {
      state.addAddress.open = !state.addAddress.open
      state.addAddress.body = action.payload?.type === "edit" ?  action.payload?.body : null
      state.addAddress.type = action.payload?.type
    },
    toggleAddressBook: (state) => {
      state.addressBook = !state.addressBook
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
    },
    toggleLogout: (state) => {
      state.logout = !state.logout
    }
  },
})

export const { 
  toggleProductReview, 
  toggleAddAddress,
  toggleAddCreditcard,
  toggleWithdrawalForm,
  toggleEditProfile,
  toggleAddressBook,
  toggleSnackBar,
  toggleLogout
} = modalSlice.actions

export default modalSlice.reducer