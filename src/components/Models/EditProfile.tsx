import { useEffect, useState } from "react";
import ModelWrapper from "./ModelWrapper";
import { MailIcon, PhoneIcon, UserIcon } from '../icons'

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from "react-redux";

import { IUser } from "../../interface";
import {DateInput, FormInput, SelectInput} from "../FormInput";
import Button from "../Button";
import { Button as MuiButton,  } from "@mui/material";
import {LoadingButton} from '@mui/lab';

import { toggleEditProfile } from '../../redux/slice/modalSlice'
import { RootState } from "../../redux/store";
import { Tab, Tabs } from "@mui/material";

import NaijaStates from 'naija-state-local-government';
import { FPFormikEditUser } from "../../services/user";
import { useEditUserMutation } from "../../redux/slice/User";


function Profile(){
    let [states, setStates] = useState()
    let [lgas, setLgas] = useState()
    let [gender, setGender] = useState()

    const dispatch = useDispatch()

    const [editUser, { isLoading }] = useEditUserMutation()

    useEffect(() => {
        let states = NaijaStates.states()
        
        states = states.map((state: string) => ({label: state, value: state}))
        setStates(states)
    }, [])

    function onChangeState(state: string){
        
        let lgas = NaijaStates.lgas(state)
    
        lgas = lgas.lgas.map((lga: string) => ({label: lga, value: lga}))
        setLgas(lgas)
    }

    const formik = FPFormikEditUser(editUser)

    return(
        <form className="px-5 mt-5" onSubmit={formik.handleSubmit}>
            <div className="flex w-full justify-between items-center gap-4">
                <FormInput 
                    type="text"
                    name="firstName"
                    Icon={UserIcon}
                    label="First Name"
                    formik={formik}
                />
                <FormInput 
                    type="text"
                    name="lastName"
                    Icon={UserIcon}
                    label="Last Number"
                    formik={formik}
                />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                <FormInput 
                    type="email"
                    name="email"
                    Icon={MailIcon}
                    label="Email"
                    formik={formik}
                />
                <FormInput 
                    type="text"
                    name="PhoneNumber"
                    Icon={PhoneIcon}
                    label="Phone Number"
                    formik={formik}
                />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                <SelectInput 
                    label="Gender" 
                    name="gender" 
                    data={gender}
                    formik={formik}
                />
                <DateInput 
                    label="Date of Birth" 
                    name="DOB"
                    formik={formik}
                />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                <SelectInput 
                    label="State" 
                    name="state" 
                    data={states}
                    onChange={(state) => onChangeState(`${state}`)}
                    formik={formik}
                    />

                <SelectInput 
                    label="LGA" 
                    name="lga" 
                    data={lgas}
                    formik={formik}/>
            </div>

            <FormInput 
                type="text"
                name="address"
                Icon={UserIcon}
                label="Address"
                formik={formik}
            />
            <div className="flex justify-center gap-2 w-9/12 mx-auto my-5">
                <MuiButton 
                    variant="outlined" 
                    color="secondary" 
                    type="button"
                    sx={{width: '50%'}}
                    onClick={() => dispatch(toggleEditProfile())}>
                        Cancel
                </MuiButton>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disableElevation
                    size="large"
                    sx={{width: '50%'}}>
                        Save Changes
                </LoadingButton>
            </div>
        </form>
    )
}

function Password(){
    let initialValues = {
        oldPasssword: '',
        newPassword: '',
        cPassword: '',
    }
    function onSubmit (value: any){
        console.log(value)
    }
    let validationSchema = () => {
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
    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
    const dispatch = useDispatch()

    const [editUser, { isLoading }] = useEditUserMutation()
    return(
        <form className="w-9/12 mx-auto my-5" onSubmit={formik.handleSubmit}>
            <FormInput 
                type="password"
                name="oldPassword"
                Icon={UserIcon}
                label="Old password"
                formik={formik}
            />
            <FormInput 
                type="password"
                name="newPassword"
                Icon={UserIcon}
                label="New Password"
                formik={formik}
            />
            <FormInput 
                type="password"
                name="password"
                Icon={UserIcon}
                label="Confirm Password"
                formik={formik}
            />

            <div className="flex justify-center gap-2 w-10/12 mx-auto my-5">
                <MuiButton 
                    variant="outlined" 
                    color="secondary" 
                    type="button"
                    sx={{width: '50%'}}
                    onClick={() => dispatch(toggleEditProfile())}>
                        Cancel
                </MuiButton>
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disableElevation
                    size="large"
                    sx={{width: '50%'}}>
                        Save Changes
                </LoadingButton>
            </div>
        </form>
    )
}


function EditProfile(){
    const [value, setValue] = useState(0);

    let editProfile = useSelector((state: RootState) => state.modal.editProfile)
    let dispatch = useDispatch()
    return(
        <ModelWrapper isOpen={editProfile} closeModal={() => dispatch(toggleEditProfile())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
                    <Tab label="Profile Details" sx={{textTransform: 'capitalize', fontSize: 16, width: '50%', alignItems: 'start'}}/>
                    <Tab label="Change Password" sx={{textTransform: 'capitalize', fontSize: 16, width: '50%', alignItems: 'end'}}/>
                </Tabs>

                <div>
                    <div hidden={value !== 0}>
                        <Profile />
                    </div>
                    <div hidden={value !== 1}>
                        <Password />
                    </div>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default EditProfile