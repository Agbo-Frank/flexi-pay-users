import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditSqaureIcon, WalletIcon, WithdrawIcon } from "../../components/icons";
import { toggleWithdrawalForm } from "../../redux/slice/modal";
import { useGetUserQuery } from "../../redux/api/User";
import { useLazyGetWalletDetailsQuery } from "../../redux/api/wallet";
import useMediaQuery from '@mui/material/useMediaQuery';
import { formatNumber } from "../../utils";
import { CopyText } from "../../components";

export interface IWalletBalanceProps {
    open: {
        createAccForm: boolean;
        fundWallet: boolean;
    },
    setOpen: React.Dispatch<React.SetStateAction<{
        createAccForm: boolean;
        fundWallet: boolean;
    }>>
}


export function WalletBalance({ open, setOpen}: IWalletBalanceProps){
    const matches = useMediaQuery('(min-width:600px)'); 
    let dispatch = useDispatch()

    let { user, loadingUser} = useGetUserQuery(undefined,{
        refetchOnFocus: true,
        refetchOnReconnect: true,
        selectFromResult: ({ data, isLoading}) => ({
            user: data?.result.data,
            loadingUser: isLoading
        })
    })

    let [getUserBalance, { data: wallet, isLoading }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loadingUser])

    console.log(wallet)
    
    return(
        <div className="w-full sm:border rounded-xl text-center flex flex-col justify-between py-4 px-2 sm:px-4 bg-white sm:bg-transparent h-full">
            {
                loadingUser ? 
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
                </>:
                !user?.reserved_account?.account_number? 
                <div className="flex flex-col space-y-4 items-center h-full">
                    <WalletIcon color="#000541" size={matches ? "48" : "35"}/>
                    <span className="text-center text-[#545362] text-lg font-medium">Create Account</span>
                    <span className="text-center text-[#545362] text-sm font-light">Create an account on FlexiPay to be able to buy and pay for your orders seamlessly. </span>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setOpen(state => ({...state, createAccForm: true}))}
                    >
                        Create Account
                    </Button> 
                </div>:
                    <>
                        <div className="flex justify-center">
                            <WalletIcon line={parseFloat(`${wallet?.result.data?.balance}`) === 0} color="#000541" size={matches ? "40" : "30"}/>
                        </div>
                        <p className="text-grey-700 text-lg">Balance</p>
                        {
                            isLoading ? 
                            <Skeleton height={25} width="35%" className="mx-auto"/> :
                            <p className="text-primary-dark-blue font-semibold text-xl">₦ {formatNumber(`${wallet?.result.data?.balance}`)} </p>
                        }
                        {
                            isLoading ? 
                            <>
                                <Skeleton height={25} width="55%" className="mx-auto"/> 
                                <Skeleton height={25} width="65%" className="mx-auto"/>
                            </> :
                            <>
                                <p className="text-grey-700">Account no: <CopyText text={`${wallet?.result.data.account_number}`}/></p>
                                <p className="text-grey-700">Bank: <CopyText text={`${wallet?.result.data.bank_name }`}/></p>
                            </>
                        }
                        {/* <p className="text-grey-700 text-sm">Click on the button below  to fund or Withdraw from your wallet</p> */}
                        <div className="flex justify-center space-x-4 items-center mx-auto my-3 w-full">

                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<EditSqaureIcon color="white" size="16"/>}
                                onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                                size="large"
                                // fullWidth
                                className="w-10/12"
                            >
                                Fund Wallet
                            </Button>
                        </div>
                    </>
            }
            
        </div>
    )
}