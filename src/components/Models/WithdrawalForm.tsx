import FormInput, { SelectInput } from "../FormInput";
import ModelWrapper from "./ModelWrapper";
import { NairaIcon, UserIcon } from "../icons";

import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../redux/store";
import { toggleWithdrawalForm } from "../../redux/slice/modal";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { FPFormikWithdraw } from "../../page/Wallet/service";
import { useEffect, useState } from "react";
import { useLazyGetAllBanksQuery, useWithdrawFundMutation } from "../../redux/api/wallet";
import { IBanks, ISelectOptions } from "../../interface";
import { useGetUserQuery } from "../../redux/api/User";


export function WithdrawalForm(){
    let isOpen = useSelector((state: RootState) => state.modal.withdrawalForm)
    let [banks, setBanks] = useState<ISelectOptions[]>([])
    let dispatch = useDispatch<AppDispatch>()

    let [getBanks, {isLoading}] = useLazyGetAllBanksQuery()
    let { data: user } = useGetUserQuery()
    let [withdraw, { isLoading: withdrawing }] = useWithdrawFundMutation()

    useEffect(() => {
        if(isOpen){
            getBanks()
                .unwrap()
                .then(res => {
                    let banks = res.result.data.map(bank => ({label: bank.bank_name, value: bank.cbn_code}))
                    setBanks(banks)
                })
                .catch((err) => console.log(err))
        }
    }, [isLoading, isOpen])

    const formik = FPFormikWithdraw(user?.result.data, withdraw, () => dispatch(toggleWithdrawalForm()))
    
    return(
        <ModelWrapper 
            isOpen={isOpen} 
            size="medium" 
            closeModal={() => dispatch(toggleWithdrawalForm())}
            title="Cash Withdrawal">
            <div className="h-full overflow-y-auto scrollbar relative">
                <form className="w-full px-2 sm:px-5" onSubmit={formik.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="full_name" 
                        label={user?.result.data.first_name ? user?.result.data.first_name.toUpperCase() + " " + user?.result.data.last_name?.toUpperCase() : "Full Name"}
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <SelectInput  
                        name="bank_code" 
                        label="Bank"
                        data={banks}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="account_number" 
                        label="Account Number"
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount"
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <div className="flex justify-center items-center gap-4 my-8 w-10/12 mx-auto">

                        <Button
                            variant="outlined" 
                            color="secondary" 
                            type="button"
                            sx={{width: '50%'}}
                            onClick={() => dispatch(toggleWithdrawalForm())}>
                                Cancel
                        </Button>

                        <LoadingButton
                            loading={withdrawing}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disableElevation
                            size="large"
                            sx={{width: '50%'}}>
                                Withdraw
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </ModelWrapper>
    )
}

export default WithdrawalForm