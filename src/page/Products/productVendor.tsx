import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QuestionIcon } from "../../components/icons"
import StoreIcon from "../../components/icons/StoreIcon";
import { FLEXIPAY_VENDOR_URL} from '../../utils/constants'

function ProductVendor(){
    let navigate = useNavigate()
    return(
        <div className="gap-3 sm:gap-5 flex flex-col sm:flex-row justify-between items-stretch bg-white sm:bg-transparent my-3 sm:my-0">
            <div className="w-[87%] mx-auto sm:w-9/12 rounded-2xl bg-[#f4f4f4] sm:bg-white">
                <p className="p-4 border-b font-medium text-md">Seller Information</p>
                <ul className="text-grey-1200 space-y-4 p-4">
                    <li className="flex space-x-3 items-center">
                        <div className="flex space-x-2 items-center">
                            <StoreIcon color="#222222" size="15"/>
                            <p>Store Name:</p>
                        </div>
                        <p>Duchess Store</p>
                    </li>
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Verified Customer’s Reivews</p>
                        <p>291</p>
                    </li>
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Seller Score</p>
                        <p>94%</p>
                    </li>
                    {/* <li className="flex text-sm space-x-3 items-center">
                        <p>Number of Followers</p>
                        <p>150</p>
                    </li> */}
                </ul>
                <div className="pl-4 pb-5">
                    <Button 
                        color="secondary" 
                        variant="outlined"
                        size="large"
                        // startIcon={<i className="text-[10px] text-white fa-solid fa-user-check"></i>}
                        >
                            Vendor Info
                    </Button> 
                </div>
            </div>
            <div className="w-[93%] mx-auto sm:w-3/12 rounded-2xl bg-white p-4 sm:border-0 space-y-4">
                <div className="rounded-2xl bg-primary-orange-300 mx-auto sm:mx-0 w-10/12 sm:w-full py-10 grid place-items-center">
                    <div className="w-48 space-y-3">
                        <p className="text-center font-medium">Do you have products to sell?</p>
                        <a className="w-auto flex justify-center" href={FLEXIPAY_VENDOR_URL} target="_blank">
                            <Button 
                                color="secondary" 
                                variant="outlined">
                            Become a Vendor</Button>
                        </a>
                    </div>
                </div>

                <div className="rounded-2xl bg-primary-dark-blue text-white p-4 mx-auto sm:mx-0 w-10/12 sm:w-full flex space-x-3">
                    <QuestionIcon color="white" size="30"/>
                    <div className="w-48 space-y-3">
                        <p className="font-medium">Do You Have any Questions?</p>
                        <p className="text-sm font-thin">Feel free to reach us</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductVendor