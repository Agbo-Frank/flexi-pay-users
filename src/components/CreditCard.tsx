import {MasterCardIcon, TrashIcon, VisaIcon} from "./icons"
import { ICreditCardComponent } from "./interface"
import { useState } from "react"

export function CreditCard ({type}: ICreditCardComponent) {
    let [rmColor, setRmColor] = useState("#A0A0A1")
    return(
        <div className="border border-primary-blue rounded-2xl flex w-80 px-4 my-4 text-primary-blue h-28 py-3">
            <div>
                <p className="">23****53***3</p>
                <p>Mr John Doe</p>
            </div>
            <div className="flex flex-col justify-between gap-2 items-end text-sm w-fit ml-auto">
                <div 
                className="flex gap-1 items-center text-grey-700 cursor-pointer hover:text-crimson" 
                onMouseEnter={() => setRmColor('#FF5000')}
                onMouseLeave={() => setRmColor("#A0A0A1")}>
                    <TrashIcon color={rmColor} size="14"/>
                    <p className="text-sm">Remove</p>
                </div>
                {
                    type === 'master' ?
                    <MasterCardIcon size="24"/> :
                    <VisaIcon size="24"/>
                }
            </div>
        </div>
    )
}

export default CreditCard