import { Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EditSqaureIcon, WalletIcon, WithdrawIcon } from "../../components/icons";
import { toggleWithdrawalForm } from "../../redux/slice/modal";
import { useGetUserQuery } from "../../redux/slice/User";
import { useLazyGetWalletDetailsQuery } from "../../redux/slice/wallet";

interface IWalletBalanceProps {
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
    let dispatch = useDispatch()

    let { user, loadingUser} = useGetUserQuery(undefined,{
        refetchOnFocus: true,
        refetchOnReconnect: true,
        selectFromResult: ({ data, isLoading}) => ({
            user: data?.result.data,
            loadingUser: isLoading
        })
    })

    let [getUserBalance, { data: wallet }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loadingUser])
    
    return(
        <div className="w-1/2 border rounded-xl text-center border-grey-100 flex flex-col justify-between px-4">
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
                <div className="flex flex-col justify-around items-center h-full">
                    <WalletIcon color="#1900FE" size="40"/>
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
                        <p className="text-xs text-left text-grey-700 ">Wallet Id: {wallet?.result.data.account_number}</p>
                        <div className="flex justify-center">
                            <WalletIcon line color="#E8E5FF" size="60"/>
                        </div>
                        <p className="text-grey-700 text-lg">Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ {wallet?.result.data.balance} </p>
                        <p className="text-grey-700 text-sm">Click on the button below  to fund your wallet</p>
                        <div className="flex justify-center space-x-4 items-center mx-auto my-4 w-full">
                            <Button
                                color="secondary"
                                variant="outlined"
                                startIcon={<WithdrawIcon color="#FF5000" size="16"/>}
                                onClick={() => dispatch(toggleWithdrawalForm())}
                                size="large"
                            >
                                Withdraw
                            </Button>

                            <Button
                                color="secondary"
                                variant="contained"
                                startIcon={<EditSqaureIcon color="white" size="16"/>}
                                onClick={() => setOpen(state => ({...state, fundWallet: true}))}
                                size="large"
                            >
                                Fund Wallet
                            </Button>
                        </div>
                    </>
            }
            
        </div>
    )
}