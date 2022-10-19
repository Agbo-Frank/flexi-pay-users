import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { serializeFormQuery } from "../utils"
import { SearchIcon } from "./icons"


export function SearchBar(){
    let [searchParams, setSearchParams] = useSearchParams()
    let [searchInput, setSearchInput] = useState(searchParams.get('product_name') || '')
    const { pathname } = useLocation()

    let navigate = useNavigate()
    const paths = ["/products"]

    function search(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(paths.includes(pathname)){
            setSearchParams({...serializeFormQuery(searchParams), product_name: searchInput})
        }
        else{
            navigate("/products?product_name=" + searchInput)   
        }
    }
    
    return(
        <form 
            className="flex justify-between bg-white rounded-xl items-center w-full p-1 pl-3 shadow-sm border"
            onSubmit={search}>
            <input 
                type='text'
                placeholder="Search..." 
                className="w-11/12"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}/>

            <div className="bg-primary-orange-200 rounded-lg sm:rounded-xl border p-1 sm:p-2">
                {/* <div className="hidden sm:block"></div>
                <div className="block sm:hidden"><SearchIcon size='13' color='#FFFFFF'/></div> */}
                <SearchIcon size='18' color='#FFFFFF'/>
            </div>
        </form>
    )
}

export default SearchBar