

export function ProgressBar({width}: {width: string}){
    return(
        <div className="w-full bg-grey-1100 rounded-full">
            <div 
            className="bg-primary-dark-blue rounded-full text-[7px] sm:text-[10px] h-full text-white text-right px-3" 
            style={{width}}><small className="text-[7px] sm:text-xs">{width}</small></div>
        </div>
    )
}

export default ProgressBar