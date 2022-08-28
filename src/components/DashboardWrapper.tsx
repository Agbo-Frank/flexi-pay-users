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


function DashboardWrapper ({children}: React.PropsWithChildren): JSX.Element {
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit">
                <OrderDetails />
                <ProductReview />
                <Tracker />
                <EditProfile />
                
                <Header />
                <Categories />
                <div className="fp-screen flex justify-between items-center">
                    <ul className="flex my-5 text-sm">
                        <li className="text-grey-700">Home /</li> 
                        <li> Overview</li>
                    </ul>
                </div>
                <div 
                className="px-6 fp-screen space-x-9 flex justify-between items-stretch overflow-y-hidden">
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