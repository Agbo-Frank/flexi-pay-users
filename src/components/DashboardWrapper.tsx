import Body from "./Body";
import Categories from "./Categories";
import Header from "./Header";
import SideBar from "./SideBar";


import React from "react";

import OrderDetails from "./Models/OrderDetails";
import ProductReview from "./Models/ProductReview";
import Tracker from "./Models/Tracker";
import Alert from "./Models/Alert";
import Button from "./Button";
import AddAddressModel from "./Models/AddAddressModel";
import AddCreditCard from "./Models/AddCreditcard";


function DashboardWrapper ({children}: React.PropsWithChildren): JSX.Element {
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <OrderDetails />
                <ProductReview />
                <Tracker />

                {/* <Alert message="You’re About to Remove 43 Inches D-LED TV +1 Years Warranty - Black From Your Saved Items" isError>
                    <div className="flex gap-6">
                        <Button outline color="#FF5000">
                            <p>Cancel</p>
                        </Button>
                        <Button type="submit" color="#FF5000">
                            <p>Yes, Remove</p>
                        </Button>
                    </div>
                </Alert> */}
                
                <Header />
                <Categories />
                <ul className="flex xl:px-fp-5 2xl:px-fp-10 my-6 text-sm">
                    <li className="text-grey-700">Home /</li> 
                    <li> Overview</li>
                </ul>
                <div className="flex px-6 justify-between xl:px-fp-5 2xl:px-fp-10">
                    <SideBar />
                    <div className="h-full w-9/12 overflow-y-hidden ">
                        {children}
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default DashboardWrapper