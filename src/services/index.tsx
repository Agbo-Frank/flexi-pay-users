import { useCookies } from "react-cookie";
import { FLEXIPAY_COOKIE } from "../utils/constants";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { toggleSnackBar } from "../redux/slice/modal";
import { IAddToCartReq, ICart, IResponse, ITrigger } from "../interface";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";


export async function handleAddToCartClick(
    id: string | undefined, 
    addToCart: ITrigger<IAddToCartReq, IResponse<{data: ICart}>>,
    dispatch: Dispatch<AnyAction>,
    {cookies, setCookie}: {cookies: any, setCookie: any},
    done?: () => void | any 
    ){
    

    let uuid = cookies[FLEXIPAY_COOKIE]
    
    if (!uuid || uuid == ""){
        setCookie(FLEXIPAY_COOKIE, uuidv4(), {path: '/'})
        uuid = cookies[FLEXIPAY_COOKIE]
    }

    if(uuid){
        try{
            console.log(id)
            let data = await addToCart({
                product_uuid: `${id}`,
                quantity: "1",
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
                    message: error?.data.message
                }))
            }
        }
        
    }
}

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