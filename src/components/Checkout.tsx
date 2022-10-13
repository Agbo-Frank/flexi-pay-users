import TV from '../asset/monitor.png'
import { ICart, IDetails } from '../interface'
import BagIcon from './icons/Bag'

import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../utils/constants"
import { useGetUserCartQuery } from '../redux/api/Cart'
import { Button, Skeleton } from '@mui/material'
import { formatNumber, sliceString } from '../utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { CartIcon } from './icons'
import { WrapperHeader } from './StyledComponent'
import { ICheckoutSummaryProps } from './interface'
import { useState } from 'react'
import backgroundImage from "../asset/backgroundImage.png"


function CheckoutCard({checkoutdetail}: {checkoutdetail: Partial<IDetails>}){
    let [disabled] = useState(checkoutdetail?.product)
    return(
        <div className={`w-full flex justify-between mb-5 p-1 shadow-sm hover:shadow rounded-lg ${disabled === null && "opacity-40"}`}>
            <div className="flex w-9/12 gap-3">
                <img src={disabled === null ? backgroundImage : (checkoutdetail?.product?.product_images[0].image_link || backgroundImage)} className="w-[80px] h-[80px] object-cover rounded-lg" />
                <p className="text-sm text-grey-200 capitalize">{disabled === null ? "Product not found" : sliceString(checkoutdetail?.product?.name)}</p>
            </div>

            <div className='flex flex-col'>
                <p className="font-medium text-primary-dark-blue ml-auto">₦ {formatNumber(`${checkoutdetail?.price || checkoutdetail.unit_price}`)}</p>
                <small className="text-[14px] block ml-auto text-grey-700">x{checkoutdetail.quantity}</small>
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


export function CheckoutSummary ({checkoutdetails, price}: ICheckoutSummaryProps){
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

    

    return(
        <div className="bg-white h-fit rounded-xl p-3 sm:p-4 w-full self-start shadow">
            <WrapperHeader>Order Summary</WrapperHeader>

            <div className="my-2">
                {
                    loadingCart?
                    [1, 2].map((cart, idx) => <CheckoutCardSkeleton key={idx}/> ):
                    checkoutdetails?.map((checkoutdetail, idx) => <CheckoutCard checkoutdetail={checkoutdetail} key={idx}/> )
                }
            </div>

            <div className="w-full">
                {
                    loadingCart ?
                    <Skeleton sx={{fontSize: 14}} width={100}/>:
                    <ul>
                        <li className="flex justify-between">
                            <span className="text-grey-200 text-sm">Subtotal</span>
                            <span className="text-primary-dark-blue font-medium">₦ {formatNumber(`${price?.sub_total}`)}</span>
                        </li>
                        {
                            price?.total_delivery_fee &&
                            <li className="flex justify-between">
                                <span className="text-grey-200 text-sm">Delivery Fee</span>
                                <span className="text-primary-dark-blue font-medium">₦ {formatNumber(`${price?.total_delivery_fee}`)}</span>
                            </li>
                        }
                        {
                            price?.vat &&
                            <li className="flex justify-between">
                                <span className="text-grey-200 text-sm">Vat</span>
                                <span className="text-primary-dark-blue font-medium">₦ {formatNumber(`${price?.vat}`)}</span>
                            </li>
                        }
                        
                        <li className="flex justify-between border-t mt-4 pt-2">
                            <span>Total</span>
                            <span className={`text-lg font-semibold text-primary-orange-200`}>₦ {formatNumber(`${price?.total}`)}</span>
                        </li>
                    </ul>
                }
                <div className="flex justify-center mt-3 w-full mx-auto">

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







// function CheckoutCardDummy(){
//     return(
//         <div className="w-full flex justify-between space-x-2 mb-2 sm:mb-4 p-2 border rounded">
//             <img src={TV} className="w-[75px] h-[75px] sm:w-[80px] sm:h-[80px] object-cover rounded-lg" />
//             <div className='flex flex-col'>
//                 <p className="text-sm text-grey-200">Anti Blue Computer & Phone Glasses....</p>

//                 <div className='flex flex-col'>
//                     <p className="font-medium text-primary-dark-blue ml-auto">₦ 4,600000</p>
//                     <small className="text-[14px] block ml-auto text-grey-700">x1</small>
//                 </div>
//             </div>
//         </div>
//     )
// }