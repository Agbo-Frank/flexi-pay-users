import Body from "./Body";
import Categories from "./Categories";
import Header from "./Header";
import SideBar from "./SideBar";


import React from "react";

import OrderDetails from "./Models/OrderDetails";
import ProductReview from "./Models/ProductReview";
import Tracker from "./Models/Tracker";
import {EditProfile} from "./Models/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Breadcrumb from "./Breadcrum";
import AddAddressModel from "./Models/AddAddressModel";


function DashboardWrapper ({children}: React.PropsWithChildren): JSX.Element {
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <OrderDetails />
                <ProductReview />
                <Tracker />
                <EditProfile />
                <AddAddressModel />
                
                <Header />
                <Categories />
                <Breadcrumb />
                <div 
                className="px-6 fp-screen space-x-5 flex justify-between overflow-y-hidden">
                    {isAuth && <SideBar />}
                    <div className={`${isAuth ? 'w-10/12': 'w-full'} h-full`}>
                        {children}
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default DashboardWrapper


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