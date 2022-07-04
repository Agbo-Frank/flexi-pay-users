import FormInput from "../FormInput";
import ModelWrapper from "./ModelWrapper";
import { NairaIcon, UserIcon } from "../icons";

import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import * as Yup from 'yup';

import Button from "../Button";
import { RootState } from "../../redux/store";
import { toggleWithdrawalForm } from "../../redux/slice/modalSlice";


export function WithdrawalForm(){
    let isOpen = useSelector((state: RootState) => state.modal.withdrawalForm)
    let dispatch = useDispatch()

    let initialValues = {
        name: '',
        number: '',
        bank: '',
        amount: ''
    }

    function onSubmit (value: typeof initialValues){
        console.log(value)
    }

    let validationSchema = () => {
        return Yup.object({
            name: Yup
                .string()
                .required('Accoun Name field is required'),
            number: Yup
                .string()
                .required('Accoun Number field is required')
                .min(10, 'please enter a valide account number'),
            bank: Yup
                .string()
                .required('Please select your bank'),
            amount: Yup
                .string()
                .required('Please enter the amount your want to withdraw')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
    return(
        <ModelWrapper isOpen={isOpen} size="medium" closeModal={() => dispatch(toggleWithdrawalForm())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky bg-white top-0 left-0 w-full px-5 z-20 pb-2">
                    <p className="font-medium text-lg capitalize my-1">Cash Withdrawal</p>
                    <p className="font-light">Kindly provided  us with your information</p>
                </div>
                <form className="w-full px-8 my-7" onSubmit={formik.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="name" 
                        label="Account Name"
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="number" 
                        label="Account Number"
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="bank" 
                        label="Bank Name"
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
                        <Button outline color="#FF5000" onClick={() => dispatch(toggleWithdrawalForm())}>
                            <p>Cancel</p>
                        </Button>
                        <Button color="#FF5000">
                            <p>Send Request</p>
                        </Button>
                    </div>
                </form>
            </div>
        </ModelWrapper>
    )
}

export default WithdrawalForm