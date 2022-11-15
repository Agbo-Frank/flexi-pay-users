import { LoadingButton } from "@mui/lab";
import { Drawer, Button as MuiButton, IconButton, ClickAwayListener, Skeleton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useLogoutMutation } from "../redux/api/Auth";
import { useGetCategoriesQuery } from "../redux/api/Product";
import { toggleLogout } from "../redux/slice/modal";
import { RootState } from "../redux/store";
import Button from "./Button";
import { BagIcon, CartIcon, DashboardIcon, HeartIcon, LoginIcon, LogOutIcon, Spinner, SubscriptionIcon, UserIcon, WhiteLogo } from "./icons";
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
        className="flex items-center space-x-3 py-4 cursor-pointer text-white hover:text-primary-orange-200" 
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={() => {
            handleClick()
            navigate(`/${link}`)
        }}
        >
            <Icon size="15" color={active ? "#FF5000" :"white"}/>
            <p>{name}</p>
        </li>
    )
}


export function MenuDrawer({ open, close }: {open: boolean, close: () => void | any}){
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    let navigate = useNavigate()
    const dispatch = useDispatch()

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
                // maxWidth: 450,
                width: '100%'
            }}
            className="block sm:hiddden">
            <ClickAwayListener onClickAway={close}>
                <div className="max-w-[450px] w-[280px] h-fit box-border bg-primary-dark-blue py-5 px-4">
                    <div className="flex justify-between items-start">
                        <WhiteLogo />
                        <IconButton onClick={close} sx={{width: 30, height: 30}}>
                            <i className="fa-solid fa-xmark hover:text-crimson text-lg text-white"></i>
                        </IconButton>
                    </div>
                    <ul className={`text-sm top-full shadow-lg pb-1 mt-4`}>
                        <Item Icon={DashboardIcon} name="Dashboard" link="dashboard" handleClick={close} />
                        <Item Icon={CartIcon} name="Cart" link="cart" handleClick={close} />
                        <Item Icon={HeartIcon} name="Saved Item" link="saved-items" handleClick={close} />
                        <Item Icon={BagIcon} name="Order" link="order" handleClick={close} />
                        <Item Icon={SubscriptionIcon} name="Subscription" link="subscription" handleClick={close} />
                    </ul>
                    {
                        isAuth ?
                        <LoadingButton 
                            variant="outlined" 
                            color="secondary" 
                            onClick={() => dispatch(toggleLogout())}
                            fullWidth
                            size="large"
                            startIcon={<LoginIcon size="14" color="#FF5000"/>}>
                                Logout
                        </LoadingButton >:
                        <div className="space-y-3">
                            <MuiButton 
                                variant="outlined" 
                                color="secondary" 
                                onClick={() => navigate('/login')}
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
                                onClick={() => navigate('/register')}>Register</MuiButton>
                        </div>
                    }
                    <div className="border-y bg-primary-dark-blue border-white my-5 py-3 h-fit">
                        <h3 className="text-primary-orange-200 font-medium">CATEGORIES</h3>
                        <ul className="py-3">
                            {
                                loading ? 
                                <div>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </div>:
                                categories?.length && 
                                categories?.map((category, idx) => 
                                    <li 
                                        key={idx} 
                                        className="text-white mb-2" 
                                        onClick={() => navigate("/category/" + category.uuid)}
                                    >
                                        {category.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    {/* <div className="border-y bg-primary-dark-blue border-white my-5 py-5">
                        
                        <ul className="my-3">
                            {
                                !loading && categories?.length && 
                                categories?.map((category, idx) => 
                                    <li 
                                        key={idx} 
                                        className="text-white mb-2" 
                                        onClick={() => navigate("/category/" + category.uuid)}
                                    >
                                        {category.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div> */}

                    <a
                        href="https://vendor.flexipay.ng"
                        target="_blank" className="w-full h-fit  overflow-hidden rounded-md">
                        <div className="relative flex w-full h-fit overflow-hidden rounded-md p-1">
                            <div className="absolute inline-flex top-0 left-0 rounded-md animate-ping h-full w-full bg-white"></div>
                            <a className="relative py-2 rounded-md text-center bg-white text-primary-orange-200 w-full">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                        </div>
                    </a>
                    
                </div>
            </ClickAwayListener>
        </Drawer>
    )
}

export default MenuDrawer





