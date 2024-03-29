import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { FormInput, SelectInput } from "../../components";
import { MailIcon, MessageIcon, NairaIcon, PhoneIcon, UserIcon } from "../../components/icons";
import ModelWrapper from "../../components/Models/ModelWrapper";
import { useGetUserQuery } from "../../redux/api/User";
import { useFundWalletByCardMutation } from "../../redux/api/wallet";
import { FundWalletByCard } from "./service";



export function FundWallet({open, close}: {open: boolean; close: () => void | any}){
    let { data } = useGetUserQuery()
    let [fundwallet, { isLoading }] = useFundWalletByCardMutation()
    let formik = FundWalletByCard(fundwallet, close)
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Fund Wallet"
            size="medium"
            >
            <div className="h-full overflow-y-auto scrollbar relative">
                {/* <p className="font-light px-1 sm:px-3">Fund your wallet by card</p> */}

                <form className="w-full px-2 sm:px-5" onSubmit={formik.handleSubmit}>
                    <FormInput
                        type="text" 
                        name="full_name" 
                        label={
                            data?.result.data.first_name ? 
                            data?.result.data.first_name.toUpperCase() + " " + data?.result.data.last_name?.toUpperCase() :
                            "Full Name"
                        }
                        Icon={UserIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="email" 
                        name="email" 
                        label={data?.result.data.email || "Email"}
                        Icon={MailIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="phone_number" 
                        label={data?.result.data.phone_number || "Phone Number"}
                        Icon={PhoneIcon}
                        formik={formik}
                    />
                    <FormInput 
                        type="text" 
                        name="amount" 
                        label="Amount"
                        Icon={NairaIcon}
                        formik={formik}
                    />
                    <div className="flex justify-center items-center gap-4 my-5 sm:my-8 w-full sm:w-10/12 mx-auto">
                        <Button
                            variant="outlined" 
                            color="secondary" 
                            type="button"
                            sx={{width: '50%'}}
                            onClick={close}>
                                Cancel
                        </Button>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disableElevation
                            size="large"
                            sx={{width: '50%'}}>
                                Fund Wallet
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </ModelWrapper>
    )
}

export default FundWallet