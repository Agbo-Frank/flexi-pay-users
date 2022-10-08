import {DateInput, FormInput, SelectInput} from "../FormInput"
import UserIcon from "../icons/UserIcon"

import { useDispatch, useSelector } from 'react-redux'

import PhoneIcon from "../icons/PhoneIcon"
import NaijaStates from 'naija-state-local-government';
import ModelWrapper from "./ModelWrapper"
import { toggleAddAddress } from "../../redux/slice/modal";
import { RootState } from "../../redux/store";
import { FPFormikAddDeliveryAddress, FPFormikEditUser } from "../../services/user"
import { useCreateDeliveryAddressMutation, useEditUserMutation, useGetUserQuery, useUpdateDeliveryAddressMutation } from "../../redux/api/User"
import { LoadingButton } from "@mui/lab"
import { useEffect, useState } from "react"
import { AddressIcon } from "../icons";


function AddAddressModel(){
    let [states, setStates] = useState()
    let [lgas, setLgas] = useState()
    const {open, body: user, type} = useSelector((state: RootState) => state.modal.addAddress)
    const dispatch = useDispatch()

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

    let [createAddress, { isLoading }] = useCreateDeliveryAddressMutation()
    let [updateAddress, { isLoading: loading }] = useUpdateDeliveryAddressMutation()

    const formik = FPFormikAddDeliveryAddress(
        user, 
        type, 
        updateAddress, 
        createAddress, 
        () => dispatch(
            toggleAddAddress(
                {type: "create", body: null}
            ))
        )
    
    return(
        <ModelWrapper 
            isOpen={open} 
            size="medium" 
            closeModal={() => dispatch(toggleAddAddress({type: "create"}))}
            title="Add Your Delivery Address">
            <form className="py-5 px-4 h-full" onSubmit={formik.handleSubmit}>  
                <FormInput 
                    type="text"
                    name="name"
                    Icon={UserIcon}
                    label={user?.name.toLocaleUpperCase() || "Full Name"}
                    formik={formik}
                />
                <FormInput 
                    type="text" 
                    name="phone_number" 
                    label={user?.phone_number || "Phone Number"} 
                    Icon={PhoneIcon}
                    formik={formik}
                />

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
                    Icon={AddressIcon}
                    formik={formik}
                />

                <FormInput 
                    type="text" 
                    name="house_address" 
                    label={ user?.house_address || "House Address"} 
                    Icon={AddressIcon}
                    formik={formik}
                />
                <FormInput 
                    type="text" 
                    name="postal_code" 
                    label={ user?.postal_code || "Postal Code"} 
                    Icon={AddressIcon}
                    formik={formik}
                />
                <div className="mx-auto w-1/2">
                    <LoadingButton
                    loading={isLoading || loading}
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