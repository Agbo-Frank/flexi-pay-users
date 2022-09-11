import { useEffect, useState } from "react"
import {
    Categories, 
    CheckoutSummary, Header,
     Body, Breadcrumb, Wrapper, WrapperHeader
} from "../../components"

import { 
    BusIcon,
    CreditCardIcon, WalletIcon,
} from "../../components/icons"
import { toggleAddAddress, toggleSnackBar, } from "../../redux/slice/modal"

import { useDispatch } from "react-redux"

import AddCreditCard from "../../components/Models/AddCreditcard"
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Skeleton, useMediaQuery } from "@mui/material"
import AddAddressModel from "../../components/Models/AddAddressModel"
import CreateInstallment from "./createInstallment"
import { useGetUserCartQuery, useLazyGetUserCartQuery } from "../../redux/api/Cart"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../../utils/constants"
import { useCheckoutMutation, useProcessCheckoutMutation } from "../../redux/api/Order"
import AddressBook from "./Addressbook"
import { formatNumber } from "../../utils"
import moment from "moment"
import { ICart, IDetails, TCheckoutMethod } from "../../interface"
import PaymentMethod from "./paymentMethod"
import { confirmOrder } from "./service"
import { LoadingButton } from "@mui/lab"




// function SavedCard(){
//     return(
        
//     )
// }

