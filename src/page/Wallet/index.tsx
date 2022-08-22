import { useEffect, useRef, useState } from "react"
import {Button, CreditCard, Wrapper, WrapperHeader} from "../../components"
import DashboardWrapper from "../../components/DashboardWrapper"
import { EditSqaureIcon, WalletIcon, GroupIcon, CopyIcon, MasterCardIcon, TrashIcon, CreditCardIcon, WithdrawIcon, MarkCircleIcon } from "../../components/icons"
import { WithdrawalForm } from "../../components/Models"

import { Button as MuiButton, Skeleton } from "@mui/material"

import { useDispatch } from 'react-redux'

import { CreateAccForm } from "./createAccForm"
import FundWallet from "./FundWallet"
import { useSearchParams } from "react-router-dom"
import { WalletTransaction } from "./WalletTransaction"
import { toggleSnackBar } from "../../redux/slice/modal"
import { useGetUserQuery } from "../../redux/slice/User"
import { WalletBalance } from "./WalletBalance"


export function Wallet (){
    let [searchParams, setSearchParams] = useSearchParams();
    let [transactionFeedBack, setTransactionFeedBack] = useState(searchParams.get('status'))

    let [open, setOpen] = useState({
        createAccForm: false,
        fundWallet: false
    })

    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)
    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }

    let dispatch = useDispatch()

    useEffect(() => {
        if(transactionFeedBack === 'successful'){
            dispatch(toggleSnackBar({
                open: true,
                message: "Transaction was Successful",
                severity: 'success'
            }))
        }
        if(transactionFeedBack === 'cancelled'){
            dispatch(toggleSnackBar({
                open: true,
                message: "Transaction was " + transactionFeedBack,
                severity: 'error'
            }))
        }
        setSearchParams('');
    }, [transactionFeedBack])

    let {data, isLoading: loading} = useGetUserQuery()

    return(
        <DashboardWrapper>
            <WithdrawalForm />
            {open.fundWallet && <FundWallet open={open.fundWallet} close={() => setOpen(state => ({...state, fundWallet: false}))}/>}
            {open.createAccForm && <CreateAccForm userData={data?.result?.data} open={open.createAccForm} close={() => setOpen(state => ({...state, createAccForm: false}))}/>}
            <div className="bg-white rounded-xl p-6 mb-5">
                <h3 className="font-semibold text-primary-dark-blue">Saved Card</h3>
                <div className="flex justify-between items-stretch space-x-5 mt-5">
                    
                    <WalletBalance open={open} setOpen={setOpen}/>

                    <div className=" w-1/2 space-x-3 rounded-xl text-center bg-grey-900 flex flex-col justify-center p-6">
                        <p className="text-xs text-right text-grey-700 ">Referred (0)</p>
                        <div className="flex justify-center">
                            <GroupIcon color="#1900FE" size="60"/>
                        </div>
                        <p className="text-grey-700 text-xl">Referial Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                        <p className="text-grey-700 text-sm">
                            You haven’t refer anyone on FlexiPay, kindly use your referial link to 
                            refer your friend and start making money
                        </p>

                        <div className="flex items-center justify-center bg-white py-2 rounded-full">
                            <div className="w-10/12 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                                <p className="ml-5" ref={code}>{data?.result?.data.referral_link}</p>
                            </div>
                            <div className="">
                                <Button color="#FF5000" onClick={() => copy()}>
                                    <div className="flex justify-center items-center space-x-1">
                                        {copied ?<MarkCircleIcon color="white" size="16"/> :<CopyIcon color="white" size="14"/>}
                                        <p className="text-sm">{copied ? 'Copied!' : 'Copy'}</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Wrapper styles="rounded-b-none">
                    <WrapperHeader>Transaction History</WrapperHeader>
                </Wrapper>
                <WalletTransaction />
            </div>
        </DashboardWrapper>
    )
}

export default Wallet 




{/* <div className="bg-white rounded-xl p-6 mb-5">
                <div className="flex justify-between">
                    <h3 className="font-semibold text-primary-dark-blue">Saved Cards</h3>
                    <div className="flex items-center space-x-2 text-sm text-crimson font-medium">
                        <CreditCardIcon color="#FF5000" size="20" />
                        <p>Add New Card</p>
                    </div>
                </div>
                <div className="flex justify-between space-x-4 mt-6 flex-nowrap w-full overflow-x-auto overflow-y-hidden scrollbar-hidden">
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
            </div> */}