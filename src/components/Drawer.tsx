import { Avatar, ClickAwayListener, Drawer as MuiDrawer, List, ListItem } from "@mui/material"
import { CartIcon } from "./icons"
import { Dispatch, SetStateAction } from "react"

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
                            {
                                [1, 2, 3, 4, 5].map(i => (
                                    <ListItem 
                                        alignItems="flex-start" 
                                        className="border border-[#EDEEF0] rounded-md flex items-center justify-between" 
                                        disablePadding
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingX: 1,
                                            paddingY: 1.5
                                        }}>
                                            <div className="flex space-x-2">
                                                <Avatar sx={{bgcolor: '#1900FE'}}>
                                                    <CartIcon  size="15" color="white"/>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <strong className="font-medium">Product is added to your cart</strong>
                                                    <span className="font-light text-xs">Product ID: Fl0532</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-1">
                                                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                                                <small className="text-[10px]">2 minutes ago</small>
                                            </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>
                </ClickAwayListener>
            </MuiDrawer>
    )
}

export default Drawer