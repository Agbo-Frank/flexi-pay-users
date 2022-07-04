import { CreditCardIcon } from "./icons"
import Slide from 'react-reveal/Slide'


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

export default Toast