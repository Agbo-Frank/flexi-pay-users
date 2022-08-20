import FormInput, { SelectInput } from "../FormInput";
import ModelWrapper from "./ModelWrapper";
import { NairaIcon, UserIcon } from "../icons";

import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as Yup from 'yup';

import { AppDispatch, RootState } from "../../redux/store";
import { toggleWithdrawalForm } from "../../redux/slice/modalSlice";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { FPFormikWithdraw } from "../../page/Wallet/service";
import { useEffect, useState } from "react";
import { useLazyGetAllBanksQuery } from "../../redux/slice/wallet";
import { IBanks, ISelectOptions } from "../../interface";


export function WithdrawalForm(){
    let isOpen = useSelector((state: RootState) => state.modal.withdrawalForm)
    let [banks, setBanks] = useState<ISelectOptions[]>([])
    let dispatch = useDispatch<AppDispatch>()

    let [getBanks, {isLoading}] = useLazyGetAllBanksQuery()

    useEffect(() => {
        getBanks()
            .unwrap()
            .then(res => {
                let banks = res.result.data.map(bank => ({label: bank.bank_name, value: bank.cbn_code}))
                setBanks(banks)
            })
    }, [isLoading])

    const formik = FPFormikWithdraw()
    
    return(
        <ModelWrapper isOpen={isOpen} size="medium" closeModal={() => dispatch(toggleWithdrawalForm())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky bg-white top-0 left-0 w-fit px-5 z-20 pb-2">
                    <p className="font-medium text-lg capitalize my-1">Cash Withdrawal</p>
                    <p className="font-light">Kindly provided  us with your information</p>
                </div>
                <form className="w-full px-8 my-7" onSubmit={formik.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="full_name" 
                        label="Full Name"
                        Icon={NairaIcon}
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
                        Icon={UserIcon}
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
                            loading={false}
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