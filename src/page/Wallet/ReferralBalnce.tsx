import { Button, Skeleton, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CopyIcon, GroupIcon, MarkCircleIcon, WalletIcon, WithdrawIcon } from "../../components/icons"
import { useGetUserQuery } from "../../redux/api/User";
import { useLazyGetWalletDetailsQuery } from "../../redux/api/wallet";
import { formatNumber } from "../../utils";
import { IWalletBalanceProps } from "./WalletBalance";



export function ReferralBalance({ open, setOpen}: IWalletBalanceProps){
    const matches = useMediaQuery('(min-width:640px)'); 
    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)
    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }
    let { user, loading } = useGetUserQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.result?.data,
            loading: isLoading
        })
    })

    let [getUserBalance, { data: wallet, isLoading }] = useLazyGetWalletDetailsQuery()

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user, loading])

    console.log("wallet", wallet)
    return(
        <div className="w-full flex flex-col justify-between p-3 bg-[#F9F8FF] rounded-md h-full">
            {
                loading ? 
                <>
                    <Skeleton height={15} width="40%"/>
                    <div className="flex justify-center">
                        <Skeleton height={50} width={50} variant="rectangular" />
                    </div>
                    <Skeleton height={20} width="50%" className="mx-auto"/>
                    <Skeleton height={25} width="35%" className="mx-auto"/>
                    <Skeleton height={15} width="95%" className="mx-auto"/>
                    <div className="flex justify-between space-x-4 w-11/12 mx-auto">
                        <Skeleton height={40} variant="rectangular" width="50%"/>
                        <Skeleton height={40} variant="rectangular" width="50%"/>
                    </div>
                </>:
                !user?.reserved_account?.account_number ? 
                    <div className="flex flex-col justify-around items-center self-stretch h-full space-y-3">
                        <GroupIcon color="#000541" size={matches ? "48" : "35"}/>
                        <span className="text-center text-[#545362] text-lg font-medium">Create Account</span>
                        <span className="text-center text-[#545362] text-sm font-light">
                            Create an account on FlexiPay to enable you see your referral balance and withdraw from it   
                        </span>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={() => setOpen(state => ({...state, createAccForm: true}))}
                        >
                            Create Account
                        </Button> 
                    </div>
                :
                <>
                    <div className="flex justify-between items-center">
                        <span className="text-[12px] font-light">Referral </span>
                        <i className="fa-solid text-[12.5px] fa-circle-info"></i>
                    </div>
                    <div className="flex flex-col space-y-[2px] justify-center items-center my-1">
                        <GroupIcon color="#000541" size={matches ? "48" : "35"}/>
                        <p className="text-grey-700 text-xl">Referial Balance</p>
                        <p className="text-primary-dark-blue font-semibold text-xl">₦ {formatNumber(`${wallet?.result.data?.referral_balance}`)}</p>
                        <p className="text-grey-700 text-xs text-center px-5">
                            Use your referial link to refer your friends and start making money. for each person you refer, you will earn <span className="font-medium">₦500</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4 my-1 justify-between">
                        <div className="w-1/2">
                            <p className="hidden" ref={code}>{user?.referral_link}</p>
                            <Button 
                                color="secondary" 
                                onClick={copy}
                                variant="outlined"
                                fullWidth
                                startIcon={copied ?<MarkCircleIcon color="#FF5000" size="16"/> :<CopyIcon color="#FF5000" size="14"/>}>
                                    { copied ? 'Copied!' : 'Copy' }
                            </Button>
                        </div>
                        <div className="w-1/2">
                            <Button
                                color="secondary"
                                onClick={() => setOpen(state => ({...state, withdraw: true}))}
                                variant="contained"
                                fullWidth
                                startIcon={<WithdrawIcon color="white" size="16"/>}>
                                    Withdraw
                            </Button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ReferralBalance