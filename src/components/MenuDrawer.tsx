import { Drawer, Button as MuiButton, IconButton, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useLogoutMutation } from "../redux/api/Auth";
import { useGetCategoriesQuery } from "../redux/api/Product";
import { RootState } from "../redux/store";
import Button from "./Button";
import { BagIcon, CartIcon, DashboardIcon, HeartIcon, LoginIcon, LogOutIcon, Spinner, UserIcon, WhiteLogo } from "./icons";
import Iicon from "./interface";


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


export function MenuDrawer({ open, close }: {open: boolean, close: () => void | any}){
    let {signout} = useAuth()
    let navigate = useNavigate()
    let [logout, {isLoading: loggingOut}] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })

    let { categories, loading } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })

    return(
        <Drawer
            anchor='left'
            open={open}
            sx={{
                maxWidth: 450,
                width: '100%'
            }}
            className="block sm:hiddden">
            <ClickAwayListener onClickAway={close}>
                <div className="max-w-[450px] w-[280px] h-screen  bg-primary-dark-blue py-5 px-4">
                    <div className="flex justify-between items-start">
                        <WhiteLogo />
                        <IconButton onClick={close} sx={{width: 30, height: 30}}>
                            <i className="fa-solid fa-xmark hover:text-crimson text-lg text-white"></i>
                        </IconButton>
                    </div>
                    <ul className={`text-sm top-full shadow-lg pb-1 mt-4`}>
                        <Item Icon={DashboardIcon} name="Dashboard" link="dashboard" handleClick={close} />
                        <Item Icon={CartIcon} name="Cart" link="cart" handleClick={close} />
                        <Item Icon={BagIcon} name="Order" link="order" handleClick={close} />
                        <Item Icon={HeartIcon} name="Saved Item" link="saved-items" handleClick={close} />
                    </ul>
                    {/* {
                        isAuth &&
                        <div className="space-y-5">
                            <MuiButton 
                                variant="outlined" 
                                color="secondary" 
                                onClick={() => navigate('/auth/login')}
                                fullWidth
                                size="large"
                                startIcon={<LoginIcon size="14" color="#FF5000"/>}>
                                    Log in
                            </MuiButton>
                            <MuiButton 
                                color="secondary" 
                                fullWidth
                                size="large"
                                variant="contained"
                                onClick={() => navigate('/auth/register')}><p className="text-sm font-medium">Register</p></MuiButton>
                        </div>
                    } */}
                    <div className="border-y border-white my-5 py-5">
                        <h3 className="text-primary-orange-200 font-medium">CATEGORIES</h3>
                        <ul className="my-3">
                            {
                                !loading && categories?.length && 
                                categories?.map((category, idx) => 
                                    <li key={idx} className="text-white mb-2" >
                                        {category.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="w-full h-fit  overflow-hidden rounded-xl">
                        <div className="relative flex w-full h-fit overflow-hidden rounded-xl p-1">
                            <div className="absolute inline-flex top-0 left-0 rounded-xl animate-ping h-full w-full bg-white"></div>
                            <a className="relative py-2 rounded-xl text-center bg-white text-primary-orange-200 w-full">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}

export default MenuDrawer