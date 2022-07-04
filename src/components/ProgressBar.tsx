

export function ProgressBar({width}: {width: string}){
    return(
        <div className="w-full bg-grey-1100 rounded-full">
            <div 
            className="bg-primary-blue rounded-full text-xs h-full text-white text-right px-3" 
            style={{width}}><small className="text-xs">{width}</small></div>
        </div>
    )
}

export default ProgressBar