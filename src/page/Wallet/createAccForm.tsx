import ModelWrapper from "../../components/Models/ModelWrapper";
import { FormInput } from "../../components";
import { UserIcon } from "../../components/icons";
import { Button } from "@mui/material";
import { IUser } from "../../interface";
import { FPcreateAccForm } from "./service";
import { useCreateAccountMutation } from "../../redux/api/wallet";
import { LoadingButton } from "@mui/lab";
import useMediaQuery from '@mui/material/useMediaQuery';

export function CreateAccForm({userData, open, close}: {userData: IUser | null | undefined, open: boolean, close:() => void | any}){
    let [createAccount, {data, isLoading}] = useCreateAccountMutation()
    const formik = FPcreateAccForm(userData, createAccount, close)
    const matches = useMediaQuery('(min-width:600px)'); 
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Get an account with us">
            <form className="py-5 px-4 h-full" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:gap-4">
                    <FormInput
                        type="text"
                        name="first_name"
                        Icon={UserIcon}
                        label={userData ? userData.first_name?.toLocaleUpperCase() : "First Name"}
                        formik={formik}
                    />
                    <FormInput 
                        type="text"
                        name="last_name"
                        Icon={UserIcon}
                        label={userData ? userData.last_name?.toLocaleUpperCase() : "Last Name"}
                        formik={formik}
                    />
                </div>

                <div className="flex flex-col sm:flex-row w-full justify-between items-center sm:gap-4">
                    <FormInput
                        type="text"
                        name="email"
                        Icon={UserIcon}
                        label={userData ? userData.email : "Email"}
                        formik={formik}
                    />
                    <FormInput 
                        type="text"
                        name="phone_number"
                        Icon={UserIcon}
                        label={userData ? userData.phone_number : "Phone Number"}
                        formik={formik}
                    />
                </div>

                <FormInput
                    type="text"
                    name="bvn"
                    Icon={UserIcon}
                    label="BVN"
                    formik={formik}
                />
                
                <div className="flex sm:w-10/12 mx-auto mt-5 sm:mt-7 items-center gap-5">
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        size={matches ? "large" : "medium"}  
                        className="w-1/2"
                        onClick={close}>Cancel</Button>
                    <LoadingButton 
                        type="submit"
                        variant="contained" 
                        color="secondary" 
                        size={matches ? "large" : "medium"} 
                        className="w-1/2"
                        loading={isLoading}>
                            Get an Account
                    </LoadingButton>
                </div>
            </form>
        </ModelWrapper>
    )
}