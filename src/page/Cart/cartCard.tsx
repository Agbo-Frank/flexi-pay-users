import { useState } from "react"
import { TrashIcon, MinusIcon, PlusIcon, BagIcon} from "../../components/icons"
import { ICart } from '../../interface'
import { useDelCartMutation, useUpdateCartMutation } from '../../redux/slice/Cart'
import { useDispatch } from 'react-redux'
import { toggleSnackBar } from '../../redux/slice/modal'
import { Skeleton } from '@mui/material'
import { formatNumber } from '../../utils'
import { Link } from "react-router-dom"

export function Cart({cart}: {cart: ICart}){
    let dispatch = useDispatch()

    let [rmColor, setRmColor] = useState("#A0A0A1")
    let [delCart, {isLoading: removing, data}] = useDelCartMutation()
    let [updateCart, {isLoading }] = useUpdateCartMutation()

    async function deleteCart(){
        try{
            let data = await delCart({ uuid: cart.uuid}).unwrap()
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
        <div 
        className="flex justify-between shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 px-4 py-3 mx-6 rounded-xl">
            <Link to={"/product/" + cart.product.slug}>
                <div className="flex space-x-3 items-stretch">
                    <img src={cart.product.product_images[0].image_link} className="w-36 h-36 rounded-xl object-cover"/>
                    <div className="w-7/12 flex flex-col justify-around">
                        <p className="text-grey-200 truncate">{cart.product.name}</p>
                        <small className="text-grey-200 text-sm font-medium">Qty: {cart.quantity}</small>
                        <p 
                            className="flex space-x-1 items-center text-grey-700 cursor-pointer hover:text-crimson" 
                            onMouseEnter={() => setRmColor('#FF5000')}
                            onMouseLeave={() => setRmColor("#A0A0A1")}
                            onClick={deleteCart}>
                                <TrashIcon color={rmColor} size="14"/>
                                <p className="text-sm">{removing? 'Removing...' : 'Remove'}</p>
                        </p>
                    </div>
                </div>
            </Link>
            <div className="flex flex-col justify-end">
                <p className="font-semibold ml-auto text-primary-dark-blue text-lg mb-4">₦ {formatNumber(cart.price)}</p>
                <div className="flex justify-between items-center space-x-3">
                    <div className="rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 opacity-50 h-5 flex justify-center items-center text-xl">
                        <MinusIcon color="white" size="14" />
                    </div>
                    <div className="font-medium text-lg"> 1 </div>
                    <div className="rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 h-5 flex justify-center items-center text-xl">
                        <PlusIcon size="14" color="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

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