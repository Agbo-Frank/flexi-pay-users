import { CreditCardIcon, ExclamationIcon, MarkCircleIcon } from "./icons"
import Slide from 'react-reveal/Slide'
import Fade from 'react-reveal/Fade'
import { useCallback, useEffect, useState } from "react";


export function Toast(){
    return(
        <Slide right duration={700} when={true}>
            <div 
                className="flex items-center gap-5 bg-green-100 rounded-lg py-2 justify-center w-80 shadow-xl shadow-green-200">
                <CreditCardIcon color="white" size="15" />
                <p className="text-white text-sm">Your card has been saved!</p>
            </div>
        </Slide>
    )
}

export function Toast2({message, type, open = false}: {message: string; type: string; open: boolean}){
    let [toggle, setToggle] = useState(open)
    useCallback(async() => {
        if(toggle){
            await setTimeout(() => setToggle(false), 2000)
        }
    }, [open])
    return(
        <Fade when={toggle}>
            <div className={`flex rounded-md py-2 ${type === 'success' ? 'bg-success/20': type === 'failed' ? 'bg-crimson/20' : 'text-primary-orange-100/50'} px-3 pr-5 gap-2 w-fit`}>
                
                
                {
                    type === 'success' ?
                    <MarkCircleIcon color="#8EC162" size="15" />:
                    type === 'failed' ? 
                    <ExclamationIcon color="#FF5000" size="15" />:
                    <ExclamationIcon color="#E78405" size="15" />
                }

                <p className={`${type === 'success' ? 'text-success': type === 'failed' ? 'text-crimson' : 'text-primary-orange-100'} text-xs capitalize`}>{message}</p>
            </div>
        </Fade>
    )
}

export default Toast