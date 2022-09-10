import { useEffect, useRef, useState } from "react"
import {Button, CreditCard, Wrapper, WrapperHeader} from "../../components"
import DashboardWrapper from "../../components/DashboardWrapper"
import {  GroupIcon, CopyIcon, MasterCardIcon, TrashIcon, CreditCardIcon, WithdrawIcon, MarkCircleIcon } from "../../components/icons"
import { WithdrawalForm } from "../../components/Models"

import { Button as MuiButton, Skeleton } from "@mui/material"

import { useDispatch } from 'react-redux'

import { CreateAccForm } from "./createAccForm"
import FundWallet from "./FundWallet"
import { useSearchParams } from "react-router-dom"
import { WalletTransaction } from "./WalletTransaction"
import { toggleSnackBar } from "../../redux/slice/modal"
import { useGetUserQuery } from "../../redux/api/User"
import { WalletBalance } from "./WalletBalance"
import useMediaQuery from '@mui/material/useMediaQuery';


export function Wallet (){
    const matches = useMediaQuery('(min-width:600px)'); 
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
            <div>
            <Wrapper>
                <WrapperHeader>Wallet</WrapperHeader>
                <div className="flex flex-col sm:flex-row items-stretch space-y-3 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-4">
                    
                    <WalletBalance open={open} setOpen={setOpen}/>

                    <div className="w-full sm:w-1/2 rounded-xl text-center bg-white sm:bg-grey-900 flex flex-col justify-center py-3 px-2 sm:p-6">
                        <p className="text-xs text-right text-grey-700 ">Referred (0)</p>
                        <div className="flex justify-center">
                            <GroupIcon color="#000541" size={matches ? "60" : "45"}/>
                        </div>
                        <p className="text-grey-700 text-xl">Referial Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                        <p className="text-grey-700 text-sm">
                            You haven’t refer anyone on FlexiPay, kindly use your referial link to 
                            refer your friend and start making money
                        </p>

                        <div className="flex items-center w-9/12 mx-auto my-1 justify-center bg-white py-1 rounded-lg">
                            <div className="w-10/12 overflow-x-auto whitespace-nowrap scrollbar-hidden">
                                <p className="ml-5 text-sm" ref={code}>{data?.result?.data.referral_link}</p>
                            </div>
                            <div className="">
                                <MuiButton 
                                    color="secondary" 
                                    onClick={copy}
                                    variant="contained"
                                    size="small"
                                    startIcon={copied ?<MarkCircleIcon color="white" size="16"/> :<CopyIcon color="white" size="14"/>}>
                                        {copied ? 'Copied!' : 'Copy'}
                                </MuiButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            </div>

            <div>
                <Wrapper styles="rounded-b-none">
                    <WrapperHeader>Wallet History</WrapperHeader>
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