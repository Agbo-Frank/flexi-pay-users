import { useRef, useState } from "react"
import {Button, CreditCard} from "../../components"
import DashboardWrapper from "../../components/DashboardWrapper"
import { EditSqaureIcon, WalletIcon, GroupIcon, CopyIcon, MasterCardIcon, TrashIcon, CreditCardIcon, WithdrawIcon, MarkCircleIcon } from "../../components/icons"
import { WithdrawalForm } from "../../components/Models"

import { Button as MuiButton, Skeleton } from "@mui/material"

import { useDispatch } from 'react-redux'
import { toggleWithdrawalForm } from "../../redux/slice/modalSlice"

import { useGetUserQuery } from "../../redux/slice/User";
import { CreateAccForm } from "./createAccForm"
import FundWallet from "./FundWallet"


export function Wallet (){
    let [openFundWallet, setOpenFundWallet] = useState(false)
    let [openCreateAccForm, setOpenCreateAccForm] = useState(false)
    let dispatch = useDispatch()

    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)
    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }

    let {data, isLoading: loading} = useGetUserQuery()
    console.log(data)
    return(
        <DashboardWrapper>
            <WithdrawalForm />
            <FundWallet open={openFundWallet} close={() => setOpenFundWallet(false)}/>
            <CreateAccForm userData={data?.result?.data} open={openCreateAccForm} close={() => setOpenCreateAccForm(false)}/>
            <div className="bg-white rounded-xl p-6 mb-5">
                <h3 className="font-semibold text-primary-dark-blue">Saved Card</h3>
                <div className="flex justify-between items-stretch space-x-5 mt-5">
                    <div className="w-1/2 border rounded-xl text-center border-grey-100 flex flex-col justify-center px-4">
                        {
                            loading ? 
                            <>
                                <Skeleton height={15} width="40%"/>
                                <div className="flex justify-center">
                                    <Skeleton height={50} width={50} variant="rounded" />
                                </div>
                                <Skeleton height={20} width="50%" className="mx-auto"/>
                                <Skeleton height={25} width="35%" className="mx-auto"/>
                                <Skeleton height={15} width="95%" className="mx-auto"/>
                                <div className="flex justify-between space-x-4 w-11/12 mx-auto">
                                    <Skeleton height={40} variant="rounded" width="50%"/>
                                    <Skeleton height={40} variant="rounded" width="50%"/>
                                </div>
                            </>
                            :
                             data?.result?.data.reserved_account?.account_number.length === 0 ? 
                                <>
                                    <MuiButton 
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => setOpenCreateAccForm(true)}
                                    >
                                        Get your account now
                                    </MuiButton>
                                </>:
                                <>
                                    <p className="text-xs text-left text-grey-700 ">Wallet Id: {data?.result?.data.reserved_account?.account_number}</p>
                                    <div className="flex justify-center">
                                        <WalletIcon line color="#E8E5FF" size="60"/>
                                    </div>
                                    <p className="text-grey-700 text-lg">Balance</p>
                                    <p className="text-primary-dark-blue font-semibold text-xl">₦ 0.00 </p>
                                    <p className="text-grey-700 text-sm">Click on the button below  to fund your wallet</p>
                                    <div className="flex justify-center space-x-4 items-center mx-auto my-4 w-full">
                                        <MuiButton
                                            color="secondary"
                                            variant="outlined"
                                            startIcon={<WithdrawIcon color="#FF5000" size="16"/>}
                                            onClick={() => dispatch(toggleWithdrawalForm())}
                                            size="large"
                                        >
                                            Withdraw
                                        </MuiButton>

                                        <MuiButton
                                            color="secondary"
                                            variant="contained"
                                            startIcon={<EditSqaureIcon color="white" size="16"/>}
                                            onClick={() => setOpenFundWallet(true)}
                                            size="large"
                                        >
                                            Fund Wallet
                                        </MuiButton>
                                    </div>
                                </>
                        }
                        
                    </div>

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

            <div className="bg-white rounded-xl p-6 mb-5">
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
            </div>

            <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-primary-dark-blue">Transaction History</h3>
            </div>
        </DashboardWrapper>
    )
}

export default Wallet 