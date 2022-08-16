import { Avatar, ClickAwayListener, Drawer as MuiDrawer, List, ListItem } from "@mui/material"
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { BusIcon, CartIcon, WalletIcon } from "./icons"
import { Dispatch, SetStateAction } from "react"
import Slide from 'react-reveal/Slide'

const notificationData = [
    {
        type: 'cart',
        read: true,
        title: 'Your product is published'
    },
    {
        type: 'order',
        read: true,
        title: 'Your have a new Order'
    },
    {
        type: 'cart',
        read: false,
        title: 'Your product is published'
    },
    {
        type: 'wallet',
        read: false,
        title: 'Wallet funded'
    },
    {
        type: 'cart',
        read: true,
        title: 'Your product is published'
    },
    {
        type: 'order',
        read: false,
        title: 'Your product is published'
    }
]

function NotificationIcon({type}: {type: string}){
    if(type === 'cart'){
        return(
            <Avatar sx={{bgcolor: '#1900FE'}}>
                <CartIcon  size="15" color="white"/>
            </Avatar>
        )
    }
    else if(type === 'wallet'){
        return(
            <Avatar sx={{bgcolor: '#E78405'}}>
                <WalletIcon  size="15" color="white"/>
            </Avatar>
        )
    }
    else{
        return(
            <Avatar sx={{bgcolor: '#8EC162'}}>
                <BusIcon  size="15" color="white"/>
            </Avatar>
        )
    }
}

export function Drawer ({ open, setOpenDrawer }: {open: boolean, setOpenDrawer: Dispatch<SetStateAction<boolean>>}){
    return (
            <MuiDrawer
                anchor='right'
                open={open}
                sx={{width: 400}}
                hideBackdrop>
                    <ClickAwayListener onClickAway={() => setOpenDrawer(state => !state)}>
                <div className="w-[450px]">
                    <div className="flex items-center justify-between border-b border-[#EDEEF0] px-5 py-3">
                        <h4 className="text-[#222222] text-xl font-medium">Notifications</h4>
                        <span className="text-[#545362] text-lg font-medium">09</span>
                    </div>
                    <div className="px-5">
                        <List className="space-y-2">
                            {/* <TransitionGroup> */}
                                {
                                    notificationData.map((note, idx) => (
                                        <Slide right key={idx} delay={idx * 50} duration={500} opposite>
                                            <ListItem 
                                                alignItems="flex-start" 
                                                className="border border-[#EDEEF0] hover:border-primary-blue cursor-pointer rounded-md flex items-center justify-between" 
                                                disablePadding
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    paddingX: 1,
                                                    paddingY: 1.5
                                                }}>
                                                    <div className="flex space-x-2">
                                                        <NotificationIcon type={note.type}/>
                                                        <div className="flex flex-col">
                                                            <strong className="font-medium">{note.title}</strong>
                                                            <span className="font-light text-xs">Product ID: Fl0532</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end space-y-1">
                                                        <div className={`w-2 h-2 ${note.read ? 'bg-[#C6C6CA]' : 'bg-primary-blue'} rounded-full`}></div>
                                                        <small className="text-[10px]">2 minutes ago</small>
                                                    </div>
                                            </ListItem>
                                        </Slide>
                                    ))
                                }
                            {/* </TransitionGroup> */}
                        </List>
                    </div>
                </div>
                </ClickAwayListener>
            </MuiDrawer>
    )
}

export default Drawer