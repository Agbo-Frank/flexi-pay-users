import { AnyAction } from "@reduxjs/toolkit"
import { Dispatch } from "react"
import { IAddToCartReq, ICart, IResponse, ITrigger } from "../../interface"
import { toggleSnackBar } from "../../redux/slice/modal"

import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { FLEXIPAY_COOKIE } from "../../utils/constants";


export async function deleteCart(
    body: { uuid: string}, 
    deleteCart: ITrigger<{ uuid: string}, IResponse<{data: null}>>,
    dispatch: Dispatch<AnyAction>,
    done: () => void | any
){
    try{
        let data = await deleteCart(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                message: data.message,
                severity: data.status === 'success' ? 'success' : 'error'
            }))

            if(data.status === 'success'){
                done()
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


export async function handleAddToCartClick(
    body: IAddToCartReq, 
    addToCart: ITrigger<IAddToCartReq, IResponse<{data: ICart}>>,
    dispatch: Dispatch<AnyAction>,
    {cookies, setCookie}: {cookies: any, setCookie: any},
    done?: () => void | any 
    ){
    

    let uuid = cookies[FLEXIPAY_COOKIE]
    
    if (!uuid || uuid == ""){
        let id = uuidv4()
        setCookie(FLEXIPAY_COOKIE, id, {path: '/'})
        uuid = id
    }

    if(uuid){
        try{
            let data = await addToCart({
                ...body,
                guest_id:  uuid
            }).unwrap()
            if(data){
                dispatch(toggleSnackBar({
                    open: true,
                    severity: data.status === 'success'? 'success' : 'error',
                    message: data.message
                }))
            }
        }
        catch(err){
            let error: any = err
            if(error?.data){
                dispatch(toggleSnackBar({
                    open: true,
                    severity: 'error',
                    message: error?.data?.message || "An error just occured, Please Try again!"
                }))
            }
        }
        
    }
}

export async function handleQuantityControlClick(
    body:  {quantity: string; cart_uuid: string}, 
    updateCart: ITrigger<{quantity: string; cart_uuid: string}, IResponse<{data: ICart}>>,
    dispatch: Dispatch<AnyAction>,
    ){
    try{
        let data = await updateCart(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                severity: data.status === 'success'? 'success' : 'error',
                message: data.message
            }))
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