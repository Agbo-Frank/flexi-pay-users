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
import { useGetUserCartQuery } from "../../redux/api/Cart"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../../utils/constants"
import { useProcessCheckoutMutation } from "../../redux/api/Order"
import AddressBook from "./Addressbook"



function EmptyWallet({type}: {type: 'wallet' | 'card'}){
    return(
        <div className="mx-auto flex flex-col justify-center text-center w-full gap-3">
            <div className="mx-auto">
                {
                    type === 'wallet' ?
                    <CreditCardIcon size="50" color="#E8E5FF" line/> :
                    <CreditCardIcon size="50" color="#E8E5FF" line/>
                }
            </div>
            <p className="text-md font-medium">{type === 'card' && 'Insufficient Fund'}</p>
            <p className="text-center font-light text-grey-700">
                {
                    type === 'wallet' ?
                    'Your balance is Low':
                    "You dont have any saved card yet, kindly add and save new card"
                }
            </p>
            
            {
                type === 'wallet' ?
                <span className="text-primary-orange-200 text-center text-sm mt-5 cursor-pointer">
                    View Balance
                </span> :
                <p className="text-primary-orange-200 flex items-center gap-3 text-sm mt-5 mx-auto cursor-pointer">
                    <WalletIcon color="#FF5000" size="17"/>
                    <span>Add New Card</span>
                </p>
            }
            
        </div>
    )
}

function Wallet() {
    return(
        <>
            {/* <EmptyWallet type="wallet" /> */}
            <div className="flex items-center gap-4 flex-col w-full">
                <p className="font-semibold text-700 text-center text-lg text-grey-700">Balance</p>
                <p className="text-xl font-medium text-primary-dark-blue text-center">₦ 20, 000 - ₦ 10,000</p>
                <p className="text-center font-light text-sm text-grey-700 w-7/12">
                    You will be deducted ₦ 10,900 from your wallet balance 
                </p>
            </div>
        </>
    )
}

// function SavedCard(){
//     return(
        
//     )
// }

