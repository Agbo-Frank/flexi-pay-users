import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

import BagIcon from "./icons/Bag";
import CartIcon from "./icons/CartIcon";
import DashboardIcon from "./icons/DashboardIcon";
import GearIcon from "./icons/GearIcon";
import HeadPhoneIcon from "./icons/HeadPhoneIcon";
import {HeartIcon} from "./icons";
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
    let [active_, setActive] = useState(false)
    let nav = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        if(nav.current?.classList.contains('active')){
            setActive(true)
        }
    })
    
    return(
        <NavLink 
        ref={nav}
        to={`/${link}`} 
        className="flex gap-2 mb-3 items-center cursor-pointer sidebar" 
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
    <div className="w-56 h-fit 2xl:w-2/12 bg-white pt-9 pb-2 rounded-4xl">
        <div>
            <SideBarItem 
            Icon={DashboardIcon} name="overview" link="dashboard"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={WalletIcon} name="wallet" link="wallet"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={CartIcon} name="cart" link="cart"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={HeartIcon} name="saved items" link="saved-items"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={BagIcon} name="order" link="order"
            handleClick={setLocation}/>

        </div>
        <svg className="my-7 mx-auto" width="171" height="2" viewBox="0 0 171 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="1" x2="170" y2="1" stroke="#A0A0A1" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8"/>
        </svg>
        <div>
            <SideBarItem 
            Icon={ProfilBG} name="profile" link="profile"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={GearIcon} name="setting" link="setting"
            handleClick={setLocation}/>

            <SideBarItem 
            Icon={HeadPhoneIcon} name="support" link="support"
            handleClick={setLocation}/>

        </div>
        <div className="bg-primary-dark-blue py-6 px-3 rounded-3xl flex gap-3 text-white mt-10 justify-center mr-2 ml-5">
            <LogOutIcon size="20" color="white"/>
            <p>Logout</p>
        </div>
    </div>
  );
}

export default SideBar;