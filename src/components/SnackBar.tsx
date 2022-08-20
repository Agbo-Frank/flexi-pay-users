import { Alert, Button, IconButton, Snackbar } from "@mui/material"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackBar } from "../redux/slice/modalSlice";
import { RootState } from "../redux/store";
import { CloseEyesIcon } from "./icons";


export function SnackBar(){
    let dispatch = useDispatch()
    let {severity, message, open} = useSelector((state: RootState) => state.modal.snackBar)

    function handleClose(event: React.SyntheticEvent | Event, reason?: string){
        if (reason === 'clickaway') {
            return;
        }

        dispatch(toggleSnackBar({
            message: "",
            open: false,
            severity: 'info'
        }))
    }

    return(
        <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            onClose={handleClose}
        >
            <Alert 
                onClose={handleClose} 
                severity={severity} 
                variant="filled" 
                sx={{ width: '100%', color: 'white' }}>
                    {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar