import { useCookies } from "react-cookie";
import { FLEXIPAY_COOKIE } from "../utils/constants";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { toggleSnackBar } from "../redux/slice/modal";
import { IAddToCartReq, ICart, IResponse, ITrigger } from "../interface";


export async function HandleAddToCartClick(id: string | undefined, addToCart: ITrigger<IAddToCartReq, IResponse<{data: ICart}>>){
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);
    let dispatch = useDispatch()

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