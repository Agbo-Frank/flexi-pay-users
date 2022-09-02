import { Menu, MenuItem as MuiMenuItem } from "@mui/material"
import React, { useState } from "react";
import { useLocation } from "react-router-dom"
import MenuIcon from "./icons/MenuIcon"

interface IMenuItemProps {
    id: string;
    parent: string;
    chidren?: string[];
}

function MenuItem({id, parent, chidren}: IMenuItemProps){
    let [open, setOpen] = useState(false)
    function handleOpen(){
        setOpen(true)
    }
    function handleClose(){
        setOpen(false)
    }
    return(
        <div 
        className="relative"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
            <div className="text-grey-600 cursor-pointer py-3">{parent}</div>
            {
                open &&
                <ul className="absolute bg-white w-[280px] py-2 h-fit z-50 rounded-md max-h-[350px] overflow-y-auto">
                    {
                        [
                            'commercial for rent', 'Rooms for rent', 'Town house',
                            'commercial for rent', 'Rooms for rent', 'Town house',
                            'commercial for rent', 'Rooms for rent', 'Town house',
                            'commercial for rent', 'Rooms for rent', 'Town house',
                            'commercial for rent', 'Rooms for rent', 'Town house'
                        ].map((item, idx) => (
                            <li key={idx} className="hover:bg-[#C3C3C3]/30 py-1 pl-5 cursor-pointer hover:text-primary-blue">{item}</li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}


export function Categories (): JSX.Element {
    return(
        <div className="relative w-full bg-primary-dark-blue">
            <div className="flex py-2 bg-primary-dark-blue font-medium justify-between fp-screen">
                <div className="flex justify-start space-x-5 capitalize items-center  text-sm">
                    {/* <div className="flex space-x-4">
                        <MenuIcon size="20" color="white"/>
                        <span>All categories</span>
                    </div> */}
                    {
                        [
                            'services', 'real estate',
                            'house & appartment', 'electronics',
                            'home & kitchen',
                        ].map((category, idx) => (
                            <MenuItem id={idx.toString()} parent={category} />
                        ))
                    }
                </div>

                <div className="w-fit h-fit p-1 overflow-hidden rounded-xl">
                    <div className="relative flex w-fit h-fit overflow-hidden rounded-xl">
                        <div className="absolute inline-flex top-0 left-0 rounded-xl animate-ping h-full w-full bg-white"></div>
                        <a className="relative py-2 rounded-xl px-4 text-sm bg-white text-primary-orange-200">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories