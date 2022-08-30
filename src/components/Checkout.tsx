import TV from '../asset/monitor.png'
import { ICart } from '../interface'
import BagIcon from './icons/Bag'

import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../utils/constants"
import { useGetUserCartQuery } from '../redux/slice/Cart'
import { Button, Skeleton } from '@mui/material'
import { formatNumber } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartIcon } from './icons'


function CheckoutCard({cart}: {cart: ICart}){
    return(
        <div className="w-full flex justify-between mb-5">
            <div className="flex w-9/12 gap-3">
                <img src={cart.product.product_images[0].image_link} className="w-[80px] h-[80px] object-cover rounded-lg" />
                <p className="text-sm text-grey-200">{cart.product.name}</p>
            </div>

            <div className='flex flex-col'>
                <p className="font-medium text-primary-dark-blue ml-auto">₦ {formatNumber(cart.price)}</p>
                <small className="text-[14px] block ml-auto text-grey-700">x{cart.quantity}</small>
            </div>
        </div>
    )
}

function CheckoutCardSkeleton(){
    return(
        <div className="w-full flex justify-between mb-5 border">
            <div className="flex items-start w-9/12 gap-3">
                <Skeleton width={150} height={100}/>
                <Skeleton sx={{fontSize: 14}} width={"80%"}/>
            </div>

            <div className='flex flex-col'>
                <Skeleton width={50} height={16}/>
                <Skeleton sx={{fontSize: 14}} width={30}/>
            </div>
        </div>
    )
}


export function CheckoutSummary (){
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let {carts, loadingCart} = useGetUserCartQuery({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""}, {
        selectFromResult: ({data, isLoading}) => ({
            carts: data?.result.data,
            loadingCart: isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    let navigate = useNavigate()
    let location = useLocation()

    let subTotal = carts?.reduce((total, cart) => {
        return total + (parseFloat(cart?.quantity) * parseFloat(cart?.price))
    }, 0) || 0

    return(
        <div className="bg-white h-fit rounded-xl py-6 px-6 border w-full self-start">
            <h2 className="text-lg text-primary-dark-blue font-semibold">Order Summary</h2>

            <div className="my-4 border-b border-solid border-grey-100">
                {
                    loadingCart?
                    [1, 2].map((cart, idx) => <CheckoutCardSkeleton /> ):
                    carts?.map((cart, idx) => <CheckoutCard cart={cart}/> )
                }
            </div>

            <div className="w-full">
                {
                    loadingCart ?
                    <Skeleton sx={{fontSize: 14}} width={100}/>:
                    <p className="flex justify-between">
                        <p className="text-grey-200">Sub Total:</p>
                        <p className="text-primary-dark-blue text-xl font-semibold">₦ {formatNumber(subTotal)}</p>
                    </p>
                }
                <div className="flex justify-center my-5 w-full mx-auto">

                    <Button 
                        color="secondary"
                        fullWidth
                        startIcon={<CartIcon  size="20" color="white"/>}
                        variant="contained"
                        onClick={() => {
                            if(location.pathname === '/checkout'){
                                navigate("/cart")
                            }
                            else{
                                navigate("/checkout")
                            }
                            
                        }}>
                        {location.pathname === '/checkout' ? 'Modify Cart' : 'CheckOut Now'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSummary