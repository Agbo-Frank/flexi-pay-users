import { useRef, useState } from "react"
import {Button, CreditCard} from "../components"
import DashboardWrapper from "../components/DashboardWrapper"
import { EditSqaureIcon, WalletIcon, GroupIcon, CopyIcon, MasterCardIcon, TrashIcon, CreditCardIcon, WithdrawIcon } from "../components/icons"
import { WithdrawalForm } from "../components/Models"

import { useDispatch } from 'react-redux'
import { toggleWithdrawalForm } from "../redux/slice/modalSlice"


// function Card(){
//     return(
//         <div className="flex border p-5 border-grey-100 rounded-3xl flex-col w-1/2">
//             <div className="bg-grey-900 rounded-3xl p-5 leading-7">
//                 <p>23****53***3</p>
//                 <p>Mr John Doe</p>
//                 <div className="ml-auto w-fit">
//                     <MasterCardIcon size="32"/>
//                 </div>
//             </div>
//             <div className="flex items-center gap-2 pl-3 my-3 cursor-pointer">
//                 <TrashIcon size="14" color="#A0A0A1" />
//                 <p className="text-grey-700 text-sm">Remove</p>
//             </div>
//         </div>
//     )
// }

export function Wallet (){
    let dispatch = useDispatch()
    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)
    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }
    return(
        <DashboardWrapper>
            <WithdrawalForm />
            <div className="bg-white rounded-4xl p-6 mb-5">
                <h3 className="font-semibold text-primary-dark-blue">Saved Card</h3>
                <div className="flex justify-between items-stretch gap-5 mt-5">
                    <div className=" w-1/2 border gap-3 rounded-4xl text-center border-grey-100 flex flex-col justify-center p-6">
                        <p className="text-xs text-left text-grey-700 ">Wallet Id: Flexi12345678</p>
                        <div className="mx-auto">
                            <WalletIcon line color="#E8E5FF" size="60"/>
                        </div>
                        <p className="text-grey-700 text-xl">Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                        <p className="text-grey-700 text-sm">Click on the button below  to fund your wallet</p>
                        <div className="flex gap-4 items-center mx-auto my-4 w-full">
                            <Button color="#FF5000" outline onClick={() => dispatch(toggleWithdrawalForm())}>
                                <div className="flex justify-center items-center gap-3">
                                    <WithdrawIcon color="#FF5000" size="16"/>
                                    <p className="text-sm font-medium">Withdraw</p>
                                </div>
                            </Button>

                            <Button color="#FF5000">
                                <div className="flex justify-center items-center gap-3">
                                    <EditSqaureIcon color="white" size="16"/>
                                    <p className="text-sm font-medium">Fund Wallet</p>
                                </div>
                            </Button>
                        </div>
                    </div>

                    <div className=" w-1/2 gap-3 rounded-4xl text-center bg-grey-900 flex flex-col justify-center p-6">
                        <p className="text-xs text-right text-grey-700 ">Referred (0)</p>
                        <div className="mx-auto">
                            <GroupIcon color="#1900FE" size="60"/>
                        </div>
                        <p className="text-grey-700 text-xl">Referial Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                        <p className="text-grey-700 text-sm">
                            You haven’t refer anyone on FlexiPay, kindly use your referial link to 
                            refer your friend and start making money
                        </p>

                        <div className="flex items-center justify-center bg-white py-2 rounded-full">
                            <div className="w-10/12 overflow-x-auto scrollbar-hidden">
                                <p className="ml-5" ref={code}>flexipay.com/referiallink/mrjohn..flexipay.com/referiallink/mrjohn...</p>
                            </div>
                            <div className="">
                                <Button color="#FF5000" onClick={() => copy()}>
                                    <div className="flex justify-center items-center gap-1">
                                        <CopyIcon color="white" size="14"/>
                                        <p className="text-sm">{copied ? 'Copied!' : 'Copy'}</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-4xl p-6 mb-5">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-primary-dark-blue">Saved Cards</h3>
                    <div className="flex items-center gap-2 text-sm text-crimson font-medium">
                        <CreditCardIcon color="#FF5000" size="20" />
                        <p>Add New Card</p>
                    </div>
                </div>
                <div className="flex justify-between gap-4 mt-6 flex-nowrap w-full overflow-x-auto overflow-y-hidden scrollbar-hidden">
                    <div className="p-3 border border-grey-100 rounded-2xl ">
                        <CreditCard type="master" />
                    </div>
                    <div className="p-3 border border-grey-100 rounded-2xl">
                        <CreditCard type="visa" />
                    </div>
                    <div className="p-3 border border-grey-100 rounded-2xl ">
                        <CreditCard type="master" />
                    </div>
                    <div className="p-3 border border-grey-100 rounded-2xl">
                        <CreditCard type="visa" />
                    </div> 
                </div>
            </div>

            <div className="bg-white rounded-4xl p-6">
                <h3 className="font-semibold text-primary-dark-blue">Transaction History</h3>
            </div>
        </DashboardWrapper>
    )
}

export default Wallet 