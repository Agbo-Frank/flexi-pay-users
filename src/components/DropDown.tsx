import { useState } from "react"
import Slide from "react-reveal/Slide"


export function DropDown(){
    let [toggle, setToggle] = useState(false)
    return(
        <div className={`relative border ${toggle ? 'border-primary-orange-200' : 'border-grey-1000'} rounded-full py-2 px-3 cursor-pointer`}>
            <div 
                className="flex justify-between w-full items-center"
                onClick={() => setToggle(state => !state)}>
                    <p className="font-light">Popular</p>
                    <i className={`text-sm ${toggle ? 'text-primary-orange-200 fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up'}`}></i>
            </div>
            <div className="absolute overflow-hidden w-11/12 rounded-xl">
                <Slide top when={toggle} duration={300}>
                    <ul className={`${toggle ? 'block' : 'hidden'} translate-y-2 font-light top-full bg-white h-fit shadow-lg max-h-40 scrollbar overflow-y-auto`}>
                        <li className="w-full py-1 p-2 hover:bg-grey-900">Popular</li>
                        <li className="w-full py-1 p-2 hover:bg-grey-900 ">Popular</li>
                        <li className="w-full py-1 p-2 hover:bg-grey-900 ">Popular</li>
                        <li className="w-full py-1 p-2 hover:bg-grey-900 ">Popular</li>
                        <li className="w-full py-1 p-2 hover:bg-grey-900 ">Popular</li>
                    </ul>
                </Slide>
            </div>
        </div>
    )
}

export default DropDown