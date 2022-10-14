import { AnyAction } from "@reduxjs/toolkit"
import { useFormik } from "formik"
import { Dispatch } from "react"
import { useDispatch } from "react-redux"
import { IResponse, IReview, ITrigger } from "../../interface"
import { toggleSnackBar } from "../../redux/slice/modal"


export function FPFormikProductReview(comment: ITrigger<Omit<IReview, 'rate'>, IResponse<{data: any}>>, rate: ITrigger<Omit<IReview, 'comment'>, IResponse<{data: any}>>){
    let dispatch = useDispatch()

    let initialValues = {
        slug: "",
        comment: "",
        rate: 0
    }

    async function onSubmit(value: typeof initialValues){
        console.log(value)
        let data: any = null
        try{
            if(value.comment.length > 3){
                console.log('comment')
                data = await comment(value).unwrap()
            }
            else{
                console.log('rate')
                if(value.rate > 0){
                    data = await rate(value).unwrap()
                }
            }
            if(data){
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.status === 'success' ? "Thanks for your review" : data.message,
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
                    message: error?.data?.message
                }))
            }
        }
    }

    const formik = useFormik({ 
        initialValues, 
        onSubmit
    })

    return formik
}

export async function cancelOrder(
    body: {order_id: string | number}, 
    canOrder: ITrigger<{order_id: string | number}, IResponse<{data: any[] | null}>>, 
    dispatch: Dispatch<AnyAction>,
    done: () => void | any
){
    try{
        let data = await canOrder(body).unwrap()
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

export default FPFormikProductReview