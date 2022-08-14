import {FormInput, SelectInput} from "../FormInput"
import UserIcon from "../icons/UserIcon"
import { IAddAddress } from "../interface"

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'

import PhoneIcon from "../icons/PhoneIcon"
import Button from "../Button"
import ModelWrapper from "./ModelWrapper"
import { toggleAddAddress } from "../../redux/slice/modalSlice";
import { RootState } from "../../redux/store";


function AddAddressModel(){
    const addAddress: boolean = useSelector((state: RootState) => state.modal.addAddress)
    const dispatch = useDispatch()

    let initialValues: IAddAddress = {
        name: '',
        phoneNumber: ''
    }

    function onSubmit (value: IAddAddress){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            name: Yup
                    .string()
                    .required('name field is Required'),
            phoneNumber: Yup.string().required('Please provide your phone number')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
    return(
        <ModelWrapper isOpen={addAddress} size="medium" closeModal={() => dispatch(toggleAddAddress())}>
            <form className="py-5 px-4 h-full overflow-y-auto overflow-x-hidden scrollbar">
                <p className="text-lg text-grey-200 font-medium mb-6 sticky left-0">Add Your Delivery Address</p>
                <FormInput 
                    type="text" 
                    name="name" 
                    label="Name" 
                    Icon={UserIcon}
                    formik={formik}
                />

                <FormInput 
                    type="text" 
                    name="phoneNumber" 
                    label="Phone Number" 
                    Icon={PhoneIcon}
                    formik={formik}
                />

                <SelectInput 
                    onChange={(state)=> console.log(state)}
                    label="State of residence" 
                    name="state"
                    formik={formik}/>
                <SelectInput 
                    onChange={(state)=> console.log(state)}
                    label="City of Residence" 
                    name="city"
                    formik={formik}/>
                <SelectInput 
                    onChange={(state)=> console.log(state)}
                    label="Nearest Pick up Station" 
                    name="guy"
                    formik={formik}/>

                <FormInput 
                    type="text" 
                    name="address" 
                    label="House Address" 
                    Icon={PhoneIcon}
                    formik={formik}
                />

                <div className="w-1/2 mx-auto">
                    <Button disable type="submit" color="#FF5000" >
                        <p>Save</p>
                    </Button>
                </div>
            </form>
        </ModelWrapper>
    )
}

export default AddAddressModel