import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { toggleSnackBar } from "../../redux/slice/modal"
import { IResponse, ITrigger } from "../../interface";


export async function cancelSubscription(
    body: {id: string }, 
    cancelSub: ITrigger<{id: string}, IResponse<{data: any[] | null}>>, 
    dispatch: Dispatch<AnyAction>
){
    try{
        let data = await cancelSub(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                message: data.message,
                severity: data.status === 'success' ? 'success' : 'error'
            }))
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