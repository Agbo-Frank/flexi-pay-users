import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ModelWrapper from "./ModelWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleAddAddress, toggleAddressBook } from "../../redux/slice/modal";
import { useGetDeliveryAddressQuery } from "../../redux/api/User";
import Empty from "../Empty";
import { AddressIcon } from "../icons";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';




export function AddressBook(){
    let open = useSelector((state: RootState) => state.modal.addressBook)
    let dispatch= useDispatch()
    const { loading, address } = useGetDeliveryAddressQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            address: data?.result.data,
            loading: isLoading
        })
    })
    console.log(address)
    return(
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
                            // onChange={handleChange}
                        >
                            <div className="space-y-3 mr-2">
                                {
                                    address?.map(address => (
                                        <div className="flex w-full justify-between items-center">
                                            <FormControl>
                                                <FormControlLabel 
                                                    value="door_delivery" 
                                                    control={
                                                        <Radio 
                                                            size="small" 
                                                            color="secondary"
                                                            checked={address.is_default === 1 ? true : false}
                                                        />} 
                                                    label="Francis Agbo" 
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
                                                endIcon={<DeleteIcon />}>
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
    )
}

export default AddressBook