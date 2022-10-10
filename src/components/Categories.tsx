import { Backdrop, Menu, MenuItem as MuiMenuItem } from "@mui/material"
import React, { memo, useEffect, useState } from "react";
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
    let [open, setOpen] = useState<{
        main: boolean,
        sub: boolean,
        category: ICategory | null
    }>({
        main: false,
        sub: false,
        category: null
    })
    function handleOpen(){
        setOpen(state => ({...state, main: true}))
    }
    function handleClose(){
        setOpen(state => ({...state, main: false}))
    }

    let [getCategories, { categories, loading, data }] = useLazyGetSubCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result.sub_categories,
            loading: isLoading, data
        })
    })

    useEffect(() => {
        getCategories({page: 1, id: parent.uuid})
    }, [])
    return(
        <div 
        className="relative"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
            <div className="text-grey-600 cursor-pointer py-3 capitalize">{parent.name.toLowerCase()}</div>
            <div className="absolute flex">
                {
                    open.main &&
                    <ul className={`bg-white w-[200px] py-2 h-fit z-50 rounded-md ${open.sub && 'rounded-r-none border-r-0'} max-h-[350px] overflow-y-auto`}>
                        {
                            categories?.map((item, idx) => (
                                <li 
                                    key={idx} 
                                    className="hover:bg-[#C3C3C3]/30 py-1 pl-5 cursor-pointer hover:text-primary-blue"
                                    onMouseEnter={()=> setOpen(state => ({...state, sub: true, category: item}))}
                                    onMouseLeave={()=> setOpen(state => ({...state, sub: false, category: null}))}
                                >
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                }
                {
                    open.sub && 
                    <SubCategories category={open.category} open={open} setOpen={setOpen}/>
                }
            </div>
        </div>
    )
}

function AllCategories(){
    let [open, setOpen] = useState<{
        main: boolean,
        sub: boolean,
        category: ICategory | null
    }>({
        main: false,
        sub: false,
        category: null
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
                    <ul className={`bg-white w-[200px] py-2 h-auto z-50 border rounded-md ${open.sub && 'rounded-r-none border-r-0'}`}>
                        {
                            categories?.map((item, idx) => (
                                <li 
                                    onMouseEnter={() => setOpen(state => ({...state, sub: true, category: item}))}
                                    onMouseLeave={() => setOpen(state => ({...state, sub: false, category: null}))} 
                                    onClick={() => navigate("/category/" + item.uuid)}
                                    key={idx} 
                                    className="hover:bg-[#C3C3C3]/30 py-2 pl-5 cursor-pointer hover:text-primary-blue whitespace-nowrap truncate">
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                    {
                        open.sub &&
                        <SubCategories category={open.category} open={open} setOpen={setOpen}/>
                    }
                </div>
            }
        </div>
    )
}


export function SubCategories({setOpen, category, open}: {
    open: {
        main: boolean;
        sub: boolean;
        category: ICategory | null;
    }
    setOpen: React.Dispatch<React.SetStateAction<{
        main: boolean;
        sub: boolean;
        category: ICategory | null;
    }>>,
    category: ICategory | null
}){
    let [getSubCategories, { sub_categories }] = useLazyGetSubCategoriesQuery({
        selectFromResult: ({ data }) => ({
            sub_categories: data?.result
        })
    })

    const navigate= useNavigate()

    useEffect(() => {
        if(category){
            getSubCategories({id: category?.uuid, page: 1})
        }
    }, [category])
    return(
        <div 
            onMouseEnter={() => setOpen(state => ({...state, sub: true}))}
            className={`grid w-[800px] grid-cols-4 bg-white border rounded-md ${open.sub && 'rounded-l-none border-l-0 z-50'}`}>  
            {
                sub_categories?.sub_categories?.map(sub_category => (
                    <ul className="m-4">
                        <li className="uppercase pb-2 border-b cursor-pointer text-[14px] hover:text-primary-dark-blue whitespace-nowrap truncate"
                            onClick={() => navigate("/category/" + sub_category?.uuid)}
                        >{ sub_category?.name}</li>
                        <SubSubCategories sub_category={sub_category} />
                    </ul>
                ))
            }                      
            
        </div>
    )
}

export function SubSubCategories({ sub_category}: {sub_category: ICategory}){
    let [getSubCategories, { sub_categories }] = useLazyGetSubCategoriesQuery({
        selectFromResult: ({ data }) => ({
            sub_categories: data?.result
        })
    })

    const navigate= useNavigate()

    useEffect(() => {
        if(sub_category){
            getSubCategories({id: sub_category?.uuid, page: 1})
        }
    }, [])
    return(
        <>
            {
                sub_categories?.sub_categories?.map(sub_category => (
                    <li     
                        key={sub_category?.uuid}
                        className="capitalize text-[12px] hover:text-[13px] text-[#222] hover:text-black cursor-pointer "
                        onClick={() => navigate("/category/" + sub_category.uuid)}
                    >{sub_category.name}</li>
                ))
            }
        </>
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
                    {/* {
                        categories?.slice(0, 5).map((category, idx) => (
                            <MenuItem 
                                id={idx.toString()} 
                                parent={category} 
                                key={idx} 
                            />
                        ))
                    } */}
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

export default memo(Categories)