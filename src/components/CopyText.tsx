import { useRef, useState } from "react";

export function CopyText({text}: {text: string}){
    let code = useRef<HTMLDivElement>(null)
    let [copied, setCopied] = useState(false)

    async function copy(){
        navigator.clipboard.writeText(`${code.current?.innerHTML}`);
        setCopied(true)
        await setTimeout(() => setCopied(false), 5000)
    }
    return(

        <span className="relative"> 
            <span ref={code}>{ text }</span>
            {
                copied ?
                <i className="text-[12]px] fa-solid fa-check absolute -top-1.5 -right-3.5"></i> :
                <i className="text-[11px] fa-regular fa-clone absolute -top-1.5 -right-3.5 cursor-pointer" onClick={copy}></i>
            }
            
        </span>
    )
}

export default CopyText