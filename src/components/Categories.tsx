import { Backdrop, Menu, MenuItem as MuiMenuItem } from "@mui/material"
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

function AllCategories(){
    let [open, setOpen] = useState({
        main: false,
        sub: false
    })
    function handleOpen(){
        setOpen(state => ({...state, main: true}))
    }
    function handleClose(){
        setOpen(state => ({...state, main: false}))
    }
    return(
        <div 
        className="relative"
        onMouseEnter={() => setOpen(state => ({...state, main: true}))}
        onMouseLeave={() => setOpen(state => ({...state, main: false}))}>
            <div className="flex space-x-2 cursor-pointer py-3">
                <MenuIcon size="20" color="white"/>
                <span className="text-grey-600">All categories</span>
            </div>
            {
                open.main &&
                <div className="absolute flex items-stretch">
                    <ul className={`bg-white w-[200px] py-2 h-fit z-50 border rounded-md ${open.sub && 'rounded-r-none border-r-0'}`}>
                        {
                            [
                                'services', 'real estate',
                                'house & appartment', 'electronics',
                                'home & kitchen',
                                'services', 'real estate',
                                'house & appartment', 'electronics',
                                'home & kitchen',
                            ].map((item, idx) => (
                                <>
                                    <li 
                                        onMouseEnter={() => setOpen(state => ({...state, sub: true}))}
                                        onMouseLeave={() => setOpen(state => ({...state, sub: false}))} 
                                        key={idx} 
                                        className="hover:bg-[#C3C3C3]/30 py-2 pl-5 cursor-pointer hover:text-primary-blue">
                                        {item}
                                    </li>
                                </>
                            ))
                        }
                    </ul>
                    {
                        open.sub && 
                        <div 
                            onMouseEnter={() => setOpen(state => ({...state, sub: true}))}
                            className={`grid w-[800px] grid-cols-4 bg-white border rounded-md ${open.sub && 'rounded-l-none border-l-0 z-50'}`}>
                            <ul className="m-4">
                                <li className="uppercase pb-2 border-b cursor-pointer text-[14px] hover:text-primary-dark-blue">Food Cupboard</li>
                                {
                                    [
                                        'rice', 'beans', 'yam',
                                        'garri', 'eba', 'semo'
                                    ].map(item => (
                                        <li className="capitalize text-[13px] hover:text-sm text-[#222] hover:text-black cursor-pointer">{item}</li>
                                    ))
                                }
                            </ul>
                            <ul className="m-4">
                                <li className="uppercase pb-2 border-b cursor-pointer text-[14px] hover:text-primary-dark-blue">Food Cupboard</li>
                                {
                                    [
                                        'rice', 'beans', 'yam',
                                        'garri', 'eba', 'semo'
                                    ].map(item => (
                                        <li className="capitalize text-[13px] hover:text-sm text-[#222] hover:text-black cursor-pointer">{item}</li>
                                    ))
                                }
                            </ul>
                            <ul className="m-4">
                                <li className="uppercase pb-2 border-b cursor-pointer text-[14px] hover:text-primary-dark-blue">Food Cupboard</li>
                                {
                                    [
                                        'rice', 'beans', 'yam',
                                        'garri', 'eba', 'semo'
                                    ].map(item => (
                                        <li className="capitalize text-[13px] hover:text-sm text-[#222] hover:text-black cursor-pointer">{item}</li>
                                    ))
                                }
                            </ul>
                            <ul className="m-4">
                                <li className="uppercase pb-2 border-b cursor-pointer text-[14px] hover:text-primary-dark-blue">Food Cupboard</li>
                                {
                                    [
                                        'rice', 'beans', 'yam',
                                        'garri', 'eba', 'semo'
                                    ].map(item => (
                                        <li className="capitalize text-[13px] hover:text-sm text-[#222] hover:text-black cursor-pointer">{item}</li>
                                    ))
                                }
                            </ul>
                        </div>

                    }
                </div>
            }
        </div>
    )
}


export function Categories (): JSX.Element {
    return(
        <div className="hidden sm:block relative w-full bg-primary-dark-blue">
            <div className="flex py-2 bg-primary-dark-blue font-medium justify-between fp-screen">
                <div className="flex justify-start space-x-5 capitalize items-center  text-sm">
                    <AllCategories />
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

                <a 
                    href="https://vendor.flexipay.ng"
                    target="_blank"
                    className="w-fit h-fit p-1 overflow-hidden rounded-md">
                    <div className="relative flex w-fit h-fit overflow-hidden rounded-md">
                        <div className="absolute inline-flex top-0 left-0 rounded-md animate-ping h-full w-full bg-white"></div>
                        <a className="relative py-2 rounded-md px-4 text-sm bg-white text-primary-orange-200">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Categories