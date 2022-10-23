import { MinusIcon, PlusIcon } from "./icons"


export function QuantityController({handleMinusClick, quantity, handlePlusClick, disabled}: {handleMinusClick: () => void | any, quantity: number, disabled: boolean, handlePlusClick: () => void | any}){
    return(
        <div className="flex justify-between items-center space-x-3">
            <div 
                className={`rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 ${(quantity === 1 || disabled) && "opacity-50"} h-5 flex justify-center items-center text-xl`}
                onClick={() => {
                    if(quantity > 1) handleMinusClick()
                }}>
                <MinusIcon color="white" size="14" />
            </div>
            <div className="font-medium text-lg">{quantity}</div>
            <div 
            className={`rounded-full cursor-pointer font-bold text-white bg-primary-orange-200 w-5 h-5 flex ${disabled && "opacity-50"} justify-center items-center text-xl`}
            onClick={handlePlusClick}>
                <PlusIcon size="14" color="white" />
            </div>
        </div>
    )
}