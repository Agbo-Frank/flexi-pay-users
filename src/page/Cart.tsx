import Empty from "../components/Empty"
import {CartIcon, TrashIcon, MinusIcon, PlusIcon, BagIcon} from "../components/icons"

import TV from '../asset/monitor.png'
import Button from "../components/Button"
import DashboardWrapper from "../components/DashboardWrapper"
import CheckoutSummary from "../components/Checkout"
import { useState } from "react"

export function Cart(){
    let [rmColor, setRmColor] = useState("#A0A0A1")
    return(
        <div 
        className="flex justify-between shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 px-4 py-3 mx-6 rounded-xl">
            <div>
                <div className="flex space-x-3 items-stretch">
                    <img src={TV} className="w-36 h-36 rounded-xl object-contain"/>
                    <div className="w-7/12 flex flex-col justify-around">
                        <p className="text-grey-200 text-sm">Anti Blue Computer And Phone Glasses</p>
                        <small className="text-grey-200 text-sm font-medium">Qty: 1</small>
                        <p 
                        className="flex space-x-1 items-center text-grey-700 cursor-pointer hover:text-crimson" 
                        onMouseEnter={() => setRmColor('#FF5000')}
                        onMouseLeave={() => setRmColor("#A0A0A1")}>
                            <TrashIcon color={rmColor} size="14"/>
                            <p className="text-sm">Remove</p>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-end">
                <p className="font-medium ml-auto text-primary-dark-blue text-lg mb-4">₦ 3,300</p>
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

export function Carts (){
    return(
        <DashboardWrapper>
            <div className="flex justify-between space-x-5 w-full h-full">
                <div 
                    className="bg-white rounded-xl py-6 border w-7/12">

                    <div className="flex justify-between mx-6">
                        <h3 className="text-lg text-primary-dark-blue font-semibold">Carts(0)</h3>

                        <div className="flex justify-between space-x-2 items-center">
                            <TrashIcon color="#FF5000" size="16" />
                            <p className="text-primary-orange-200">Empty Cart</p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-5 w-full mt-8 mb-2 overflow-y-auto scrollbar h-screen">
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                    </div>
                    {/* <Empty name="cart" Icon={CartIcon}/> */}
                </div>


                <div className="w-5/12 relative">
                    <CheckoutSummary />
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Carts