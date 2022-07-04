import BellIcon from "./icons/Bell"
import CartIcon from "./icons/CartIcon"
import Logo from "./icons/logo"
import MessageIcon from "./icons/MessageIcon"
import ProfilBG from "./icons/ProfilBG"
import SearchIcon from "./icons/SearchIcon"

export function Header(){
    return(
        <header className="flex w-full justify-between items-end py-5 px-6 xl:px-fp-5 2xl:px-fp-10">
            <Logo />
            <div className="flex justify-between bg-white rounded-full items-center w-5/12 p-1 pl-3 shadow-sm">
                <input type='text' placeholder="Search products, categories and services" className="w-11/12"/>
                <div className="bg-primary-orange-200 rounded-full py-2 p-2">
                    <SearchIcon size='18' color='#FFFFFF'/>
                </div>
            </div>
            <div className="flex items-center justify-between w-4/12">
                <ul className="flex justify-evenly items-center w-3/6">
                    <li className="w-11 h-11 bg-primary-dark-blue rounded-full flex justify-center items-center">
                        <MessageIcon size="20" color="#F9F8FF"/> 
                    </li>
                    <li className="w-11 h-11 bg-primary-dark-blue rounded-full flex justify-center items-center">
                        <BellIcon size="20" color="#F9F8FF"/> 
                    </li>
                    <li className="w-11 h-11 bg-primary-dark-blue rounded-full flex justify-center items-center">
                        <CartIcon size="20" color="#F9F8FF"/> 
                    </li>
                </ul>
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-items-end">
                        <p className="text-xs">Good Morning</p>
                        <p className="font-bold ml-auto">Mr John</p>
                    </div>
                    <div className="w-11 h-11 bg-white rounded-full flex justify-center items-center">
                        <ProfilBG size="20" color="#000541"/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header