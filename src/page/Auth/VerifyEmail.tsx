import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { AuthenticationForm, Body, FormInput } from "../../components"
import { useResendVerificationMutation } from "../../redux/api/Auth"

import {  useFormik } from 'formik';
import * as Yup from 'yup';

import { Logo, MailIcon, MarkCircleIcon } from "../../components/icons"
import { useDispatch } from "react-redux"
import { toggleSnackBar } from "../../redux/slice/modal"
import { LoadingButton } from "@mui/lab"
import { verifyLink } from "../../utils"



export function VerifyEmail(){
    let [searchParams, setSearchParams] = useSearchParams()
    let [openDialog, setOpenDialog] = useState(false)
    let [isSent, setIsSent] = useState(false)
    let [verified, setVerified] = useState(false)

    let [resendVerificationLink, {isLoading, data}] = useResendVerificationMutation()
     
    let dispatch = useDispatch()

    async function handleClick(){
        if(!isSent){
            if(searchParams.has('email')){
                let data = await resendVerificationLink({email: `${searchParams.get('email')}`}).unwrap()

                if(data){
                    dispatch(toggleSnackBar({
                        open: true,
                        message: data.message,
                        severity: data.status === 'success' ? 'success' : 'error'
                    }))
                }
                if(data.status === 'success'){
                    setIsSent(true)
                    setVerified(true)
                    await setTimeout(() => setIsSent(false), (1000 * 60 * 10));
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
        if(!verified){
            if(searchParams.has('verify_url')){
                verifyLink(`${searchParams.get('verify_url')}`)
                    .then(data => {
                        console.log(data)
                        if(data){
                            dispatch(toggleSnackBar({
                                open: true,
                                message: data.message,
                                severity: data.status === 'success' ? 'success' : 'error'
                            }))
                            if(data.status === 'success'){
                                setSearchParams("")
                                setVerified(true)
                            }
                        }
                    })
                    .catch(err => console.log(err))
            }
            if(searchParams.has('from')){
                setIsSent(true)
                setTimeout(() => setIsSent(false), (1000 * 60 * 10));
            }
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
        <AuthenticationForm>
            <div className='flex justify-between items-center w-full px-2 py-6 border-b border-solid border-grey-100'>
                <Logo />
                <div className='hidden md:flex gap-5 items-center text-grey-200'>
                    <span>Already have an account?</span>
                    <Link to="/login" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Login</Link>
                </div>
            </div>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-4xl'>{verified ? "Email Verified" : "Verify email"}</h2>
                <small className='block mt-3 text-lg text-grey-300'>
                    {
                        verified ? "Your Email has been Verified" :
                        isSent ? "Verification link has been sent please check your mail" : "Please verify your email"
                    }
                </small>
            </div>
            
            {
                verified ?
                <small className="">
                    You're verified now Please <Link className="text-primary-orange-200 font-medium" to="/auth/login">Login</Link>
                </small> :
                !isSent &&
                <small>Didn't receive any mail? 
                    <span 
                        className="text-primary-orange-200 font-medium cursor-pointer" 
                        onClick={handleClick}>
                            Click to Send verification link
                    </span>
                </small>
            }
            
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
        </AuthenticationForm>
    )
}

export default VerifyEmail