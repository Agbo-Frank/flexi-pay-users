import Empty from "../../components/Empty"
import { CartIcon, TrashIcon } from "../../components/icons"

import DashboardWrapper from "../../components/DashboardWrapper"
import CheckoutSummary from "../../components/Checkout"
import { useState } from "react"
import Cart, { CartSkeleton } from "./cartCard"
import { useGetUserCartQuery } from "../../redux/api/Cart"
import { Wrapper, WrapperHeader } from "../../components"
import { Button, Skeleton, useMediaQuery } from "@mui/material"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../../utils/constants"
import { useNavigate } from "react-router-dom"


export function Carts (){
    const matches = useMediaQuery('(min-width:600px)');
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

    console.log(carts)
    return(
        <DashboardWrapper>
            {
                loadingCart ?
                <div className="flex justify-between space-x-5 w-full h-full shadow-sm">
                    <div className="bg-white rounded-xl py-6 border w-7/12">

                        <div className="flex justify-between mx-6">
                            <Skeleton sx={{fontSize: 18}} width={"30%"}/>

                            <div className="flex justify-between space-x-2 items-center w-3/12">
                                <Skeleton sx={{fontSize: 18}} width={"30%"}/>
                                <Skeleton sx={{fontSize: 16}} width={"70%"}/>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 w-full mt-8 mb-2 overflow-y-auto scrollbar h-fit">
                            {
                                [1, 2, 3].map((cart, idx) =>  <CartSkeleton/>)
                            }
                        </div>
                    </div>
                </div> :

                // carts && carts?.length > 0 
                true?
                <div className="sm:flex sm:justify-between sm:items-stretch sm:space-x-5 w-full h-full sm:h-fit">
                    <Wrapper styles="border">

                        <WrapperHeader styles="flex justify-between items-center">

                            <h3>Carts({carts?.length})</h3>

                            {
                                matches ?
                                <Button
                                    color="secondary"
                                    size={matches ? "medium" : "small"}
                                    startIcon={<TrashIcon color="#FF5000" size="16" />}>
                                        Empty Cart
                                </Button> :
                                <Button
                                    color="primary"
                                    size={matches ? "medium" : "small"}
                                    startIcon={<TrashIcon color="#FF5000" size="16" />}>
                                        Empty Cart
                                </Button>
                            }
                        </WrapperHeader>

                        <div className="flex flex-col space-y-3 sm:space-y-5 w-full mt-2 sm:mb-2 overflow-y-auto scrollbar h-full">
                            {
                                // carts?
                                [1, 2, 3].map((cart, idx) => <Cart 
                                // cart={cart} 
                                key={idx}/>)
                            }
                        </div>
                    </Wrapper>


                    <div className="hidden sm:block w-5/12 relative">
                        <CheckoutSummary />
                    </div> 
                </div> :
                <Wrapper>
                    <WrapperHeader>Cart(0)</WrapperHeader>
                    <Empty 
                        title="your cart is empty " 
                        Icon={CartIcon}
                        message="You currently don’t have any item in your cart, kindly to go shop and add item to your cart"
                        button={
                        <Button
                            startIcon={<CartIcon color="white" size="20"/>}
                            color="secondary"
                            size="large"
                            variant="contained"
                            onClick={() => navigate("/")}>
                                Start Shopping
                        </Button>
                    }/>
                </Wrapper>
            }
        </DashboardWrapper>
    )
}

export default Carts