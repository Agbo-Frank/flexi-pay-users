import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, useMediaQuery } from "@mui/material";
import ModelWrapper from "./ModelWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleAddAddress, toggleAddressBook } from "../../redux/slice/modal";
import { useGetDeliveryAddressQuery, useRemoveDeliveryAddressMutation, useUpdateDeliveryAddressMutation } from "../../redux/api/User";
import Empty from "../Empty";
import { AddressIcon } from "../icons";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { removeDeliveryAddress, toggleDeliveryAddressDefault } from "../../services/user";




export function AddressBook(){
    const matches = useMediaQuery('(min-width:640px)');
    let open = useSelector((state: RootState) => state.modal.addressBook)
    let [toggle, setToggle] = useState<{
        del: boolean,
        name: string | null,
        id: null | number | string
    }>({
        del: false,
        name: null,
        id: null
    })
    let dispatch= useDispatch()
    const { loading, address } = useGetDeliveryAddressQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            address: data?.result.data,
            loading: isLoading
        })
    })
    const [rmDeliveryAddress, {isLoading}] = useRemoveDeliveryAddressMutation()
    let [updateAddress] = useUpdateDeliveryAddressMutation()

    console.log(address)
    const handleClose = () => {
        setToggle(state => (
            {
                ...state, 
                del: false, 
                name: null, 
                id: null
            }
        ))
    }
    return(
        <>
            <Dialog open={toggle.del} onClose={handleClose}>
                <DialogTitle>Remove Delivery Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to remove this delivery address?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                    // startIcon={<HeartIcon color="#FF5000" size="18"/>} 
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}>Cancel </Button>
                    <LoadingButton
                        onClick={() => removeDeliveryAddress({id: toggle.id}, rmDeliveryAddress, dispatch, () => setToggle(state => ({...state, del: false, name: null})))}
                        loading={isLoading}
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        variant="contained"
                    >
                        Remove {matches && "delivery address"}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <ModelWrapper 
                isOpen={open} 
                closeModal={() => dispatch(toggleAddressBook())}
                title="Address Book">
                <div className="py-2 px-4 h-full">
                    <div className="border-y py-2 my-2">
                        <Button
                            color="secondary"
                            startIcon={<i className="fa-solid fa-circle-plus"></i>}
                            onClick={() => {
                                dispatch(toggleAddAddress({type: "create"}))
                                dispatch(toggleAddressBook())
                            }}>
                            Add A New Addresss
                        </Button>
                    </div>
                    {
                        !address || address.length === 0 ?
                        <div className="w-full">
                            <Empty 
                                title="No delivery address " 
                                Icon={AddressIcon}
                                message="You currently don’t have any delivery address, kindly add a delivery address"
                                fullWidth
                                button={
                                <Button
                                    startIcon={<AddressIcon color="white" size="20"/>}
                                    color="secondary"
                                    size="large"
                                    variant="contained"
                                    onClick={() => {
                                        dispatch(toggleAddAddress({type: "create"}))
                                        dispatch(toggleAddressBook())
                                    }}>
                                        Add Delivery Address
                                </Button>
                            }/> 
                        </div>:
                        <div className="ml-5">
                            <RadioGroup
                                name="delivery-method"
                                // value={value}
                                onChange={(e, v) => toggleDeliveryAddressDefault(JSON.parse(v), updateAddress, dispatch)}
                            >
                                <div className="space-y-3 mr-2">
                                    {
                                        address?.map(address => (
                                            <div className="flex w-full justify-between items-center">
                                                <FormControl>
                                                    <FormControlLabel 
                                                        value={JSON.stringify(address)} 
                                                        control={
                                                            <Radio 
                                                                size="small" 
                                                                color="secondary"
                                                                checked={address.is_default === 1 ? true : false}
                                                            />} 
                                                        label={address.name} 
                                                        className="w-full"  
                                                    />
                                                    <div className="ml-7 text-grey-200 text-sm">
                                                        <p className="text-sm font-light white">{ address?.house_address + ", " + address?.city + ", " + address?.state}</p>
                                                        <p className="">{address?.phone_number}</p>
                                                    </div>
                                                </FormControl>
                                                <ul className="flex flex-col space-y-1 text-primary-orange-200">
                                                    <Button
                                                    color="secondary"
                                                    endIcon={<CreateIcon />}
                                                    onClick={() => {
                                                        dispatch(toggleAddAddress({type: "edit", body: address, open: true}))
                                                        dispatch(toggleAddressBook())
                                                    }}>
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        endIcon={<DeleteIcon />}
                                                        onClick={() => setToggle(state => ({...state, del: true, id: address.id, name: address.name}))}>
                                                        Delete
                                                    </Button>
                                                </ul>
                                            </div>
                                        ))
                                    }
                                </div>
                            </RadioGroup>
                        </div>
                    }
                </div>
            </ModelWrapper>
        </>
    )
}

export default AddressBook