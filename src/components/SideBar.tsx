import React, { useState } from "react";
import BagIcon from "./icons/Bag";
import CartIcon from "./icons/CartIcon";
import DashboardIcon from "./icons/DashboardIcon";
import GearIcon from "./icons/GearIcon";
import HeadPhoneIcon from "./icons/HeadPhoneIcon";
import HeartIcon from "./icons/HeartIcon";
import Iicon from "./icons/interface";
import LogOutIcon from "./icons/LogOutIcon";
import ProfilBG from "./icons/ProfilBG";
import WalletIcon from "./icons/WalletIcon";

interface ISideBarItem {
    active?: boolean,
    Icon: React.FC<Iicon>;
    name: string
}


function SideBarItem ({ active = false, Icon, name }: ISideBarItem): JSX.Element {
    let [active_, setActive] = useState(active)
    return(
        <div className="group flex gap-2 mb-3 items-center cursor-pointer" 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {if(!active)setActive(false)}}>
            <div className={`rounded-full ${active_ && 'bg-primary-blue'} w-2 h-9`}></div>
            <div 
            className={`flex justify-start capitalize gap-6 rounded-l-2xl ${active_ ? 'bg-grey-500 font-semibold text-primary-dark-blue' : 'text-grey-700' } text-primary-dark-blue px-5 py-5 w-full`}>
                <Icon size="20" color={active_ ? "#1900FE" :"#A0A0A1"}/>
                <p>{name}</p>
            </div>
        </div>
    )
}

function SideBar(): JSX.Element {
  return (
    <div className="w-56 2xl:w-2/12 bg-white py-9 rounded-4xl">
        <div>
            <SideBarItem Icon={DashboardIcon} name="overview"/>
            <SideBarItem Icon={WalletIcon} name="wallet"/>
            <SideBarItem active={true} Icon={CartIcon} name="cart"/>
            <SideBarItem Icon={HeartIcon} name="saved items"/>
            <SideBarItem Icon={BagIcon} name="order"/>
        </div>
        <svg className="my-10 mx-auto" width="171" height="2" viewBox="0 0 171 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="1" x2="170" y2="1" stroke="#A0A0A1" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8"/>
        </svg>
        <div>
            <SideBarItem Icon={ProfilBG} name="profile"/>
            <SideBarItem Icon={GearIcon} name="setting"/>
            <SideBarItem Icon={HeadPhoneIcon} name="support"/>
        </div>
        <div className="bg-primary-dark-blue py-6 px-3 rounded-3xl flex gap-3 text-white mt-10 justify-center mr-2 ml-5">
            <LogOutIcon size="20" color="white"/>
            <p>Logout</p>
        </div>
    </div>
  );
}

export default SideBar;