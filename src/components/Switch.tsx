import{ ISwitch } from "./interface"

export function Switch({label, handleClick, isTrue}: ISwitch) {
    return(
        <div className='flex items-center gap-3' onClick={handleClick}>
            <div className={`w-8 rounded-full bg-primary-blue p-0.5 ${isTrue ? 'bg-primary-blue' : 'bg-grey-400'}`}>
                <div className={`bg-white w-4 h-4 rounded-full ${!isTrue? '' : 'ml-auto'}`}></div>
            </div>
            <p className="text-sm text-grey-700">{label}</p>
        </div>
    )
}

export default Switch