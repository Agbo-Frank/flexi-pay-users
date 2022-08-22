import FormInput from "../FormInput";
import AlertWrapper from "./AlertWrapper";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'

import { ICreditCard } from "../interface";
import {CvvIcon, UserIcon, CalenderIcon, CreditCardIcon } from "../icons";
import Switch from "../Switch";
import { useState } from "react";
import Button from "../Button";

import { toggleAddCreditcard } from '../../redux/slice/modal'
import { RootState } from '../../redux/store'



function AddCreditCard () {
    let [saveCard, setSaveCard] = useState(false)
    let addCreditCard: boolean = useSelector((state: RootState) => state.modal.addCreditCard)

    let dispatch = useDispatch()

    let initialValues: ICreditCard = {
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    }

    function onSubmit (value: ICreditCard){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            cardName: Yup
                    .string()
                    .required('name of card holder field is Required'),
            cardNumber: Yup
                .string()
                .required('Please provide your phone number')
                .min(13, "invalid Card number"),
            expirydate: Yup
                .string()
                .required('Please the expiry date of the card'),
            cvv: Yup
                .string()
                .required('the cvv are reqired')
                .length(3, 'invalid cvv')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
    return(
        <AlertWrapper isOpen={addCreditCard}>
            <p className="text-lg px-4 text-grey-200 font-medium mb-6 sticky left-0">Enter Card Details</p>
            <form className="px-3" onSubmit={formik.handleSubmit}>
                <div className="flex w-full justify-between items-center gap-4">
                    <FormInput 
                        type="text"
                        name="cardName"
                        Icon={UserIcon}
                        label="Card Name"
                        formik={formik}
                    />
                    <FormInput 
                        type="text"
                        name="cardNumber"
                        Icon={CreditCardIcon}
                        label="Card Number"
                        formik={formik}
                    />
                </div>
                <div className="flex w-full justify-between items-center gap-4">
                    <FormInput 
                        type="text"
                        name="cardName"
                        Icon={CalenderIcon}
                        label="Card Name"
                        formik={formik}
                    />
                    <FormInput 
                        type="text"
                        name="cardNumber"
                        Icon={CvvIcon}
                        label="Card Number"
                        formik={formik}
                    />
                </div>

                <div className="my-5">
                    <Switch isTrue={saveCard} handleClick={() => setSaveCard(state => !state)} label="Save this card for future purchase"/>
                </div>
                
                <div className="flex w-10/12 mx-auto mt-9 items-center gap-5">
                    <Button outline color="#FF5000"
                    onClick={() => dispatch(toggleAddCreditcard())}>
                        <p>Cancel</p>
                    </Button>
                    <Button color="#FF5000">
                        <p>Add Card</p>
                    </Button>
                </div>
            </form>
        </AlertWrapper>
    )
}

export default AddCreditCard;