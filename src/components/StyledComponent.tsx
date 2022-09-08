import React from "react";
import { IWrapperProps } from "./interface";


export function Wrapper({children, styles}: IWrapperProps){
    return(
        <div className={`rounded-lg bg-[#F4F4F4] sm:bg-white py-2 sm:py-3 px-3 sm:px-6 ${styles} m-2`}>
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

export function CardWrapper({children, styles}: IWrapperProps){
    return(
        <div className={`flex flex-col sm:flex-row justify-between rounded sm:rounded-2xl w-full sm:hover:shadow-lg border sm:hover:border-0 border-solid items-center p-3 sm:p-6 mb-3 bg-white ${styles} whitespace-pre-wrap truncate`}>
            {children}
        </div>
    )
}

export function CardActions({children, styles}: IWrapperProps){
    return(
        <div className={`flex w-full sm:w-3/12 justify-between border-t pt-3 sm:pt-0 flex-row-reverse sm:flex-col sm:space-y-3 ${styles}`}>
            {children}
        </div>
    )
}

export function CardImg({ src }: {src: string}){
    return(
        <img src={src} alt="" className="w-[100px] h-[100px] sm:w-[148px] sm:h-[148px]  object-cover rounded sm:rounded-xl"/>
    )
}

export function CardText({children}: React.PropsWithChildren){
    return(
        <span className="sm:w-9/12 text-black sm:text-grey-200 font-semibold sm:font-normal text-sm sm:text-base sm:mb-5">
            {children}
        </span>
    )
}

export function CardContentText({children, styles}: IWrapperProps){
    return(
        <div className={`flex flex-col sm:w-6/12 sm:h-full items-stretch sm:justify-evenly ${styles}`}>
            {children}
        </div>
    )
}


