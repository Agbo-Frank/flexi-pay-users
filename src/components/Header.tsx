import BellIcon from "./icons/Bell"
import CartIcon from "./icons/CartIcon"
import Logo from "./icons/logo"
import MessageIcon from "./icons/MessageIcon"
import ProfilBG from "./icons/ProfilBG"
import SearchIcon from "./icons/SearchIcon"
import { useAuth } from "../context/Auth"
import Button from "./Button"
import { BagIcon, HeartIcon, LoginIcon, LogOutIcon, Spinner, UserIcon } from "./icons"
import { useState } from "react"
import Slide from "react-reveal/Slide"
import { Link, useNavigate } from "react-router-dom"
import Iicon from "./interface"
import { useLogoutMutation } from "../redux/slice/Auth"
import { unsetToken } from "../redux/slice/OtherData"
import { useGetUserQuery } from "../redux/slice/User"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Avatar, Badge, ClickAwayListener, Skeleton, Stack } from "@mui/material"
import { Drawer } from "."

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
        className="flex items-center space-x-3 pl-5 py-3 cursor-pointer text-grey-1300 hover:text-primary-blue" 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => {
            handleClick()
            navigate(`/${link}`)
        }}
        >
            <Icon size="15" color={active ? "#1900FE" :"#474747"}/>
            <p>{name}</p>
        </li>
    )
}

export function Header(){
    let {signout} = useAuth()
    let {data: user, isLoading: loading} = useGetUserQuery()
    let isAuth = useSelector((state: RootState) => state.data.isAuth)

    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })
    let [toggle, setToggle] = useState(false)
    let [openDrawer, setOpenDrawer] = useState(false)

    let navigate = useNavigate()
    let date = new Date()
    let time = date.getHours() > 11 ?  date.getHours() >  17 ? 'evening' : 'afternoon' : 'morning'
    return(
        <>
            <header className="bg-white w-full">
                <div className="fp-screen flex justify-between py-5 bg-white items-end">
                    <Logo />
                    <div className="flex justify-between bg-white rounded-xl items-center w-5/12 p-1 pl-3 shadow-sm">
                        <input type='text' placeholder="Search products, categories and services" className="w-11/12"/>

                        <div className="bg-primary-orange-200 rounded-xl border py-2 p-2">
                            <SearchIcon size='18' color='#FFFFFF'/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-4/12">
                        {
                            !isAuth ? 
                            <div className="flex space-x-5 justify-end ml-auto w-8/12">
                                <Button outline color="#FF5000" onClick={() => navigate('/login')}>
                                    <div className="flex items-center space-x-2">
                                        <LoginIcon size="14" color="#FF5000"/>
                                        <p className="text-sm font-medium">Log in</p>
                                    </div>
                                </Button>
                                <Button color="#FF5000" onClick={() => navigate('/register')}><p className="text-sm font-medium">Register</p></Button>
                            </div>:
                            <>
                                <ul className="flex justify-evenly items-center w-3/6">
                                    <Badge color="secondary" overlap="circular" badgeContent={1}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <MessageIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                    <Badge 
                                        color="secondary" 
                                        overlap="circular" 
                                        badgeContent={9}
                                        onClick={() => setOpenDrawer(state => !state)}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <BellIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                    <Badge color="secondary" overlap="circular" badgeContent={2}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <CartIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                </ul>

                                <div className="relative z-50">
                                    {
                                        loading ? 
                                        <div className="flex items-center space-x-2 w-full">
                                            <div className="flex flex-col items-end">
                                                <Skeleton variant="text" width={120} height={20}/>
                                                <Skeleton variant="text" width={70} height={20}/>
                                            </div>
                                            <Skeleton variant="circular" width={40} height={40}/>
                                        </div> :
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex flex-col justify-items-end">
                                                <p className="text-xs capitalize">good { time }</p>
                                                <p className="font-bold capitalize ml-auto">{user?.first_name}</p>
                                            </div>
                                            <div 
                                                className="w-11 h-11 bg-white rounded-full flex justify-center items-center cursor-pointer"
                                                onClick={() => setToggle(state => !state)}>
                                                <ProfilBG size="20" color="#000541"/>
                                            </div>
                                        </div>
                                    }
                                    <div className="absolute overflow-hidden w-48 rounded-xl z-50">
                                        <Slide top when={toggle} duration={300}>
                                            <ul className={`${toggle ? 'block' : 'hidden'} translate-y-2 text-sm top-full rounded-xl z-50 bg-white shadow-lg pb-1`}>
                                                <Item Icon={UserIcon} name="Profile" link="profile" handleClick={() => setToggle(false)} />
                                                <Item Icon={BagIcon} name="Order" link="order" handleClick={() => setToggle(false)} />
                                                <Item Icon={HeartIcon} name="Saved Item" link="saved-items" handleClick={() => setToggle(false)} />

                                                <li className="w-10/12 mx-auto mb-2">
                                                    <Button color="#FF5000" onClick={signout}>
                                                        <div className='flex items-center gap-3'>
                                                            {
                                                                loggingOut ? 
                                                                <div className='w-5 h-5'><Spinner /></div>:
                                                                <>
                                                                    <LogOutIcon color="white" size="15"/> 
                                                                    <p className='text-white font-semibold text-sm'>Logout</p>
                                                                </>
                                                            }
                                                        </div>
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Slide>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </header>

            {/* <ClickAwayListener > */}
                <Drawer open={openDrawer} setOpenDrawer={setOpenDrawer}/>
            {/* </ClickAwayListener> */}
        </>
    )
}

export default Header