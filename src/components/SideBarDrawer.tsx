import { Drawer, Button, IconButton, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useLogoutMutation } from "../redux/api/Auth";
import { toggleLogout } from "../redux/slice/modal";
import { RootState } from "../redux/store";
import { BagIcon, CartIcon, DashboardIcon, HeadPhoneIcon, HeartIcon, LoginIcon, LogOutIcon, ProfilBG, Spinner, UserIcon, WalletIcon, WhiteLogo } from "./icons";
import Iicon from "./interface";
import { SideBarItem } from "./SideBar";

interface Item {
    Icon: React.FC<Iicon>;
    name: string;
    link: string;
    handleClick: () => void
}

function Item ({ Icon, name, link, handleClick}: Item): JSX.Element {
    let [active, setActive] = useState(false)
    let navigate = useNavigate()
    
    return(
        <li 
        className="flex items-center space-x-3 py-4 cursor-pointer text-white hover:text-primary-blue" 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => {
            handleClick()
            navigate(`/${link}`)
        }}
        >
            <Icon size="15" color={active ? "#1900FE" :"white"}/>
            <p>{name}</p>
        </li>
    )
}

export function SideBarDrawer({ open, close }: {open: boolean, close: () => void | any}){
    let {signout} = useAuth()
    const dispatch = useDispatch()
    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })
    

    const location = useLocation();
    const [currentLocation, setLocation] = useState('')
    return(
        <Drawer
            anchor='left'
            open={open}
            sx={{
                maxWidth: 480,
                width: '100%'
            }}
            className="block sm:hiddden">
            <ClickAwayListener onClickAway={close}>
                <div className="max-w-[450px] w-[280px] h-fit bg-white rounded-xl">
                    <div className="flex justify-end">
                        <IconButton onClick={close} sx={{width: 30, height: 30}}>
                            <i className="fa-solid fa-xmark hover:text-crimson text-lg"></i>
                        </IconButton>
                    </div>
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

                        {/* <SideBarItem 
                        Icon={SubscriptionIcon} name="subscription" link="subscription"
                        handleClick={setLocation}/> */}

                    </div>
                    <svg className="my-7 mx-auto" width="80%" height="2" viewBox="0 0 171 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="1" x2="170" y2="1" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8"/>
                    </svg>
                    <div>
                        <SideBarItem 
                        Icon={ProfilBG} name="profile" link="profile"
                        handleClick={setLocation}/>

                        {/* <SideBarItem 
                        Icon={GearIcon} name="setting" link="setting"
                        handleClick={setLocation}/> */}

                        <SideBarItem 
                        Icon={HeadPhoneIcon} name="support" link="support"
                        handleClick={setLocation}/>

                    </div>
                    {/* <div 
                        onClick={signout}
                        className="bg-primary-dark-blue py-6 px-3 rounded-xl flex space-x-3 text-white  justify-center items-center mr-2 ml-5">
                        {
                                loggingOut ? 
                                <div className='w-5 h-5'><Spinner /></div>:
                                <>
                                    <LogOutIcon color="white" size="15"/> 
                                    <p className='text-white font-semibold text-sm'>Logout</p>
                                </>
                            }
                    </div> */}
                    <Button
                        startIcon={<LogOutIcon color="#FF5000" size="15"/> }
                        color="secondary"
                        fullWidth
                        size="large"
                        className="mt-24"
                        onClick={() => dispatch(toggleLogout())}>
                            Logout
                    </Button>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}

export default SideBarDrawer