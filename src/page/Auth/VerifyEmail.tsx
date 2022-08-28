import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Body, FormInput } from "../../components"
import { useResendVerificationMutation } from "../../redux/slice/Auth"

import {  useFormik } from 'formik';
import * as Yup from 'yup';

import { MailIcon } from "../../components/icons"
import { useDispatch } from "react-redux"
import { toggleSnackBar } from "../../redux/slice/modal"
import { LoadingButton } from "@mui/lab"
import { verifyLink } from "../../utils"



export function VerifyEmail(){
    let searchParams = useSearchParams()[0]

    let [openDialog, setOpenDialog] = useState(false)
    let [message, setMessage] = useState('Resend Verification link')
    let [isSent, setIsSent] = useState(false)

    let [resendVerificationLink, {isLoading, data}] = useResendVerificationMutation()
     
    let dispatch = useDispatch()

    async function handleClick(){
        if(!isSent){
            if(searchParams.has('email')){
                let data = await resendVerificationLink({email: `${searchParams.get('email')}`}).unwrap()
                console.log(data)
                setMessage("Sending...")
                if(data.status === 'success'){
                    setIsSent(true)
    
                    await setTimeout(() => setIsSent(false), (1000 * 60 * 5));
                }
            }
            else{
                setOpenDialog(true)
            }
        }
        else{
            dispatch(toggleSnackBar({
                open: true,
                message: 'Verification link sent already',
                severity: 'info'
            }))
        }
    }

    useEffect(() => {
        if(searchParams.has('verify_url')){
            verifyLink(`${searchParams.get('verify_url')}`)
                .then(data => {
                    if(data.status === 'success'){
                        dispatch(toggleSnackBar({
                            open: true,
                            message: data.message,
                            severity: 'success'
                        }))
                    }
                    else{
                        dispatch(toggleSnackBar({
                            open: true,
                            message: data.message,
                            severity: 'error'
                        }))
                    }
                })
        }
        if(searchParams.has('from')){
            setIsSent(true)
        }
    }, [searchParams])

    const formik = useFormik({ 
        initialValues: {email: ''}, 
        validationSchema: () => (Yup.object({email: Yup.string().email().required()})), 
        onSubmit: async (value, formikHelpers) => {
            console.log(value)
            try{
                let data = await resendVerificationLink({email: value.email}).unwrap()
                if(data.status === 'success'){
                    setOpenDialog(false)
                }
                else{
                    dispatch(toggleSnackBar({
                        open: true,
                        message: data.message,
                        severity: 'error'
                    }))
                }
            }
            catch(err){
                if(err){
                    let error: any = err
                    formikHelpers.setErrors(error.data.errors)
                }
            }
        }
    })
    return(
        <>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-4xl'>Verify email</h2>
                <small className='block mt-3 text-lg text-grey-300'>{isSent ? "Verificationlink has been sent please check your mail" : "Please verify your email"}</small>
            </div>

            <small>Didn't receive any mail? <span className="text-primary-orange-200 font-medium cursor-pointer" onClick={handleClick}>{isSent ? "Verification Link Sent" : "Click to Send verification link"}</span></small>
            
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Resend verification Link</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Verify your account by providing your email adddress
                        </DialogContentText>
                        <form onSubmit={formik.handleSubmit}>
                            <FormInput 
                                type="email"
                                name="email"
                                label="Email"
                                Icon={MailIcon}
                                formik={formik}
                            />

                            <DialogActions>
                                <Button 
                                onClick={() => setOpenDialog(false)}
                                color="secondary"
                                variant="outlined">Cancel</Button>
                                <LoadingButton
                                type="submit"
                                loading={isLoading}
                                color="secondary"
                                variant="contained">
                                    Resend
                                </LoadingButton>
                                
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
        </>
    )
}

export default VerifyEmail