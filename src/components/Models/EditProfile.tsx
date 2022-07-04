import { useState } from "react";
import ModelWrapper from "./ModelWrapper";
import { MailIcon, PhoneIcon, UserIcon } from '../icons'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";

import { Iuser } from "../../interface";
import FormInput from "../FormInput";
import SelectInput from "../SelectInput";
import Button from "../Button";
import { toggleEditProfile } from '../../redux/slice/modalSlice'
import { RootState } from "../../redux/store";


function EditProfile(){
    let [profile, setProfile] = useState(true)

    let initialValues: Iuser = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        state: '',
        city: '',
        address: ''
    }

    let initialValues2 = {
        oldPasssword: '',
        newPassword: '',
        cPassword: '',
    }

    function onSubmit1 (value: Iuser){
        console.log(value)
    }

    function onSubmit2 (value: any){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string(),
            email: Yup.string(),
            phoneNumber: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            address: Yup.string()
        })
    }

    let validationSchema2 = () => {
        return Yup.object({
            oldPassword: Yup.string(),
            lastName: Yup.string(),
            email: Yup.string(),
            phoneNumber: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            address: Yup.string()
        })
    }

    const formik1 = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit: onSubmit1
    })

    const formik2 = useFormik({ 
        initialValues: initialValues, 
        validationSchema: validationSchema2, 
        onSubmit: onSubmit2
    })

    let editProfile = useSelector((state: RootState) => state.modal.editProfile)
    let dispatch = useDispatch()
    return(
        <ModelWrapper isOpen={editProfile} closeModal={() => dispatch(toggleEditProfile())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky top-0 left-0 z-20 bg-white flex">
                    <div 
                    className={`w-1/2 my-4 border-b ${profile ? 'text-primary-blue border-primary-blue ' : 'text-grey-200 border-grey-100 '} border-solid  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                    onClick={() => setProfile(true)}>Profile Details</div>
                    <div 
                    className={`w-1/2 text-right my-4 border-b  ${!profile ? 'text-primary-blue border-primary-blue ' : 'text-grey-200 border-grey-100 '} hover:bg-gray-100 py-3 px-2 cursor-pointer`}
                    onClick={() => setProfile(false)}>Change Password</div>
                </div>

                <div>
                    {
                        profile ?
                       <form className="px-5" onSubmit={formik1.handleSubmit}>
                            <div className="flex w-full justify-between items-center gap-4">
                                <FormInput 
                                    type="text"
                                    name="firstName"
                                    Icon={UserIcon}
                                    label="First Name"
                                    formik={formik1}
                                />
                                <FormInput 
                                    type="text"
                                    name="lastName"
                                    Icon={UserIcon}
                                    label="Last Number"
                                    formik={formik1}
                                />
                            </div>

                            <div className="flex w-full justify-between items-center gap-4">
                                <FormInput 
                                    type="email"
                                    name="email"
                                    Icon={MailIcon}
                                    label="Email"
                                    formik={formik1}
                                />
                                <FormInput 
                                    type="text"
                                    name="PhoneNumber"
                                    Icon={PhoneIcon}
                                    label="Phone Number"
                                    formik={formik1}
                                />
                            </div>

                            <div className="flex w-full justify-between items-center gap-4">
                                <SelectInput label="Gender" />
                                <SelectInput label="Date of Birth" />
                            </div>

                            <div className="flex w-full justify-between items-center gap-4">
                                <SelectInput label="State" />
                                <SelectInput label="City" />
                            </div>

                            <FormInput 
                                type="text"
                                name="address"
                                Icon={UserIcon}
                                label="Address"
                                formik={formik1}
                            />
                            <div className="flex justify-center gap-2 w-9/12 mx-auto my-5">
                                <Button outline color="#FF5000">Cancel</Button>
                                <Button color="#FF5000">Save Changes</Button>
                            </div>
                       </form> :
                        <form className="w-9/12 mx-auto my-5" onSubmit={formik2.handleSubmit}>
                            <FormInput 
                                type="password"
                                name="oldPassword"
                                Icon={UserIcon}
                                label="Old password"
                                formik={formik2}
                            />
                            <FormInput 
                                type="password"
                                name="newPassword"
                                Icon={UserIcon}
                                label="New Password"
                                formik={formik2}
                            />
                            <FormInput 
                                type="password"
                                name="password"
                                Icon={UserIcon}
                                label="Confirm Password"
                                formik={formik2}
                            />

                            <div className="flex justify-center gap-2 w-10/12 mx-auto my-10">
                                <Button outline color="#FF5000">Cancel</Button>
                                <Button color="#FF5000">Save Changes</Button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </ModelWrapper>
    )
}

export default EditProfile