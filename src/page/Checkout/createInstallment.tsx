
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import {CvvIcon, UserIcon, CalenderIcon, CreditCardIcon, NairaIcon } from "../../components/icons";
import { useState } from "react";

import { toggleAddCreditcard } from '../../redux/slice/modal'
import { RootState } from '../../redux/store'
import AlertWrapper from '../../components/Models/AlertWrapper';
import { FPFormikCreateInstallment } from './service';
import { FormInput } from '../../components';
import { Button } from '@mui/material';
import ModelWrapper from '../../components/Models/ModelWrapper';
import { LoadingButton } from '@mui/lab';
import { useCreateInstallmentMutation } from '../../redux/api/Installment';



function CreateInstallment({open, close}: {open: boolean, close: () => void | any}) {
    let [createInstallment, { isLoading }] = useCreateInstallmentMutation()
    let dispatch = useDispatch()

    const formik = FPFormikCreateInstallment(createInstallment)

   
    return(
        <ModelWrapper isOpen={open} closeModal={close}>
            <p className="text-lg px-4 text-grey-200 font-medium mb-6 sticky left-0">Create Installment</p>
            <form className="px-3" onSubmit={formik.handleSubmit}>
                <FormInput 
                    type="text"
                    name="name"
                    // Icon={CalenderIco}
                    label="Name"
                    formik={formik}
                />
                <FormInput
                    type="text"
                    name="amount"
                    Icon={NairaIcon}
                    label="Amount"
                    formik={formik}
                />
                <FormInput 
                    type="text"
                    name="frequency"
                    // Icon={}
                    label="Frequency"
                    formik={formik}
                />
                
                <div className="flex justify-center gap-2 w-full sm:w-9/12 mx-auto my-2 sm:my-5">
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        type="button"
                        sx={{width: '50%'}}
                        onClick={close}>
                            Cancel
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        disableElevation
                        size="large"
                        sx={{width: '50%'}}>
                            Save
                    </LoadingButton>
                </div>
            </form>
        </ModelWrapper>
    )
}

export default CreateInstallment;