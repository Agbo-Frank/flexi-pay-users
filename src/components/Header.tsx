import { useAuth } from "../context/Auth"
import Button from "./Button"
import { 
    MessageIcon, ProfilBG, 
    CartIcon, BellIcon, 
    BagIcon, HeartIcon, 
    LoginIcon, LogOutIcon, 
    Spinner, UserIcon, Logo 
} from "./icons"
import React, { useEffect, useState } from "react"
import Slide from "react-reveal/Slide"
import { useNavigate } from "react-router-dom"
import Iicon from "./interface"
import { useLogoutMutation } from "../redux/api/Auth"
import { useLazyGetUserQuery } from "../redux/api/User"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { Avatar, Badge, IconButton, Skeleton } from "@mui/material"
import { Drawer, SearchBar } from "."
import { useLazyGetUserCartQuery } from "../redux/api/Cart"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../utils/constants"
import MenuIcon from '@mui/icons-material/Menu';
import { MenuDrawer, SideBarDrawer } from './'
import useMediaQuery from '@mui/material/useMediaQuery';

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
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let [getUser, {data: user, isLoading: loading}] = useLazyGetUserQuery()
    let [getCart, { carts }] = useLazyGetUserCartQuery({
        selectFromResult: ({data}) => ({
            carts: data?.result.data,
        })
    })
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        if(isAuth){
            getUser()
        }
        if(isAuth || cookies["flex-pay-cookie"]){
            getCart({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""})
        }
    }, [isAuth])

    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })
    let [toggle, setToggle] = useState(false)
    let [openDrawer, setOpenDrawer] = useState({
        notification: false,
        menu: false,
        sideBar: false
    })

    let navigate = useNavigate()
    let date = new Date()
    let time = date.getHours() > 11 ?  date.getHours() >  17 ? 'evening' : 'afternoon' : 'morning'

    return(
        <>  
            <MenuDrawer open={openDrawer.menu} close={() => setOpenDrawer(state => ({...state, menu: false}))}/>
            <SideBarDrawer open={openDrawer.sideBar} close={() => setOpenDrawer(state => ({...state, sideBar: false}))}/>
            <header className="bg-white w-full shadow sm:shadow-none sticky top-0 right-0 left-0 z-[100]">
                <div className="fp-screen flex justify-between py-2 sm:py-5 bg-white items-center sm:items-end">
                    <div className="flex items-center gap-2">
                        {
                            !matches && 
                            <IconButton 
                                className="sm:hidden"
                                onClick={() => setOpenDrawer(state => ({...state, menu: true}))}>
                                <MenuIcon />
                            </IconButton>
                        }
                        <Logo />
                    </div>
                    
                    
                    <div className="hidden sm:block w-5/12">
                        <SearchBar />
                    </div>
                    <div className="flex items-center justify-between sm:w-4/12">
                        {
                            !isAuth ? 
                            <div className="hidden sm:flex space-x-5 justify-end ml-auto w-8/12">
                                <Button outline color="#FF5000" onClick={() => navigate('/login')}>
                                    <div className="flex items-center space-x-2">
                                        <LoginIcon size="14" color="#FF5000"/>
                                        <p className="text-sm font-medium">Log in</p>
                                    </div>
                                </Button>
                                <Button color="#FF5000" onClick={() => navigate('/register')}><p className="text-sm font-medium">Register</p></Button>
                            </div>:
                            <>
                                <ul className="hidden sm:flex justify-evenly items-center w-3/6">
                                    <Badge color="secondary" overlap="circular" badgeContent={1}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <MessageIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                    <Badge 
                                        color="secondary" 
                                        overlap="circular" 
                                        badgeContent={9}
                                        onClick={() => setOpenDrawer(state => ({...state, notification: !state.notification}))}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <BellIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                    <Badge  
                                        color="secondary" 
                                        overlap="circular" 
                                        badgeContent={carts?.length}
                                        onClick={() => navigate("/cart", { replace: true })}>
                                        <Avatar sx={{bgcolor: '#000326', width: 44, height: 44}}>
                                            <CartIcon size="20" color="#F9F8FF"/> 
                                        </Avatar>
                                    </Badge>
                                </ul>

                                <div className="relative z-50">
                                    {
                                        loading ? 
                                        <div className="flex items-center space-x-2 w-full">
                                            <div className="hidden sm:flex flex-col items-end">
                                                <Skeleton variant="text" width={120} height={20}/>
                                                <Skeleton variant="text" width={70} height={20}/>
                                            </div>
                                            <Skeleton variant="circular" width={40} height={40}/>
                                        </div> :
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="hidden sm:flex flex-col justify-items-end">
                                                <p className="text-xs capitalize">good { time }</p>
                                                <p className="font-bold capitalize ml-auto">{user?.result?.data.first_name}</p>
                                            </div>
                                            <div 
                                                className="hidden w-8 h-8 sm:w-11 sm:h-11 bg-white rounded-full sm:flex justify-center items-center cursor-pointer border border-[#E8E5FF] mr-3"
                                                onClick={() => setToggle(state => !state)}>
                                                <ProfilBG size={matches ? "20" : "15"} color="#000541"/>
                                            </div>
                                            {/* <Avatar /> */}
                                        </div>
                                    }
                                    <div className="hidden sm:block absolute overflow-hidden w-48 rounded-xl z-50">
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
                        {
                            !loading &&
                            <div className="flex gap-2 justify-end items-center mr-3">
                                <Badge  
                                    color="secondary" 
                                    overlap="circular"
                                    badgeContent={carts?.length}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClick={() => navigate("/cart", { replace: true })}>
                                    <div 
                                        className="sm:hidden w-8 h-8 sm:w-11 sm:h-11 bg-white rounded-full flex justify-center items-center cursor-pointer border border-[#E8E5FF]">
                                        <CartIcon size={matches ? "20" : "15"} color="#000541"/>
                                    </div>
                                </Badge>
                                <div 
                                    className="sm:hidden w-8 h-8 sm:w-11 sm:h-11 bg-white rounded-full flex justify-center items-center cursor-pointer border border-[#E8E5FF]"
                                    onClick={() => {
                                        if(isAuth){
                                            // setOpenDrawer(state => ({...state, sideBar: true}))
                                            navigate("/dashboard")
                                        }
                                        else{
                                            navigate("/login")
                                        }
                                    }}>
                                    <ProfilBG size={matches ? "20" : "15"} color="#000541"/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </header>
            <Drawer open={openDrawer.notification} close={() => setOpenDrawer(state => ({...state, notification: false}))}/>
        </>
    )
}

export default Header