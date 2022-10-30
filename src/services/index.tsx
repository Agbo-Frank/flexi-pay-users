import { toggleSnackBar } from "../redux/slice/modal";
import { IAddToCartReq, IResponse, ITrigger } from "../interface";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";



export async function handleSaveItemClick(
    id: string | undefined, 
    saveItem: ITrigger<Pick<IAddToCartReq, 'product_uuid'>, 
    IResponse<{data:null}>>,
    dispatch: Dispatch<AnyAction>,
    done?: () => void | any
    ){
    try{
        console.log(id)
        let data = await saveItem({product_uuid: `${id}`}).unwrap()

        if(data){
            dispatch(toggleSnackBar({
                open: true,
                severity: data.status === 'success'? 'success' : 'error',
                message: data.message
            }))

            if(data.status === 'success'){
                done && done()
            }
        }
    }
    catch(err){
        let error: any = err
        if(error?.data){
            dispatch(toggleSnackBar({
                open: true,
                severity: 'error',
                message: error?.data.message
            }))
        }
    }
}