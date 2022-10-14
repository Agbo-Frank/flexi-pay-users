import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { toggleSnackBar } from "../../redux/slice/modal"
import { IResponse, ITopUpSubscriptionReq, ITrigger } from "../../interface";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch } from "react-redux";


export async function cancelSubscription(
    body: {id: string | number }, 
    cancelSub: ITrigger<{id: string | number}, IResponse<{data: any[] | null}>>, 
    dispatch: Dispatch<AnyAction>,
    done: () => void | any
){
    try{
        let data = await cancelSub(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                message: data?.message,
                severity: data?.status === 'success' ? 'success' : 'error'
            }))

            if(data.status === "success"){
                done()
            }
        }
    }
    catch(err){
        if(err){
            let error: any = err
            console.log(err)
            dispatch(toggleSnackBar({
                open: true,
                severity: 'error',
                message: error?.data?.message || error?.message || "An Error just occured"
            }))
        }
    }
}

export function FPFormikTopUpSubscription( 
    topUp: ITrigger<ITopUpSubscriptionReq, IResponse<{data: any[] | null}>>, 
    done: () => void | any
){
    let dispatch = useDispatch()

    async function onSubmit(value: any, formikHelpers: FormikHelpers<ITopUpSubscriptionReq| any>) {
        try{
            let data = await topUp(value).unwrap()
            if(data){
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.message,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))

                if(data.status === "success"){
                    done()
                }
            }
        }
        catch(err){
            if(err){
                let error: any = err

                dispatch(toggleSnackBar({
                    open: true,
                    severity: 'error',
                    message: error?.data?.message || error?.message
                }))
            }
        }
    }

    let validationSchema = () => {
        return Yup.object({
            amount: Yup
                .string()
                .required('please enter an amount'),
        })
    }

    return useFormik({
        onSubmit,
        initialValues: {amount: ""},
        validationSchema
    })
}