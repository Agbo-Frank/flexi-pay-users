import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/Auth";
import { useLogoutMutation } from "../../redux/api/Auth";
import { toggleLogout } from "../../redux/slice/modal";
import { RootState } from "../../redux/store";



export function LogoutModal(){
    const open = useSelector((state: RootState) => state.modal.logout)
    const dispatch = useDispatch()

    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })
    let {signout} = useAuth()
    return(
        <Dialog onClose={() => dispatch(toggleLogout())} open={open}>
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure your want to logout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => dispatch(toggleLogout())}
                    color="secondary"
                    variant="outlined">Cancel</Button>
                <LoadingButton
                    loading={loggingOut} 
                    autoFocus 
                    onClick={() => {
                        signout()
                        dispatch(toggleLogout())
                    }}
                    color="secondary"
                    variant="contained">
                    Logout
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default LogoutModal