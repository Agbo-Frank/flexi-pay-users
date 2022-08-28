import { Button  } from "../../components"
import { QuestionIcon } from "../../components/icons"
import StoreIcon from "../../components/icons/StoreIcon";

function ProductVendor(){
    return(
        <div className=" gap-3 flex justify-between items-stretch">
            <div className="w-9/12 rounded-2xl bg-white">
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
                <div className="flex items-center space-x-3 w-6/12 p-4">
                    <Button color="#FF5000">
                        <p>Follow</p>
                    </Button>

                    <Button color="#FF5000" outline>
                        <p>Vendor Info</p>
                    </Button>
                </div>
            </div>
            <div className="w-3/12 rounded-2xl bg-white p-4">
                <div className="rounded-2xl bg-primary-orange-300 w-full py-10 grid place-items-center">
                    <div className="w-48 space-y-3">
                        <p className="text-center font-medium">Do you have products to sell?</p>
                        <Button outline color="#FF5000">Become a Vendor</Button>
                    </div>
                </div>

                <div className="rounded-2xl bg-primary-dark-blue text-white p-4 w-full flex space-x-3">
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