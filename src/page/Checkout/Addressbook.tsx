import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { WrapperHeader } from "../../components";
import { IAddAddress } from "../../components/interface";
import ModelWrapper from "../../components/Models/ModelWrapper";
import { AddressDetails } from "../../interface";




export function AddressBook({open, close, addresses}: {open: boolean, close: () => void | any, addresses?: AddressDetails[] | undefined}){
    return(
        <ModelWrapper isOpen={open} closeModal={close}>
            <div className="mt-4">
                <WrapperHeader>Address Book</WrapperHeader>
                <div className="border-y py-2 my-2">
                    <Button
                    color="secondary"
                    startIcon={<i className="fa-solid fa-circle-plus"></i>}>
                        Add A New Addresss
                    </Button>
                </div>
                <div className="ml-5">
                    addres
                    <RadioGroup
                        name="delivery-method"
                        // value={value}
                        // onChange={handleChange}
                    >
                        <div className="space-y-3 mr-2">
                            {
                                [1, 2, 3].map(address => (
                                    <div className="flex w-full justify-between items-center">
                                        <FormControl>
                                            <FormControlLabel value="door_delivery" control={<Radio size="small" color="secondary"/>} label="Francis Agbo" className="w-full"  />
                                            <div className="ml-7 text-grey-200 text-sm">
                                                <p className="text-sm font-light">temidire, IKOLE , Ekiti</p>
                                                <p className="">+2349061588791</p>
                                            </div>
                                        </FormControl>
                                        <ul className="flex flex-col space-y-1 text-primary-orange-200">
                                            <li className="flex justify-between space-x-2">
                                                <span className="text-sm font-medium">Edit</span>
                                                <i className="fa-sharp fa-solid fa-pen"></i>
                                            </li>
                                            <li className="flex justify-between space-x-2">
                                                <span className="text-sm font-medium">Delete</span>
                                                <i className="fa-solid fa-trash"></i>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default AddressBook