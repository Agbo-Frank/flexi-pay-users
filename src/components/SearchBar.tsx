import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchIcon } from "./icons"


export function SearchBar(){
    let [searchInput, setSearchInput] = useState('')

    let navigate = useNavigate()

    function search(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        navigate("/products?search=" + searchInput)
        setSearchInput('')
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