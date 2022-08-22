import ModelWrapper from "../../components/Models/ModelWrapper";
import { FormInput } from "../../components";
import { UserIcon } from "../../components/icons";
import { Button } from "@mui/material";
import { IUser } from "../../interface";
import { FPcreateAccForm } from "./service";
import { useCreateAccountMutation } from "../../redux/slice/wallet";
import { LoadingButton } from "@mui/lab";

export function CreateAccForm({userData, open, close}: {userData: IUser | null | undefined, open: boolean, close:() => void | any}){
    let [createAccount, {data, isLoading}] = useCreateAccountMutation()
    const formik = FPcreateAccForm(userData, createAccount, close)
    return(
        <ModelWrapper isOpen={open} closeModal={close}>
            <p className="text-lg px-4 text-grey-200 font-medium mb-6 sticky left-0">Get an account with us</p>
            <form className="px-3" onSubmit={formik.handleSubmit}>
                <div className="flex w-full justify-between items-center gap-4">
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

                <div className="flex w-full justify-between items-center gap-4">
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
                
                <div className="flex w-10/12 mx-auto mt-9 items-center gap-5">
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="large" 
                        className="w-1/2"
                        onClick={close}>Cancel</Button>
                    <LoadingButton 
                        type="submit"
                        variant="contained" 
                        color="secondary" 
                        size="large" 
                        className="w-1/2"
                        loading={isLoading}>
                            Get an Account
                    </LoadingButton>
                </div>
            </form>
        </ModelWrapper>
    )
}