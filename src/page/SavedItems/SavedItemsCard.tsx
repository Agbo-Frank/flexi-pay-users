import { LoadingButton } from "@mui/lab";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartIcon, TrashIcon } from "../../components/icons";
import { ISavedItems } from "../../interface";
import { useAddToCartMutation } from "../../redux/api/Cart";
import { toggleSnackBar } from "../../redux/slice/modal";
import { useRemoveItemMutation } from "../../redux/api/SavedItems";
import { handleAddToCartClick } from "../Cart/service";
import { formatNumber, sliceString } from "../../utils";
import TV from '../../asset/Product2.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { CardActions, CardImg, CardText, CardWrapper } from "../../components";
import { FLEXIPAY_COOKIE } from "../../utils/constants";
import { useCookies } from "react-cookie";
import backgroundImage from "../../asset/backgroundImage.png"
import { useState } from "react";



export function SavedItem ({savedItem}: {savedItem: ISavedItems}) {
    let [addToCart, {isLoading}] = useAddToCartMutation()
    let [rmItem, { isLoading: removing }] = useRemoveItemMutation()

    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);
    const dispatch = useDispatch()

    const matches = useMediaQuery('(min-width:600px)');
    let [disabled] = useState(savedItem?.product)

    async function removeItem(){
        try{
            let data = await rmItem({ wishlist_uuid: savedItem.uuid}).unwrap()
            if(data){
                dispatch(toggleSnackBar({
                    open: true,
                    message: data.message,
                    severity: data.status === 'success' ? 'success' : 'error'
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
    return(
        <CardWrapper>
            <Link 
                to={disabled === null ? "null" : "/product/" + savedItem?.product?.slug}
                className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0">
                <CardImg src={disabled === null ? backgroundImage : savedItem?.product?.product_images[0]?.image_link} />
                <div className="flex flex-col sm:w-6/12 sm:h-full items-stretch sm:justify-evenly ">
                    <CardText>{disabled === null ? "Product Not Found" : sliceString(savedItem?.product?.name) }</CardText>
                    <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(savedItem?.product?.price)}</p>
                </div>
            </Link>
            <CardActions>
                <LoadingButton
                    color="secondary"
                    variant="contained"
                    loading={isLoading}
                    disabled={disabled === null}
                    onClick={() => {
                        handleAddToCartClick({product_uuid: savedItem?.product?.uuid}, addToCart, dispatch, {cookies, setCookie})
                            .then(() => removeItem())
                    }}
                    startIcon={<CartIcon color='white' size="17" />}
                    size={matches ? "large" : "medium"}>
                        Add to Cart
                </LoadingButton>
                <LoadingButton
                    color="secondary"
                    variant="outlined"
                    startIcon={<TrashIcon color="#ff5000" size="17"/>}
                    size={matches ? "large" : "medium"}
                    loading={removing}
                    onClick={removeItem}>
                    Remove
                </LoadingButton>
            </CardActions >
        </CardWrapper>     
    )
}

export function SavedItemDummy () {
    const matches = useMediaQuery('(min-width:600px)');
    return(
        <div className="flex flex-col sm:flex-row justify-between rounded sm:rounded-2xl w-full shadow hover:shadow-lg border hover:border-0 border-solid items-center p-3 sm:p-6 mb-3 bg-white">
            <Link 
                to={"/product/"}
                className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0">
                <CardImg src={TV} />
                <div className="flex flex-col sm:w-6/12 sm:h-full items-stretch sm:justify-evenly ">
                    <p className="sm:w-9/12 text-black sm:text-grey-200 font-semibold sm:font-normal text-sm sm:text-base sm:mb-5">43" Inches D-LED TV +1 Years Warranty - Black</p>
                    <p className="font-semibold text-primary-dark-blue ">₦ 150,000</p>
                </div>
            </Link>
            <div className="flex w-full sm:w-3/12 justify-between border-t-2 sm:border-t-0 pt-3 sm:pt-0 flex-row-reverse sm:flex-col sm:space-y-3">
                <LoadingButton
                    color="secondary"
                    variant="contained"
                    startIcon={<CartIcon color='white' size="17" />}
                    size={matches ? "large" : "medium"}>
                        Add to Cart
                </LoadingButton>
                <LoadingButton
                    color="secondary"
                    variant="outlined"
                    startIcon={<TrashIcon color="#ff5000" size="17"/>}
                    size={matches ? "large" : "medium"}>
                    Remove
                </LoadingButton>
            </div>
        </div>      
    )
}

export function SavedItemSkeleton () {
    const matches = useMediaQuery('(min-width:600px)');
    return(
        <div className="flex flex-col sm:flex-row justify-between rounded sm:rounded-2xl w-full border hover:border-0 border-solid border-grey-100 items-center p-3 sm:p-6 mb-3 sm:mb-7 bg-white">
            <div className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-0 sm:pb-0">
                <Skeleton width={matches ? 148 : 100} height={matches ? 148 : 100} variant="rounded" />
                <div className="flex flex-col w-10/12 sm:w-6/12 sm:h-full items-stretch sm:justify-evenly ">
                    <div className="w-full">
                        <Skeleton sx={{fontSize: 16}}  width={"90%"}/>
                        <Skeleton sx={{fontSize: 16}}  width={"70%"}/>
                    </div>
                    <Skeleton sx={{fontSize: 18}} width={"40%"}/>
                </div>
            </div>
            <div className="flex w-full sm:w-3/12 justify-between pt-3 sm:pt-0 flex-row-reverse sm:flex-col sm:space-y-3">
                <Skeleton height={matches ? 40 : 70}  width={matches ? 150 : 120}/>
                <Skeleton height={matches ? 40 : 70}  width={matches ? 150 : 120}/>
            </div>
        </div>      
    )
}

export default SavedItem