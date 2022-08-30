import { useState } from "react"
import {
    Button, Categories, 
    CheckoutSummary, Header, 
    Switch, SelectInput, Toast,
    CreditCard, Body, FormInput, Breadcrumb
} from "../components"
import AddAddressModel from "../components/Models/AddAddressModel"

import { 
    CreditCardIcon, WalletIcon, 
    NairaIcon, BusIcon,
    ExclamationIcon
} from "../components/icons"
import { toggleAddAddress, toggleAddCreditcard } from "../redux/slice/modal"

import { useDispatch } from "react-redux"
import Slide from 'react-reveal/Slide';
import { useFormik } from "formik"
import * as Yup from 'yup'

import AddCreditCard from "../components/Models/AddCreditcard"



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
    let [activePaymentMethod, setActivePaymentMenthod] = useState(true)

    let [orderConfig, setOrderConfig] = useState({
        door: false,
        station: false,
        instant: false,
        card: true,
        wallet: false,
        installment: false
    })

    let dispatch = useDispatch()

    let initialValues = {
        amount: '',
        interval: ''
    }

    function onSubmit(value: typeof initialValues){
        console.log(value)
    }

    let validationSchema = () => {
        return Yup.object({
            amount: Yup.string().required('password field is required'),
            interval: Yup.string().required('email field is required'),
        })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return(
        <>
            <Header />
            <Categories />
            <Breadcrumb />
            <AddAddressModel />
            <AddCreditCard />

            <div className="flex px-6 gap-5 justify-between xl:px-fp-5 2xl:px-fp-10">
                <div className="w-8/12 flex flex-col gap-3">
                    <div className="bg-white rounded-xl py-6 px-8 border w-full">
                        <h3 className="text-lg text-primary-dark-blue font-semibold">Check Out</h3>

                        <div className="border rounded-xl p-5 mt-4">
                            <div className="flex  justify-between items-start">
                                <h3 className="text-primary-dark-blue font-medium mb-3">Delivery Address:</h3>
                                <div>
                                    <Button 
                                        outline 
                                        color="#FF5000"
                                        onClick={() => dispatch(toggleAddAddress())}>
                                            <p className="text-sm">Add Address</p>
                                    </Button>
                                </div>
                            </div>

                            {/* <div>
                                <h3 className="text-grey-200 font-medium mb-2">Mr John</h3>
                                <div className="text-grey-200 font-light">
                                    <p>Plot 101, Redeemed Road, Eagle Island</p>
                                    <p>Port Harcourt, Rivers State</p>
                                    <p>Nigeria.</p>
                                </div>
                            </div> */}

                            {/* empty address */}
                            <div className="flex flex-col justify-center w-5/12 mx-auto my-3">
                                <div className="mx-auto">
                                    <BusIcon line size="62" color="#E8E5FF"/>
                                </div>
                                <p className="text-center text-grey-700">
                                    You don’t have an address, kindly add your delivery address
                                </p>
                            </div>
                        </div>


                        <div className="border rounded-xl p-5 mt-4">
                            <h3 className="text-primary-dark-blue font-medium mb-2">Delivery Method</h3>

                            <div className="flex gap-4 items-center my-3">
                                <Switch
                                    label="Door Delivery"
                                    isTrue={orderConfig.door}
                                    handleClick={() => {
                                        setOrderConfig(state => {
                                            return {...state, door: !state.door}
                                        })

                                        setOrderConfig((state) => ({...state, station: false}))
                                    }} 
                                />
                                <Switch
                                    label="PickUp Station"
                                    isTrue={orderConfig.station}
                                    handleClick={() => {
                                        setOrderConfig((state) => ({...state, station: !state.station}))
                                        setOrderConfig(state => {
                                            return {...state, door: false}
                                        })
                                    }} 
                                />
                            </div>
                            {
                                orderConfig.door && 
                                (
                                    <div className="my-3">
                                        <p className="text-sm text-grey-200 font-light my-5">Your item(s) will be delivered to your delivery address, it might take about 48Hours to get to you</p>
                                        <p className="font-medium my-5">Delivery Cost:  <span>₦ 1,000</span></p>
                                    </div>
                                )
                            }
                            {
                                orderConfig.station &&
                                (
                                    <div>
                                        <p className="my-3 mt-5">Delivery Cost: Free</p>
                                        <div className="w-1/2">
                                            <SelectInput 
                                                label="Select Pick Up Station" 
                                                name="station" 
                                                onChange={(e) => console.log(e)}
                                                formik={formik}/>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border w-full">
                        <div className="border rounded-xl px-6 py-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-primary-dark-blue font-medium mb-2">Payment Method</h3>
                                <CreditCardIcon size="30" color="#555555" />
                            </div>

                            <div className="flex gap-4 items-center my-3">
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
                            {/* cash */}
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
                                    
                                    {/* cards */}
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

                                        {/* wallet */}
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
                                                            {/* <EmptyWallet type="card" /> */}
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
                            }
                        </div>
                    </div>
                </div>

                <div className="w-4/12">
                    <CheckoutSummary />
                </div>
            </div>
        </>
    )
}

export default CheckOut