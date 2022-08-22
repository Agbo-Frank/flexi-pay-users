import React from "react";
import { IWrapperProps } from "./interface";


export function Wrapper({children, styles}: IWrapperProps){
    return(
        <div className={`rounded-lg bg-white py-3 px-6 ${styles}`}>
            {children}
        </div>
    )
}

export function WrapperHeader({children, styles}: IWrapperProps){
    return(
        <h3 className={`font-semibold text-primary-dark-blue ${styles}`}>
            {children}
        </h3>
    )
}

export function TitlePage({children}: React.PropsWithChildren){
    return(
        <h2 className="text-[#11142D] text-2xl capitalize font-medium">
            {children}
        </h2>
    )
}