export function CheckOut(){
    const matches = useMediaQuery('(min-width:600px)');
    let [checkoutMethod, setCheckoutMethod] = useState<TCheckoutMethod>("")
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);
    const [open, setOpen] = useState({
        addressBook: false,
        createInstallment: false,
    })

    let [processCheckout, { isLoading, data, error, response }] = useProcessCheckoutMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            data: data?.result.data,
            error,
            isLoading,
            response: data
        })
    })

    let [getUserCart, {carts, loadingCart}] = useLazyGetUserCartQuery({
        selectFromResult: ({data, isLoading}) => ({
            carts: data?.result.data,
            loadingCart: isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    let [checkout, { isLoading: checkingout }] = useCheckoutMutation()

    let [price, setPrice] = useState<{sub_total: number, total_delivery_fee: number | null, total: number, vat: number | null}>({
        sub_total: 0,
        total_delivery_fee: 0,
        vat: 0,
        total: 0
    })
    let [checkoutdetails, setCheckoutdetails] = useState<Partial<IDetails>[]>()

    let dispatch = useDispatch()
    

    useEffect(() => {
        processCheckout()
            .unwrap()
            .then(res => {
                let data = res.result.data
                if(!data?.address_details){
                    getUserCart({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""})
                        .unwrap()
                        .then(data => {
                            // data.result.data.
                            let sub_total = data.result.data?.reduce((total, cart) => {
                                return total + (parseFloat(cart?.quantity) * parseFloat(cart?.price))
                            }, 0) || 0
                            setPrice({
                                sub_total, 
                                total_delivery_fee: null,
                                total: sub_total,
                                vat: null
                            })
                            setCheckoutdetails({...data.result.data})
                        })
                }
                else{
                    setPrice({
                        sub_total: data.sub_total, 
                        total_delivery_fee: data.total_delivery_fee,
                        total: data.total,
                        vat: data.vat
                    })
                    // let products = data.details.map(detail => detail.product)
                    setCheckoutdetails(data.details)
                }
            })
        if(response?.status === "failed"){
            dispatch(toggleSnackBar({
                open: true,
                message: response.message,
                severity: 'error'
            }))
        }
    }, [])

    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <Header />
            <Categories />
            <Breadcrumb />
            <AddCreditCard />
            <AddAddressModel />
            {/* <AddressBook 
                open={open.addressBook} 
                close={() => setOpen(state => ({...state, addressBook: false}))}
                addresses={data?.address_details}/> */}
            <CreateInstallment open={open.createInstallment} close={() => setOpen(state => ({...state, createInstallment: false}))}/>

            <div className="flex flex-col sm:flex-row sm:px-6 gap-5 justify-between xl:px-fp-5 2xl:px-fp-10">
                <div className="w-full sm:w-8/12 flex flex-col gap-3">
                    <Wrapper>
                        <WrapperHeader>Check Out</WrapperHeader>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <div className="flex  justify-between items-start">
                                <div className="space-x-2 flex items-center">
                                    {/* <i className={`fa-solid fa-circle-check ${data?.address_details ? "text-[#6DBD28]" : "text-black/30"}`}></i> */}
                                    <h3 className="text-primary-dark-blue text-sm sm:text-base font-medium">Delivery Address:</h3>
                                </div>
                                
                                <div>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary"
                                        size={matches ? "medium" : "small"}
                                        onClick={() => {
                                            // setOpen(state => ({...state, addressBook: true}))
                                            dispatch(toggleAddAddress())
                                        }}>
                                            {data?.address_details ? "Change Address" :  "Add Address"}
                                    </Button>
                                </div>
                            </div>

                            {
                                isLoading ?
                                <>
                                    <Skeleton variant="text" width={"92%"} height={20}/>
                                    <Skeleton variant="text" width={"75%"}  height={20}/>
                                    <Skeleton variant="text" width={"58%"}  height={20}/>
                                </> :
                                data?.address_details ?
                                <div>
                                    <h3 className="text-grey-200 font-medium mb-2 text-sm">{data?.address_details.name}</h3>
                                    <div className="text-grey-200 font-light text-sm">
                                        <p>{data?.address_details.house_address + ", " +  data?.address_details.nearest_bus_stop }</p>
                                        <p>{data?.address_details.city + ", " + data?.address_details.state}</p>
                                        <p>{data.address_details.phone_number}</p>
                                        {/* <p>{Nigeria.}</p> */}
                                    </div>
                                </div>:
                                <div className="flex flex-col justify-center w-11/12 sm:w-6/12 mx-auto my-3">
                                    <div className="mx-auto">
                                        <BusIcon line size={"62"} color="#E8E5FF"/>
                                    </div>
                                    <p className="text-center text-sm text-grey-700">
                                        You don’t have an address, kindly add your delivery address
                                    </p>
                                </div>
                            }
                        </div>

                        {
                            data?.address_details &&
                            <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                                <div className="">
                                    <p className="text-sm text-grey-200 font-light mb-3 mt-1">
                                        Your item(s) will be delivered on <span className="font-medium">{ data.details[0].delivery_period } </span>
                                    </p>
                                    <p className="font-medium mb-3 text-[15px]">Delivery Cost:  <span>₦ {formatNumber(data.total_delivery_fee)}</span></p>
                                </div>
                            </div>
                        }
                    </Wrapper>

                    <Wrapper>
                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <div className="space-x-2 flex items-center">
                                {/* <i className={`fa-solid fa-circle-check ${data?.address_details ? "text-[#6DBD28]" : "text-black/30"}`}></i> */}
                                <h3 className="text-primary-dark-blue text-sm sm:text-base font-medium">Shippment Details</h3>
                            </div>

                            <ul className="text-grey-200 font-light text-sm my-3 ml-5">
                                {
                                    checkoutdetails?.map((detail, idx) => (
                                        <li key={idx} className="space-x-4">
                                            <span>{ detail.quantity }x</span>
                                            <span>{detail.product?.name}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                            
                            {
                                data?.address_details && 
                                <p className="text-grey-200 font-light text-sm">To be Delivered on <span className="font-medium">{data?.details[0].delivery_period}</span> </p>
                            }
                            
                        </div>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <WrapperHeader styles="flex justify-between items-center">
                                <p className="text-primary-dark-blue text-sm sm:text-base font-medium mb-3">Payment Method</p>
                                <CreditCardIcon size={matches ? "25" : "18"} color="#555555" />
                            </WrapperHeader>

                            <PaymentMethod setCheckoutMethod={setCheckoutMethod}/>
                        </div>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <p className="text-primary-dark-blue text-sm sm:text-base font-medium mb-3">Confirm Order</p>
                            
                            <ul>
                                <li className="flex justify-between items-center font-medium py-2">
                                    <span>Subtotal</span>
                                    <span>₦ {formatNumber(`${price?.sub_total}`)}</span>
                                </li>
                                {
                                    price?.total_delivery_fee &&
                                    <li className="flex justify-between items-center font-medium py-2">
                                        <span>Delivery Fee</span>
                                        <span>₦ {formatNumber(`${price?.total_delivery_fee}`)}</span>
                                    </li>
                                }
                                {
                                    price?.vat &&
                                    <li className="flex justify-between items-center font-medium py-2">
                                        <span>Vat</span>
                                        <span>₦ {formatNumber(`${price?.vat}`)}</span>
                                    </li>
                                }
                                
                                <li className="flex justify-between items-center font-medium py-3 border-t mt-2">
                                    <span>Total</span>
                                    <span className={`text-[18px] font-semibold ${data?.address_details ? "text-primary-orange-200" : "text-grey-700"} `}>₦ {formatNumber(`${price?.total}`)}</span>
                                </li>
                            </ul>

                            <LoadingButton
                                fullWidth
                                variant="contained"
                                color="secondary"
                                loading={checkingout}
                                disabled={data?.address_details ? false : true}
                                onClick={() => confirmOrder(checkoutMethod, dispatch, checkout)}>
                                    confirm order
                            </LoadingButton>
                        </div>

                        
                    </Wrapper>
                </div>

                <div className="hidden sm:block w-full sm:w-4/12">
                    <CheckoutSummary checkoutdetails={checkoutdetails} price={price}/>
                </div>
            </div>
        </Body>
    )
}

export default CheckOut





{/* <div className="flex gap-4 items-center my-3">
    <Switch
        label="Cash"
        isTrue={orderConfig.instant}
        handleClick={() => { 
            setOrderConfig(state => ({
                ...state, 
                instant: !state.instant
            }))

            setOrderConfig(state => ({
                ...state, 
                installment: false
            }))
        }} 
    />
    <Switch
        label="Installmental"
        isTrue={orderConfig.installment}
        handleClick={() => {
            setOrderConfig(state => ({
                ...state, 
                installment: !state.installment
            }))
            setOrderConfig(state => ({
                ...state, 
                instant: false
            }))
        }} 
    />
</div>
{
    orderConfig.instant &&
    <div className="mt-10">
        <p>Complete Payment Using:</p>
        <div className="flex items-center my-3 w-96">
            <div 
            className="flex gap-2 items-center w-1/2 text-sm cursor-pointer hover:bg-grey-500 p-2"
            onClick={() => setOrderConfig(state => ({...state, card: true}))}>
                <CreditCardIcon  size="16" color={orderConfig.card ? '#1900FE' : "#8D8D8D"}/>
                <p className={`${orderConfig.card ? 'text-primary-blue' : 'text-grey-300'}`}>Saved Card</p>
            </div>

            <div 
            className="flex gap-2 items-center text-sm w-1/2 cursor-pointer hover:bg-grey-500 p-2"
            onClick={() => setOrderConfig(state => ({...state, card: false}))}>
                <WalletIcon  size="16" color={!orderConfig.card ? '#1900FE' : "#8D8D8D"}/>
                <p className={`${!orderConfig.card ? 'text-primary-blue' : 'text-grey-300'}`}>
                    Wallet
                </p>
            </div>
        </div>
        
        {/* cards 
        <>
            {
                orderConfig.card &&
                <Slide right duration={1000} opposite when={orderConfig.card}>
                    <div className="flex flex-col bg-grey-900 rounded-xl mb-4 mt-9 p-5">
                        <div className="flex justify-between items-center">
                            <p>Your Cards</p>
                            <p className="text-primary-orange-200 flex items-center gap-3 text-sm cursor-pointer" 
                            onClick={() => dispatch(toggleAddCreditcard())}>
                                    <CreditCardIcon color="#FF5000" size="17"/>
                                    <span>Add New Card</span>
                            </p>
                        </div>
                        <div className="my-5">
                            <CreditCard type="master" hasBorder/>
                        </div>
                        
                        <Switch 
                            label="Save this card for future use" 
                            isTrue={activePaymentMethod} handleClick={() => setActivePaymentMenthod}
                        />
                    </div> 
                </Slide>
            }
        </>

            {/* wallet 
        <>
        {
            !orderConfig.card &&
            <Slide right opposite duration={1000} when={!orderConfig.card}>
                <div className="bg-grey-900 rounded-xl mb-4 mt-9 p-5">
                    <div className="flex justify-between items-center">
                        <p>Your Wallet</p>
                        <p className="text-primary-orange-200 flex items-center gap-3 text-sm cursor-pointer" 
                        onClick={() => dispatch(toggleAddCreditcard())}>
                            <WalletIcon color="#FF5000" size="17"/>
                            <span>Fund Wallet</span>
                        </p>
                    </div>

                    <div className="border border-grey-100 rounded-xl p-4 mt-7">
                        <p className="self-start text-grey-700 text-sm">Wallet ID: Flexi237</p>
                        <div className="my-5"><Wallet /></div>
                    </div>
                    
                </div> 
            </Slide>
        }
        </>
    </div>
}

{
    orderConfig.installment &&
    <div className="mt-10">
        <p>Create your installment plan:</p>

        <div className="flex flex-col bg-grey-900 rounded-xl mb-4 mt-9 p-5">
            <div>
                <p className="mb-3">Enter amount to be deducted and the interval</p>

                <form onSubmit={formik.handleSubmit} className="border rounded-xl border-grey-100 px-7 pt-7 pb-3 flex justify-between gap-4">
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount" 
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount" 
                        Icon={NairaIcon}
                        formik={formik}
                    />
                </form>
            </div>

            <div className="mt-10">
                <p className="mb-3">Select Payment Method</p>

                <div className="border rounded-xl border-grey-100 py-4 px-3">
                    <div className="flex items-center w-96">
                        <div 
                        className="flex gap-2 items-center w-1/2 text-sm cursor-pointer hover:bg-grey-500 p-2"
                        onClick={() => setOrderConfig(state => ({...state, card: true}))}>
                            <CreditCardIcon  size="16" color={orderConfig.card ? '#1900FE' : "#8D8D8D"}/>
                            <p className={`${orderConfig.card ? 'text-primary-blue' : 'text-grey-300'}`}>Saved Card</p>
                        </div>

                        <div 
                        className="flex gap-2 items-center text-sm w-1/2 cursor-pointer hover:bg-grey-500 p-2"
                        onClick={() => setOrderConfig(state => ({...state, card: false}))}>
                            <WalletIcon  size="16" color={!orderConfig.card ? '#1900FE' : "#8D8D8D"}/>
                            <p className={`${!orderConfig.card ? 'text-primary-blue' : 'text-grey-300'}`}>
                                Wallet
                            </p>
                        </div>
                    </div>

                    {
                        orderConfig.card ?
                        <>
                            <div>
                                {/* <EmptyWallet type="card" /> 
                                <div className="my-5">
                                    <CreditCard type="visa" hasBorder/>
                                </div>
                                <div className="my-5">
                                    <CreditCard type="master" hasBorder/>
                                </div>
                                <div className="flex rounded-md py-2 bg-primary-orange-400 px-3 pr-5 gap-2 w-fit">
                                    <ExclamationIcon color="#E78405" size="15" />
                                    <p className="text-primary-orange-100 text-xs">Your card will be debited  ₦ 500 on a daily basis as set</p>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="my-8">
                                <Wallet />
                            </div>
                        </>
                    }
                    
                </div>
            </div>
        </div> 
    </div>
} */}