export function CheckOut(){
    const matches = useMediaQuery('(min-width:600px)');
    const [open, setOpen] = useState({
        addressBook: false,
        createInstallment: false,
    })

    let [deliveryMethod, setDeliveryMethod] = useState()

    let dispatch = useDispatch()

    let [processCheckout, { isLoading, data, error, response }] = useProcessCheckoutMutation({
        selectFromResult: ({ data, error, isLoading }) => ({
            data: data?.result.data,
            error,
            isLoading,
            response: data
        })
    })

    useEffect(() => {
        processCheckout()
        if(response?.status === "failed"){
            dispatch(toggleSnackBar({
                open: true,
                message: response.message,
                severity: 'error'
            }))
        }
    }, [])
    console.log(data)
    console.log('error', error)

    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <Header />
            <Categories />
            <Breadcrumb />
            <AddCreditCard />
            <AddAddressModel />
            <AddressBook open={open.addressBook} close={() => setOpen(state => ({...state, addressBook: false}))}/>
            <CreateInstallment open={open.createInstallment} close={() => setOpen(state => ({...state, createInstallment: false}))}/>

            <div className="flex flex-col sm:flex-row sm:px-6 gap-5 justify-between xl:px-fp-5 2xl:px-fp-10">
                <div className="w-full sm:w-8/12 flex flex-col gap-3">
                    <Wrapper>
                        <WrapperHeader>Check Out</WrapperHeader>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <div className="flex  justify-between items-start">
                                <div className="space-x-2 flex items-center">
                                    <i className={`fa-solid fa-circle-check ${data?.address_details ? "text-[#6DBD28]" : "text-black/30"}`}></i>
                                    <h3 className="text-primary-dark-blue text-sm sm:text-base font-medium">Delivery Address:</h3>
                                </div>
                                
                                <div>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary"
                                        size={matches ? "medium" : "small"}
                                        onClick={() => dispatch(toggleAddAddress())}>
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


                        {/* <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <h3 className="text-primary-dark-blue text-sm sm:text-base font-medium mb-3">Delivery Method</h3>

                            <div>
                            <FormControl>
                                <RadioGroup
                                    name="delivery-method"
                                    // value={value}
                                    // onChange={handleChange}
                                >
                                    <FormControl>
                                        <FormControlLabel value="door_delivery" control={<Radio size="small"/>} label="Door Delivery"  />
                                        <div className="ml-5">
                                            <p className="text-sm text-grey-200 font-light mb-3 mt-1">Your item(s) will be delivered between  to your delivery address, it might take about 48Hours to get to you</p>
                                            <p className="font-medium mb-3 text-[15px]">Delivery Cost:  <span>₦ 1,000</span></p>
                                        </div>
                                    </FormControl>

                                    <FormControl>
                                        <FormControlLabel value="pickup" control={<Radio size="small"/>} label="PickUp Station" />
                                        <div className="ml-5">
                                            <p className="text-sm mb-3 mt-1">Cheaper Shipping Fees than Door Delivery</p>
                                            <div className="w-full sm:w-[300px] border rounded-md p-2">
                                                <select className="w-full">
                                                    <option>Port Harcout</option>
                                                    <option>Port Harcout</option>
                                                    <option>Port Harcout</option>
                                                </select>
                                            </div>
                                        </div>
                                    </FormControl>
                                </RadioGroup>
                            </FormControl>
                            </div>
                        </div> */}

                        {
                            data?.address_details &&
                            <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                                <div className="">
                                    <p className="text-sm text-grey-200 font-light mb-3 mt-1">Your item(s) will be delivered between  to your delivery address, it might take about 48Hours to get to you</p>
                                    <p className="font-medium mb-3 text-[15px]">Delivery Cost:  <span>₦ 1,000</span></p>
                                </div>
                            </div>
                        }
                    </Wrapper>

                    <Wrapper>
                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <div className="space-x-2 flex items-center">
                                <i className={`fa-solid fa-circle-check ${data?.address_details ? "text-[#6DBD28]" : "text-black/30"}`}></i>
                                <h3 className="text-primary-dark-blue text-sm sm:text-base font-medium">Shippment Details</h3>
                            </div>

                            {/* <ul>
                                {
                                    data?.details.map()
                                }
                            </ul> */}
                            
                        </div>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <p className="text-primary-dark-blue text-sm sm:text-base font-medium mb-3">Confirm Order</p>
                            
                            <ul>
                                <li className="flex justify-between items-center font-medium py-2">
                                    <span>Subtotal</span>
                                    <span>₦ 4,600000</span>
                                </li>
                                <li className="flex justify-between items-center font-medium py-3 border-t mt-2">
                                    <span>Total</span>
                                    <span className={`text-[18px] font-semibold ${data?.address_details ? "text-primary-orange-200" : "text-grey-700"} `}>₦ 4,600000</span>
                                </li>
                            </ul>

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={data?.address_details ? false : true}>
                                    confirm order
                            </Button>
                        </div>

                        <div className="shadow sm:shadow-none sm:border rounded-lg p-3 mt-2 sm:mt-4 bg-white">
                            <WrapperHeader styles="flex justify-between items-center">
                                <p className="text-primary-dark-blue text-sm sm:text-base font-medium mb-3">Payment Method</p>
                                <CreditCardIcon size={matches ? "25" : "18"} color="#555555" />
                            </WrapperHeader>

                            <FormControl>
                                <RadioGroup
                                    name="payment method"
                                    // value={value}
                                    // onChange={handleChange}
                                >
                                    <FormControlLabel value="cash_on_delivery" control={<Radio size="small"/>} label="Cash On Delivery" />
                                    <FormControlLabel value="wallet" control={<Radio size="small"/>} label="Flexipay Wallet" />
                                    <FormControlLabel 
                                        value="installment" 
                                        control={<Radio 
                                            size="small"
                                            onChange={(e) => setOpen(state => ({...state, createInstallment: e.target.checked}))}/>} 
                                        label="By Installment" />
                                </RadioGroup>
                            </FormControl>
                            
                        </div>
                    </Wrapper>
                </div>

                <div className="hidden sm:block w-full sm:w-4/12">
                    <CheckoutSummary />
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