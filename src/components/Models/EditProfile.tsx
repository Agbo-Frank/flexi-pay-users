import { useEffect, useState } from "react";
import ModelWrapper from "./ModelWrapper";
import { MailIcon, PhoneIcon, UserIcon } from '../icons'
import { useSelector, useDispatch } from "react-redux";

import {DateInput, FormInput, SelectInput} from "../FormInput";
import { Button as MuiButton,  } from "@mui/material";
import {LoadingButton} from '@mui/lab';

import { toggleEditProfile } from '../../redux/slice/modal'
import { RootState } from "../../redux/store";
import { Tab, Tabs } from "@mui/material";

import NaijaStates from 'naija-state-local-government';
import { FPFormikChangePassword, FPFormikEditUser } from "../../services/user";
import { useChangePasswordMutation, useEditUserMutation, useGetUserQuery } from "../../redux/slice/User";


function Profile(){
    let [states, setStates] = useState()
    let [lgas, setLgas] = useState()

    const dispatch = useDispatch()

    const [editUser, { isLoading }] = useEditUserMutation()
    const { data } = useGetUserQuery()

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

    const formik = FPFormikEditUser(editUser, () => dispatch(toggleEditProfile()))

    return(
        <form className="px-5 mt-5" onSubmit={formik.handleSubmit}>
            <div className="flex w-full justify-between items-center gap-4">
                <FormInput 
                    type="text"
                    name="firstName"
                    Icon={UserIcon}
                    label={data?.result.data.first_name || "First Name"}
                    formik={formik}
                />
                <FormInput 
                    type="text"
                    name="lastName"
                    Icon={UserIcon}
                    label={data?.result.data.last_name || "Last Name"}
                    formik={formik}
                />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                <FormInput 
                    type="email"
                    name="email"
                    Icon={MailIcon}
                    label={data?.result.data.email || "Email"}
                    formik={formik}
                />
                <FormInput 
                    type="text"
                    name="phone_number"
                    Icon={PhoneIcon}
                    label={data?.result.data.phone_number || "Phone Number"}
                    formik={formik}
                />
            </div>

            <div className="flex w-full justify-between items-center gap-4">
                <SelectInput 
                    label="Gender" 
                    name="gender" 
                    data={[{label: 'Male', value: 'Male'},{label: 'Female', value: 'Female'}]}
                    formik={formik}
                />
                <DateInput 
                    label="Date of Birth" 
                    name="dob"
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
                    name="city" 
                    data={lgas}
                    formik={formik}
                />
            </div>

            <FormInput 
                type="text"
                name="house_address"
                Icon={UserIcon}
                label={data?.result.data.address || "Address"}
                formik={formik}
            />
            <div className="flex w-full justify-between items-center gap-4">
                <FormInput 
                    type="text"
                    name="nearest_bus_stop"
                    Icon={UserIcon}
                    label={data?.result.data.nearest_bus_stop || "Nearest Bus Stop"}
                    formik={formik}
                />

                <FormInput 
                    type="text"
                    name="postal_code"
                    Icon={UserIcon}
                    label={data?.result.data.postal_code || "Postal Code"}
                    formik={formik}
                />
            </div>
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
    const dispatch = useDispatch()

    const [changePassword, { isLoading }] = useChangePasswordMutation()

    let formik = FPFormikChangePassword(changePassword)
    return(
        <form className="w-9/12 mx-auto my-5" onSubmit={formik.handleSubmit}>
            <FormInput 
                type="password"
                name="password"
                Icon={UserIcon}
                label="New Password"
                formik={formik}
            />
            <FormInput 
                type="password"
                name="password_confirmation"
                Icon={UserIcon}
                label="Confirm Password"
                formik={formik}
            />

            <FormInput 
                type="password"
                name="previous_password"
                Icon={UserIcon}
                label="Old Password"
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
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disableElevation
                    size="large"
                    sx={{width: '50%'}}>
                        Change
                </LoadingButton>
            </div>
        </form>
    )
}


export function EditProfile(){
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