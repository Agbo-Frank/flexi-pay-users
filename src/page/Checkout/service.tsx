import { AnyAction } from '@reduxjs/toolkit';
import { FormikHelpers, useFormik } from 'formik';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { IInstallment, IResponse, ITrigger } from '../../interface';
import { toggleSnackBar } from '../../redux/slice/modal';
import { TCheckoutMethod  } from '../../interface';
import { validURL } from '../../utils';

export function FPFormikCreateInstallment(createInstallment: ITrigger<Omit<IInstallment, 'installment_uuid' | 'uuid'>, IResponse<{data: null}>>){
    let dispatch = useDispatch()

    let initialValues = {
        amount: '',
        frequency: '',
        product_uuid: '',
        name: ''
    }

    async function onSubmit (value: any, formikHelpers: FormikHelpers<Omit<IInstallment, 'installment_uuid' | 'uuid'>| any>){
        try{
            let data = await createInstallment(value).unwrap()

            if(data){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))
            }
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)

                if(error?.data){
                    dispatch(toggleSnackBar({
                        message: error?.data.message,
                        open: true,
                        severity: 'error'
                    }))
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            name: Yup
                    .string()
                    .required('Please enter a name for this plan'),
            amount: Yup
                .string()
                .required('Please enter the the desired amount'),
            frequency: Yup
                .string()
                .required('Please the please enter the frequency')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export async function confirmOrder(
    checkout_method: TCheckoutMethod | "", 
    dispatch: Dispatch<AnyAction>, 
    checkout: ITrigger<{checkout_method: TCheckoutMethod, install_mental_ids: string[] | undefined}, IResponse<{data: {link: string}}>>, 
    install_mental_ids: string[] | undefined = []
){
    let methods = ["directly_via_wallet", "install_mental_via_card", "install_mental_via_wallet", "directly_via_card"]
    if(checkout_method == ""){
        dispatch(toggleSnackBar({
            open: true,
            message: "Please select a checkout method",
            severity: 'error'
        }))
    }
    else if(!methods.includes(checkout_method)){
        dispatch(toggleSnackBar({
            open: true,
            message: "Please select a valid checkout method",
            severity: 'error'
        }))
    }
    else {
        try{
            let data = await checkout({ checkout_method, install_mental_ids }).unwrap()

            if(data.status === "success"){
                if(validURL(data.result.data.link)){
                    window.location.replace(data.result.data.link)
                }
                else{
                    dispatch(toggleSnackBar({
                        message: "Invalid URL, Try again",
                        open: true,
                        severity: 'error'
                    }))
                }
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
            }
        }
        catch(err){
            if(err){
                let error: any = err
                console.log(error)
                dispatch(toggleSnackBar({
                    open: true,
                    severity: 'error',
                    message: error?.data?.message
                }))
            }
        }
    }
}