import { useState } from "react"
import { MinusIcon, PlusIcon, HeartIcon} from "../../components/icons"
import { ICart } from '../../interface'
import { useDelCartMutation, useUpdateCartMutation } from '../../redux/api/Cart'
import { useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, useMediaQuery } from '@mui/material'
import { formatNumber } from '../../utils'
import { Link } from "react-router-dom"
import product from '../../asset/product1.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { CardText } from "../../components"
import { LoadingButton } from "@mui/lab"
import { handleSaveItemClick } from "../../services"
import { useSavedItemMutation } from "../../redux/api/SavedItems"
import { deleteCart, handleQuantityControlClick } from "./service"



export function Cart({cart}: {cart: ICart}){
    let dispatch = useDispatch()
    let [open, setOpen] = useState(false)
    let [delCart, {isLoading: removing, data}] = useDelCartMutation()
    const matches = useMediaQuery('(min-width:600px)');
    let [updateCart, {isLoading }] = useUpdateCartMutation()

    let [savedItem, { isLoading: savingItem,}] = useSavedItemMutation()
    console.log("cart",cart)

    return(
        <>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Remove From Cart</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to remove this item from cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                    startIcon={<HeartIcon color="#FF5000" size="18"/>} 
                    variant="outlined"
                    color="secondary"
                    loading={savingItem}
                    onClick={() => {
                        handleSaveItemClick(cart.product.uuid, savedItem, dispatch, () => setOpen(false))
                            .then(() => deleteCart({uuid: cart.uuid}, delCart, dispatch, () => setOpen(false)))
                    }}>Save {matches && "for later"} </LoadingButton>
                    <LoadingButton 
                    onClick={() => deleteCart({uuid: cart.uuid}, delCart, dispatch, () => setOpen(false))}
                    loading={removing}
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    variant="contained"
                    >
                        Remove {matches && "item"}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <div 
            className="flex flex-col sm:flex-row justify-between shadow hover:shadow-lg sm:p-2 w-[98%] rounded-xl bg-white">
                <div className="p-2 pb-3 sm:pb-0">
                    <div className="flex space-x-2 sm:space-x-3 items-stretch">
                        <Link to={"/product/" + cart?.product?.uuid} className="block w-fit">
                            <img src={cart.product.product_images[0].image_link} className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] object-cover rounded sm:rounded-xl"/>
                        </Link>
                        <div className="sm:w-7/12 flex flex-col justify-around">
                            <CardText>{cart?.product?.name.slice(0, 42) + (cart?.product?.name && cart?.product?.name?.length > 42 ? "..." : "")}</CardText>
                            <p className="font-semibold text-primary-dark-blue sm:hidden">₦ {formatNumber(cart.price)}</p>
                            <small className="text-grey-200 text-xs sm:text-sm font-medium">Qty: {cart.quantity}</small>
                            <div className="hidden sm:block">
                                <Button
                                color="secondary"
                                size="small"
                                onClick={() => setOpen(true)}
                                startIcon={<DeleteIcon />}>Remove</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-2 sm:p-0 border-t sm:border-t-0">
                    <div className="sm:hidden block">
                        <Button
                        color="secondary"
                        size="small"
                        onClick={() => setOpen(true)}
                        startIcon={<DeleteIcon />}>Remove</Button>
                    </div>
                    <div className="flex flex-col justify-end">
                        <p className="hidden sm:block font-semibold ml-auto text-primary-dark-blue text-lg mb-4">₦ {formatNumber(cart.price)}</p>
                        <div className="flex justify-between items-center space-x-3">
                            <div 
                                className={`rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 ${(isLoading ||  parseInt(cart.quantity) === 1) && "opacity-50"} h-5 flex justify-center items-center text-xl`}
                                onClick={() => {
                                    if(!isLoading && parseInt(cart.quantity) > 1){
                                        handleQuantityControlClick(
                                            {quantity: (parseInt(cart.quantity) - 1).toString(), cart_uuid: cart.uuid},
                                            updateCart,
                                            dispatch
                                        )
                                    }
                                }}>
                                <MinusIcon color="white" size="14" />
                            </div>
                            <div className="font-medium text-lg">{cart.quantity}</div>
                            <div 
                            className={`rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 h-5 flex ${isLoading && "opacity-50"} justify-center items-center text-xl`}
                            onClick={() => {
                                if(!isLoading){
                                    handleQuantityControlClick(
                                        {quantity: (parseInt(cart.quantity) + 1).toString(), cart_uuid: cart.uuid},
                                        updateCart,
                                        dispatch
                                    )
                                }
                            }}>
                                <PlusIcon size="14" color="white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// export function Cart(){
//     return(
//         <div 
//         className="flex flex-col sm:flex-row justify-between shadow sm:hover:shadow-lg border sm:hover:border-0 border-solid sm:p-2 w-[98%] rounded-xl bg-white">
//             <Link to={"/product/"} className="p-2 pb-3 sm:pb-0">
//                 <div className="flex space-x-2 sm:space-x-3 items-stretch">
//                     <img src={product} className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] object-cover rounded sm:rounded-xl"/>
//                     <div className="sm:w-7/12 flex flex-col justify-around">
//                         <CardText>Anti Blue Computer And Phone Glasses.</CardText>
//                         <p className="font-semibold text-primary-dark-blue sm:hidden">₦ 3,000</p>
//                         <small className="text-grey-200 text-xs sm:text-sm font-medium">Qty: 1</small>
//                         <div className="hidden sm:block">
//                             <Button
//                             color="secondary"
//                             size="small"
                            
//                             startIcon={<DeleteIcon />}>Remove</Button>
//                         </div>
//                     </div>
//                 </div>
//             </Link>
//             <div className="flex justify-between p-2 sm:p-0 border-t sm:border-t-0">
//                 <div className="sm:hidden block">
//                     <Button
//                     color="secondary"
//                     size="small"
//                     startIcon={<DeleteIcon />}>Remove</Button>
//                 </div>
//                 <div className="flex flex-col justify-end">
//                     <p className="hidden sm:block font-semibold ml-auto text-primary-dark-blue text-lg mb-4">₦ 3,300</p>
//                     <div className="flex justify-between items-center space-x-3">
//                         <div className="rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 opacity-50 h-5 flex justify-center items-center text-xl">
//                             <MinusIcon color="white" size="14" />
//                         </div>
//                         <div className="font-medium text-lg"> 1 </div>
//                         <div className="rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 h-5 flex justify-center items-center text-xl">
//                             <PlusIcon size="14" color="white" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

export function CartSkeleton(){
    return(
        <div 
        className="flex justify-between border border-grey-100 px-4 py-3 mx-6 rounded-xl">
            <div className='w-11/12'>
                <div className="flex space-x-3 items-stretch w-10/12">
                    <Skeleton width={150} height={150} variant="rounded"/>
                    <div className="w-10/12 flex flex-col justify-around">
                        <div>
                            <Skeleton sx={{fontSize: 14}} width={"100%"}/>
                            <Skeleton sx={{fontSize: 14}} width={"100%"}/>
                        </div>
                        <Skeleton sx={{fontSize: 13}} width={"40%"}/>
                        <p className="flex space-x-1 items-center text-grey-700 cursor-pointer hover:text-crimson" >
                            <Skeleton sx={{fontSize: 20}} width={20}/>
                            <Skeleton sx={{fontSize: 12}} width={60}/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-end">
                <Skeleton sx={{fontSize: 20}} width={"100%"}/>
                <div className="flex justify-between items-center space-x-3">
                    <Skeleton variant="circular" width={23} height={23}/>
                    <Skeleton height={23} width={10}/>
                    <Skeleton variant="circular" width={23} height={23}/>
                </div>
            </div>
        </div>
    )
}

export default Cart