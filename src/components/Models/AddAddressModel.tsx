import {DateInput, FormInput, SelectInput} from "../FormInput"
import UserIcon from "../icons/UserIcon"

import { useDispatch, useSelector } from 'react-redux'

import PhoneIcon from "../icons/PhoneIcon"
import NaijaStates from 'naija-state-local-government';
import ModelWrapper from "./ModelWrapper"
import { toggleAddAddress } from "../../redux/slice/modal";
import { RootState } from "../../redux/store";
import { FPFormikEditUser } from "../../services/user"
import { useEditUserMutation, useGetUserQuery } from "../../redux/slice/User"
import { LoadingButton } from "@mui/lab"
import { useEffect, useState } from "react"


function AddAddressModel(){
    let [states, setStates] = useState()
    let [lgas, setLgas] = useState()
    const addAddress: boolean = useSelector((state: RootState) => state.modal.addAddress)
    const dispatch = useDispatch()

    const { user } = useGetUserQuery(undefined, {
        selectFromResult: ({ data }) => ({
            user: data?.result.data
        })
    })

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

    let [editUser, { isLoading }] = useEditUserMutation()

    const formik = FPFormikEditUser(editUser, () => dispatch(toggleAddAddress()))
    return(
        <ModelWrapper isOpen={addAddress} size="medium" closeModal={() => dispatch(toggleAddAddress())}>
            <form className="py-5 px-4 h-full overflow-y-auto overflow-x-hidden scrollbar" onSubmit={formik.handleSubmit}>
                <p className="text-lg text-grey-200 font-medium mb-6 sticky left-0">Add Your Delivery Address</p>
                <div className="flex w-full justify-between items-center gap-4">
                    <FormInput 
                        type="text"
                        name="firstName"
                        Icon={UserIcon}
                        label={user?.first_name?.toLocaleUpperCase() || "First Name"}
                        formik={formik}
                    />
                    <FormInput 
                        type="text"
                        name="lastName"
                        Icon={UserIcon}
                        label={user?.last_name?.toLocaleUpperCase() || "Last Name"}
                        formik={formik}
                    />
                </div>

                <div className="flex w-full justify-between items-center gap-4">
                    <FormInput 
                        type="text" 
                        name="phone_number" 
                        label={user?.phone_number || "Phone Number"} 
                        Icon={PhoneIcon}
                        formik={formik}
                    />

                    <DateInput 
                        label="Date of Birth" 
                        name="dob"
                        formik={formik}
                    />
                </div>

                <SelectInput 
                    label={ user?.state || "State of residence" }
                    name="state"
                    data={states}
                    formik={formik}
                    onChange={(state)=> onChangeState(`${state}`)}/>

                <SelectInput 
                    label={user?.city || "City of Residence"} 
                    name="city"
                    data={lgas}
                    formik={formik}/>

                <FormInput 
                    type="text" 
                    label={user?.nearest_bus_stop || "Nearest Pick up Station" }
                    name="nearest_bus_stop"
                    Icon={PhoneIcon}
                    formik={formik}
                />

                <FormInput 
                    type="text" 
                    name="house_address" 
                    label={ user?.house_address || "House Address"} 
                    Icon={PhoneIcon}
                    formik={formik}
                />
                <div className="mx-auto w-1/2">
                    <LoadingButton
                    loading={isLoading}
                    color="secondary"
                    variant="contained"
                    size="large"
                    className="mx-auto"
                    fullWidth
                    type="submit"
                    >
                        Save
                    </LoadingButton>
                </div>
            </form>
        </ModelWrapper>
    )
}

export default AddAddressModel