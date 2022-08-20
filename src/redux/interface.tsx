import { AlertColor } from "@mui/material";


export interface IModalReducer {
    orderDetails: boolean,
    trackOrder: boolean,
    productReview: boolean,
    addAddress: boolean,
    addCreditCard: boolean,
    withdrawalForm: boolean,
    editProfile: boolean;
    snackBar: {
        open: boolean;
        message: string;
        severity: AlertColor;
    }
}