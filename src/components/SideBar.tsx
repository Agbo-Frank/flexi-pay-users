import React, { useEffect, useState } from "react";

import BagIcon from "./icons/Bag";
import CartIcon from "./icons/CartIcon";
import DashboardIcon from "./icons/DashboardIcon";
import GearIcon from "./icons/GearIcon";
import HeadPhoneIcon from "./icons/HeadPhoneIcon";
import HeartIcon from "./icons/HeartIcon";
import LogOutIcon from "./icons/LogOutIcon";
import ProfilBG from "./icons/ProfilBG";
import WalletIcon from "./icons/WalletIcon";

import Iicon from "./icons/interface";

import { Link, NavLink, useLocation } from 'react-router-dom'

interface ISideBarItem {
    active?: boolean,
    Icon: React.FC<Iicon>;
    name: string;
    link: string;
    handleClick: (a:string) => void
}


function SideBarItem ({ active = false, Icon, name, link, handleClick}: ISideBarItem): JSX.Element {
    let [active_, setActive] = useState(active)

    const location = useLocation()

    function click(){
        handleClick(link)
    }
    return(
        <NavLink to={`/${link}`} className="flex gap-2 mb-3 items-center cursor-pointer sidebar" 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {if(!active)setActive(false)}}
        onClick={() => handleClick(link)}
        >
            <div className={`rounded-full ${active_ && 'bg-primary-blue'} w-2 h-9`}></div>
            <div 
            className={`flex justify-start capitalize gap-6 rounded-l-2xl ${active_ ? 'bg-grey-500 font-semibold text-primary-dark-blue' : 'text-grey-700' } text-primary-dark-blue px-5 py-5 w-full`}>
                <Icon size="20" color={active_ ? "#1900FE" :"#A0A0A1"}/>
                <p>{name}</p>
            </div>
        </NavLink>
    )
}

function SideBar(): JSX.Element {
    const location = useLocation();
    const [currentLocation, setLocation] = useState('')

    // let currentLocation = location.pathname.split('/')[2]
    console.log(currentLocation)
  return (
    <div className="w-56 2xl:w-2/12 bg-white pt-9 pb-2 rounded-4xl">
        <div>
            <SideBarItem 
            active={currentLocation === '' ? true : false}  
            Icon={DashboardIcon} name="overview" link=""
            handleClick={setLocation}/>

            <SideBarItem 
            active={currentLocation === 'wallet' ? true : false} 
            Icon={WalletIcon} name="wallet" link="wallet"
            handleClick={setLocation}/>

            <SideBarItem 
            active={currentLocation === 'cart' ? true : false} 
            Icon={CartIcon} name="cart" link="cart"
            handleClick={setLocation}/>

            <SideBarItem 
            active={currentLocation === 'saveditems' ? true : false} 
            Icon={HeartIcon} name="saved items" link="saved-items"
            handleClick={setLocation}/>

            <SideBarItem 
            active={currentLocation === 'order' ? true : false} 
            Icon={BagIcon} name="order" link="order"
            handleClick={setLocation}/>

        </div>
        <svg className="my-7 mx-auto" width="171" height="2" viewBox="0 0 171 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="1" x2="170" y2="1" stroke="#A0A0A1" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8"/>
        </svg>
        <div>
            {/* <SideBarItem 
            active={currentLocation === 'profile' ? true : false} 
            Icon={ProfilBG} name="profile" link="profile"/>

            <SideBarItem 
            active={currentLocation === 'setting' ? true : false} 
            Icon={GearIcon} name="setting" link="setting"
            handleClick/>

            <SideBarItem 
            active={currentLocation === 'support' ? true : false} 
            Icon={HeadPhoneIcon} name="support" link="support"
            handleClick/> */}

        </div>
        <div className="bg-primary-dark-blue py-6 px-3 rounded-3xl flex gap-3 text-white mt-10 justify-center mr-2 ml-5">
            <LogOutIcon size="20" color="white"/>
            <p>Logout</p>
        </div>
    </div>
  );
}

export default SideBar;