import { Button } from "@mui/material";
import { QuestionIcon } from "../../components/icons"
import StoreIcon from "../../components/icons/StoreIcon";

function ProductVendor(){
    return(
        <div className=" gap-3 flex flex-col sm:flex-row justify-between items-stretch bg-white my-3 sm:my-0">
            <div className="w-[87%] mx-auto sm:w-9/12 rounded-2xl bg-[#f4f4f4] sm:bg-white">
                <p className="p-4 border-b border-grey-900 font-medium text-md">Seller Information</p>
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
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Number of Followers</p>
                        <p>150</p>
                    </li>
                </ul>
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 sm:w-6/12 p-4">
                    <Button 
                        color="secondary" 
                        variant="contained"
                        size="large"
                        className="w-full"
                        startIcon={<i className="text-[10px] text-white fa-solid fa-user-check"></i>}>
                            Follow
                        </Button>
                    <Button 
                        color="secondary" 
                        variant="outlined"
                        size="large"
                        className="w-full"
                        startIcon={<i className="text-[10px] fa-solid fa-user"></i>}>
                            Vendor Info
                        </Button>
                </div>
            </div>
            <div className="w-[93%] mx-auto sm:w-3/12 rounded-2xl bg-white p-4 sm:border-0 space-y-4">
                <div className="rounded-2xl bg-primary-orange-300 mx-auto sm:mx-0 w-10/12 sm:w-full py-10 grid place-items-center">
                    <div className="w-48 space-y-3">
                        <p className="text-center font-medium">Do you have products to sell?</p>
                        <Button color="secondary" variant="outlined">Become a Vendor</Button>
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