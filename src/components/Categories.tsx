import { Backdrop, Menu, MenuItem as MuiMenuItem } from "@mui/material"
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ICategory } from "../interface";
import { useGetCategoriesQuery, useGetSubCategoriesQuery, useLazyGetCategoriesQuery, useLazyGetSubCategoriesQuery } from "../redux/api/Product";
import { FLEXIPAY_VENDOR_URL } from "../utils/constants";
import MenuIcon from "./icons/MenuIcon"

interface IMenuItemProps {
    id: string;
    parent: ICategory;
    chidren?: string[];
    width?: any
}

function MenuItem({id, parent, chidren,}: IMenuItemProps){
    let [open, setOpen] = useState(false)
    let [openSub, setOpenSub] = useState(false)
    function handleOpen(){
        setOpen(true)
    }
    function handleClose(){
        setOpen(false)
    }

    let [getCategories, { categories, loading }] = useLazyGetSubCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result.sub_categories,
            loading: isLoading
        })
    })

    useEffect(() => {
        getCategories({page: 1, id: parent.uuid})
    }, [])
    console.log(parent, categories)
    return(
        <div 
        className="relative"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
            <div className="text-grey-600 cursor-pointer py-3">{parent.name}</div>
            <div className="absolute flex">
                {
                    open &&
                    <ul className={`bg-white w-[200px] py-2 h-fit z-50 rounded-md ${openSub && 'rounded-r-none border-r-0'} max-h-[350px] overflow-y-auto`}>
                        {
                            categories?.map((item, idx) => (
                                <li 
                                    key={idx} 
                                    className="hover:bg-[#C3C3C3]/30 py-1 pl-5 cursor-pointer hover:text-primary-blue"
                                    onMouseEnter={()=>setOpenSub(true)}
                                    onMouseLeave={()=>setOpenSub(false)}
                                >
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                }
                {
                    openSub && 
                    <div 
                        onMouseEnter={() => setOpenSub(true)}
                        onMouseLeave={() => setOpenSub(false)}
                        className={`grid w-screen overflow-x-auto grid-cols-4 bg-white border rounded-md ${openSub && 'rounded-l-none border-l-0 z-50'}`}>
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
        </div>
    )
}

function AllCategories(){
    let [open, setOpen] = useState({
        main: false,
        sub: false
    })
    let navigate = useNavigate()
    let [getCategories, { categories, loading }] = useLazyGetCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })

    useEffect(() => {
        getCategories()
    }, [loading])
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
                            categories?.map((item, idx) => (
                                <>
                                    <li 
                                        onMouseEnter={() => setOpen(state => ({...state, sub: true}))}
                                        onMouseLeave={() => setOpen(state => ({...state, sub: false}))} 
                                        onClick={() => navigate("/category/" + item.uuid)}
                                        key={idx} 
                                        className="hover:bg-[#C3C3C3]/30 py-2 pl-5 cursor-pointer hover:text-primary-blue">
                                        {item.name}
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
    let [getCategories, { categories, loading }] = useLazyGetCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })

    useEffect(() => {
        getCategories()
    }, [])
    return(
        <div className="hidden sm:block relative w-full bg-primary-dark-blue">
            <div className="flex py-2 bg-primary-dark-blue font-medium justify-between fp-screen">
                <div className="flex justify-start space-x-5 capitalize items-center  text-sm">
                    <AllCategories />
                    {
                        // [
                        //     {text: 'services', w: 800}, {text: 'real estate', w: 700},
                        //     {text: 'house & appartment', w: 700}, {text: 'electronics', w: 550},
                        //     {text: 'home & kitchen', w: 450},
                        // ]
                        categories?.slice(0, 5).map((category, idx) => (
                            <MenuItem 
                                id={idx.toString()} 
                                parent={category} 
                                key={idx} 
                            />
                        ))
                    }
                </div>

                <a 
                    href={FLEXIPAY_VENDOR_URL}
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