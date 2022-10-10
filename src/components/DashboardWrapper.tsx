import Body from "./Body";
import Categories from "./Categories";
import Header from "./Header";
import SideBar from "./SideBar";


import React from "react";
import {EditProfile} from "./Models/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Breadcrumb from "./Breadcrum";
import AddAddressModel from "./Models/AddAddressModel";
import AddressBook from "./Models/Addressbook";


function DashboardWrapper ({children}: React.PropsWithChildren): JSX.Element {
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full min-h-screen h-fit">
                <EditProfile />
                <AddAddressModel />
                <AddressBook />
                <Breadcrumb />
                <div 
                className="px-6 fp-screen sm:space-x-5 flex justify-between overflow-y-hidden">
                    {isAuth && <SideBar />}
                    <div className={`${isAuth ? 'sm:w-10/12': 'sm:w-full'} h-full w-full`}>
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