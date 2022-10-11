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
import UserTransaction from "./UserTransaction"
import ReferralBalance from "./ReferralBalnce"


export function Wallet (){
    const matches = useMediaQuery('(min-width:600px)'); 
    let [searchParams, setSearchParams] = useSearchParams();
    let [transactionFeedBack, setTransactionFeedBack] = useState(searchParams.get('status'))
    let [tab, setTab] = useState(0)

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
            {
                open.createAccForm && <CreateAccForm 
                    userData={data?.result?.data} 
                    open={open.createAccForm} 
                    close={() => setOpen(state => ({...state, createAccForm: false}))}
                />
            }
            <div className="mb-3 sm:mb-5">
                <Wrapper>
                    <WrapperHeader>Wallet</WrapperHeader>
                    <div className="flex flex-col sm:flex-row items-stretch space-y-3 sm:space-y-0 sm:space-x-3 mt-2 sm:mt-4">
                        
                        <div className="sm:w-1/2 h-full">
                            <WalletBalance open={open} setOpen={setOpen}/>
                        </div>
                        <div className="sm:w-1/2 h-full">
                            <ReferralBalance open={open} setOpen={setOpen}/>
                        </div>
                        
                        
                        {/* <div className="w-full sm:w-1/2 rounded-xl text-center bg-white sm:bg-grey-900 flex flex-col justify-center py-3 px-2 sm:p-6">
                            <p className="text-xs text-right text-grey-700 ">Referred (0)</p>
                            <div className="flex justify-center">
                                <GroupIcon color="#000541" size={matches ? "48" : "35"}/>
                            </div>
                            <p className="text-grey-700 text-xl">Referial Balance</p>
                            <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                            <p className="text-grey-700 text-sm">
                                Use your referial link to refer your friend and start making money
                            </p>

                            <div className="flex items-center gap-4 my-1 justify-between">
                                <div className="w-1/2">
                                    <p className="hidden" ref={code}>{data?.result?.data.referral_link}</p>
                                    <MuiButton 
                                        color="secondary" 
                                        onClick={copy}
                                        variant="outlined"
                                        fullWidth
                                        startIcon={copied ?<MarkCircleIcon color="#FF5000" size="16"/> :<CopyIcon color="#FF5000" size="14"/>}>
                                            { copied ? 'Copied!' : 'Copy' }
                                    </MuiButton>
                                </div>
                                <div className="w-1/2">
                                    <MuiButton 
                                        color="secondary" 
                                        onClick={copy}
                                        variant="contained"
                                        fullWidth
                                        startIcon={<WithdrawIcon color="white" size="16"/>}>
                                            Withdraw
                                    </MuiButton>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </Wrapper>
            </div>

            <div>
                <div className="flex bg-white rounded-t-lg">
                    <div 
                    className={` mb-2 ${tab === 0 ? 'text-primary-dark-blue border-primary-dark-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200'} font-medium border-solid text-sm sm:text-base  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                    onClick={() => setTab(0)}>Wallet Transaction</div>
                    <div 
                    className={`text-right mb-2 ${tab === 1 ? 'text-primary-dark-blue border-primary-dark-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200 '} font-medium text-sm sm:text-base hover:bg-gray-100 py-3 px-2 cursor-pointer`}
                    onClick={() => setTab(1)}>User Transaction</div>
                </div>
                {
                    tab === 0 ?
                    <WalletTransaction open={open} setOpen={setOpen}/>:
                    <UserTransaction open={open} setOpen={setOpen}/>
                }
                
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