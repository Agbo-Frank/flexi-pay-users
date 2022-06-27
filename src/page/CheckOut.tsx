import { useState } from "react"
import Body from "../components/Body"
import Button from "../components/Button"
import Categories from "../components/Categories"
import CheckoutSummary from "../components/Checkout"
import Header from "../components/Header"
import AddAddressModel from "../components/Models/AddAddressModel"
import Switch from "../components/Switch"

import { CreditCardIcon, WalletIcon, NoWalletIcon, MasterCardIcon, NoLocationIcon } from "../components/icons"
import SelectInput from "../components/SelectInput"
import { toggleAddAddress, toggleAddCreditcard } from "../redux/slice/modalSlice"

import { useDispatch } from "react-redux"
import AddCreditCard from "../components/Models/AddCreditcard"
import CreditCard from "../components/CreditCard"

export function CheckOut(){
    let [activePaymentMethod, setActivePaymentMenthod] = useState(true)

    let [orderConfig, setOrderConfig] = useState({
        door: false,
        station: false,
        instant: {
            isTrue: false,
            card: true,
            wallet: false
        },
        installment: false
    })

    let dispatch = useDispatch()

    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <Header />
                <Categories />
                <AddAddressModel />
                <AddCreditCard />

                <ul className="flex xl:px-fp-5 2xl:px-fp-10 my-6 text-sm">
                    <li className="text-grey-700">Home /</li> 
                    <li> Overview</li>
                </ul>

                <div className="flex px-6 gap-5 justify-between xl:px-fp-5 2xl:px-fp-10">
                    <div className="w-8/12 flex flex-col gap-3">
                        <div className="bg-white rounded-4xl py-6 px-8 border w-full">
                            <h3 className="text-lg text-primary-dark-blue font-semibold">Check Out</h3>

                            <div className="border rounded-4xl p-5 mt-4">
                                <div className="flex  justify-between items-start">
                                    <h3 className="text-primary-dark-blue font-medium mb-3">Delivery Address:</h3>
                                    <div>
                                        <Button 
                                            outline 
                                            color="#FF5000"
                                            onClick={() => dispatch(toggleAddAddress())}>
                                                Add Address
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
                                        <NoLocationIcon color="#A0A0A1" size="40" />
                                    </div>
                                    <p className="text-center text-grey-700">
                                        You don’t have an address, kindly add your delivery address
                                    </p>
                                </div>
                            </div>


                            <div className="border rounded-4xl p-5 mt-4">
                                <h3 className="text-primary-dark-blue font-medium mb-2">Delivery Method</h3>

                                <div className="flex gap-4 items-center my-3">
                                    <Switch
                                        label="Door Delivery"
                                        isTrue={orderConfig.door}
                                        handleClick={() =>setOrderConfig(state => {
                                            return {...state, door: !state.door}
                                        })} 
                                    />
                                    <Switch
                                        label="PickUp Station"
                                        isTrue={orderConfig.station}
                                        handleClick={() => setOrderConfig((state) => ({...state, station: !state.station}))} 
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
                                                <SelectInput label="Select Pick Up Station"/>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="bg-white rounded-4xl p-6 border w-full">
                            <div className="border rounded-4xl px-6 py-4">
                                <div className="flex justify-between">
                                    <h3 className="text-primary-dark-blue font-medium mb-2">Payment Method</h3>
                                    <CreditCardIcon size="30" color="#555555" />
                                </div>

                                <div className="flex gap-4 items-center my-3">
                                    <Switch
                                        label="Cash"
                                        isTrue={orderConfig.instant.isTrue}
                                        handleClick={() => setOrderConfig(state => ({
                                            ...state, 
                                            instant: {...state.instant, isTrue: !state.instant.isTrue}
                                        }))} 
                                    />
                                    <Switch
                                        label="Installmental"
                                        isTrue={orderConfig.installment}
                                        handleClick={() => setOrderConfig(state => ({
                                            ...state, 
                                            installment: !state.installment
                                        }))} 
                                    />
                                </div>

                                {
                                    orderConfig.instant.isTrue &&
                                    <div className="mt-10">
                                        <p>Complete Payment Using:</p>
                                        <div className="flex items-center my-3 w-96">
                                            <div 
                                            className="flex gap-2 items-center w-1/2 text-sm cursor-pointer hover:bg-grey-500 p-2"
                                            onClick={() => setOrderConfig(state => ({...state, instant: {...state.instant, card: true}}))}>
                                                <CreditCardIcon  size="16" color={orderConfig.instant.card ? '#1900FE' : "#8D8D8D"}/>
                                                <p className={`${orderConfig.instant.card ? 'text-primary-blue' : 'text-grey-300'}`}>Saved Card</p>
                                            </div>

                                            <div 
                                            className="flex gap-2 items-center text-sm w-1/2 cursor-pointer hover:bg-grey-500 p-2"
                                            onClick={() => setOrderConfig(state => ({...state, instant: {...state.instant, card: false}}))}>
                                                <WalletIcon  size="16" color={!orderConfig.instant.card ? '#1900FE' : "#8D8D8D"}/>
                                                <p className={`${!orderConfig.instant.card ? 'text-primary-blue' : 'text-grey-300'}`}>
                                                    Wallet
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* cards */}
                                        <>
                                            {/* 
                                                <div className="flex flex-col justify-center items-center bg-grey-900 rounded-4xl mb-4 mt-9 pt-12 pb-6">
                                                    <NoWalletIcon size="45" color="#E8E5FF"/>
                                                    <p className="text-center font-light text-grey-700 w-7/12">
                                                        You don’t have any saved card yet, 
                                                        kindly add and save new card
                                                    </p>
                                                    <p className="text-primary-orange-200 flex items-center gap-3 text-sm mt-5 cursor-pointer">
                                                        <WalletIcon color="#FF5000" size="17"/>
                                                        <span>Add New Card</span>
                                                    </p>
                                                </div>  
                                            */}
                                       
                                            {
                                                orderConfig.instant.card &&
                                                <div className="flex flex-col bg-grey-900 rounded-4xl mb-4 mt-9 p-5">
                                                    <div className="flex justify-between items-center">
                                                        <p>Your Cards</p>
                                                        <p className="text-primary-orange-200 flex items-center gap-3 text-sm cursor-pointer" 
                                                        onClick={() => dispatch(toggleAddCreditcard())}>
                                                                <CreditCardIcon color="#FF5000" size="17"/>
                                                                <span>Add New Card</span>
                                                        </p>
                                                    </div>

                                                    <CreditCard />
                                                    <Switch 
                                                        label="Save this card for future use" 
                                                        isTrue={activePaymentMethod} handleClick={() => setActivePaymentMenthod}
                                                    />
                                                </div> 
                                            }
                                        </>

                                            {/* wallet */}
                                        <>
                                        {
                                            !orderConfig.instant.card &&
                                            <div className="bg-grey-900 rounded-4xl mb-4 mt-9 p-5">
                                                <div className="flex justify-between items-center">
                                                    <p>Your Wallet</p>
                                                    <p className="text-primary-orange-200 flex items-center gap-3 text-sm cursor-pointer" 
                                                    onClick={() => dispatch(toggleAddCreditcard())}>
                                                        <WalletIcon color="#FF5000" size="17"/>
                                                        <span>Fund Wallet</span>
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 flex-col w-full border border-grey-100 rounded-4xl p-4 mt-7">
                                                    <p className="self-start text-grey-700 text-sm">Wallet ID: Flexi237</p>
                                                    {/* <>
                                                        <NoWalletIcon size="50" color="#E8E5FF"/>
                                                        <p className="text-md font-medium">Insufficient Fund</p>
                                                        {/* <p className="text-center font-light text-grey-700 w-7/12">
                                                            Your balance is lae
                                                        </p>
                                                        <p className="text-primary-orange-200 flex items-center gap-3 text-sm mt-5 cursor-pointer">
                                                            <span>View Balance</span>
                                                        </p>
                                                    </> */}

                                                        <p className="font-semibold text-700">Balance</p>
                                                        <p className="text-md font-medium text-primary-dark-blue">₦ 20, 000 - ₦ 10,000</p>
                                                        <p className="text-center font-light text-sm text-grey-700 w-7/12">
                                                            You will be deducted ₦ 10,900 from your wallet balance 
                                                        </p>
                                                </div>
                                                
                                            </div> 
                                        }
                                        </>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="w-4/12">
                        <CheckoutSummary />
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default CheckOut