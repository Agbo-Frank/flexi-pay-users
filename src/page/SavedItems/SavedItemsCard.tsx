import { LoadingButton } from "@mui/lab";
import { Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CartIcon, TrashIcon } from "../../components/icons";
import { ICart } from "../../interface";
import { useAddToCartMutation } from "../../redux/slice/Cart";
import { toggleSnackBar } from "../../redux/slice/modal";
import { useRemoveItemMutation } from "../../redux/slice/SavedItems";
import { HandleAddToCartClick } from "../../services";
import { formatNumber } from "../../utils";


export function SavedItem ({savedItem}: {savedItem: ICart}) {
    let [addToCart, {isLoading}] = useAddToCartMutation()
    let [rmItem, { isLoading: removing }] = useRemoveItemMutation()

    let dispatch = useDispatch()

    async function removeItem(){
        try{
            let data = await rmItem({ uuid: savedItem.uuid}).unwrap()
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
        <div className="flex justify-between rounded-2xl w-full shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 items-center px-6 py-6 mb-7">
            <Link 
                to={"/product/" + savedItem.product.slug}
                className="flex w-9/12 space-x-4 items-stretch">
                <img src={savedItem.product.product_images[0].image_link} alt="" className="w-[148px] h-[148px] object-cover rounded-xl"/>
                <div className="flex flex-col w-6/12 h-full items-stretch justify-evenly ">
                    <p className="w-9/12 text-grey-200 mb-5">{ savedItem.product.name }</p>
                    <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(savedItem.price)}</p>
                </div>
            </Link>
            <div className="flex flex-col space-y-3">
                <LoadingButton
                    color="secondary"
                    variant="contained"
                    loading={isLoading}
                    onClick={() => HandleAddToCartClick(savedItem.product.uuid, addToCart)}
                    startIcon={<CartIcon color='white' size="17" />}
                    size="large">
                        Add to Cart
                </LoadingButton>
                <LoadingButton
                    color="secondary"
                    variant="outlined"
                    startIcon={<TrashIcon color="#ff5000" size="17"/>}
                    size="large"
                    loading={removing}
                    onClick={removeItem}>
                    Remove
                </LoadingButton>
            </div>
        </div>      
    )
}

export function SavedItemSkeleton () {
    return(
        <div className="flex justify-between rounded-2xl w-full border border-solid border-grey-100 items-center p-4 mb-3">
            <div className="flex w-9/12 space-x-4 items-stretch">
                <Skeleton width={148} height={148} variant="rounded" />
                <div className="flex flex-col w-6/12 h-full space-y-2 items-stretch justify-evenly ">
                    <div>
                        <Skeleton sx={{fontSize: 16}}  width={"90%"}/>
                        <Skeleton sx={{fontSize: 16}}  width={"70%"}/>
                    </div>
                    <Skeleton sx={{fontSize: 18}} width={"40%"}/>
                </div>
            </div>
            <div className="flex flex-col space-y-1">
                <Skeleton height={50}  width={150}/>
                <Skeleton height={50}  width={150}/>
            </div>
        </div>      
    )
}

export default SavedItem