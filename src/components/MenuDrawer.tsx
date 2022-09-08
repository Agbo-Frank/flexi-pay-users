import { Drawer, Button as MuiButton, IconButton, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useLogoutMutation } from "../redux/api/Auth";
import Button from "./Button";
import { BagIcon, HeartIcon, LoginIcon, LogOutIcon, Spinner, UserIcon, WhiteLogo } from "./icons";
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
                <div className="max-w-[450px] w-[280px] h-fit bg-primary-dark-blue py-5 px-4">
                    <div className="flex justify-between items-start">
                        <WhiteLogo />
                        <IconButton onClick={close}>
                            <i className="fa-solid fa-xmark hover:text-crimson text-lg text-white"></i>
                        </IconButton>
                    </div>
                    <ul className={`text-sm top-full shadow-lg pb-1`}>
                        <Item Icon={UserIcon} name="Profile" link="profile" handleClick={() => console.log(false)} />
                        <Item Icon={BagIcon} name="Order" link="order" handleClick={() => console.log(false)} />
                        <Item Icon={HeartIcon} name="Saved Item" link="saved-items" handleClick={() => console.log(false)} />

                        {/* <li className="mt-5">
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
                        </li> */}
                    </ul>
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
                    <div className="border-y border-white my-8 py-5">
                        <h3 className="text-primary-orange-200 font-medium">CATEGORIES</h3>
                        <ul className="my-3">
                            {
                                [
                                    'Fashion', 'Home & kitchen', 'Electronics',
                                    'Fashion', 'Home & kitchen', 'Electronics',
                                    'Fashion', 'Home & kitchen', 'Electronics'
                                ].map((item, idx) => (
                                    <li key={idx} className="text-white mb-2" >{item}</li>
                                ))
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