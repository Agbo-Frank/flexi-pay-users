import { Instagram } from "@mui/icons-material";
import { FLEXIPAY_EMAIL, FLEXIPAY_FACEBOOK, FLEXIPAY_INSTAGRAM, FLEXIPAY_PHONE, FLEXIPAY_TIKTOK, FLEXIPAY_TWITTER, FLEXIPAY_WHATSAPP, FLEXIPAY_YOUTUBE } from "../utils/constants";
import { FacebookIcon, MailIcon, PhoneIcon, TwitterIcon } from "./icons";
import WhatappIcon from "./icons/Whatapp";

export function FacebookLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href={FLEXIPAY_FACEBOOK}
            target="_blank">
            <FacebookIcon color="#000541" size="20"/>
        </a>
    )
}

export function InstagramLink(){
    return(
        <a 
            className="bg-white text-[#000541] text-xl  grid place-items-center rounded-full w-10 h-10 scale-95"
            href={FLEXIPAY_INSTAGRAM}
            target="_blank">
            <Instagram />
        </a>
    )
}

export function TwitterLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href={FLEXIPAY_TWITTER}
            target="_blank">
            <TwitterIcon color="#000541" size="20"/>
        </a>
    )
}

export function PhoneLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 rotate-[150deg] scale-95"
            href={FLEXIPAY_PHONE}
            target="_blank">
            <PhoneIcon color="#000541" size="20"/>
        </a>
    )
}

export function MailLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href={FLEXIPAY_EMAIL}
            target="_blank">
            <MailIcon color="#000541" size="20"/>
        </a>
    )
}

export function YoutubeLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href={FLEXIPAY_YOUTUBE}
            target="_blank">
            <i className="fa-brands fa-youtube text-primary-dark-blue text-xl"></i>
        </a>
    )
}

export function TiktokLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10"
            href={FLEXIPAY_TIKTOK}
            target="_blank">
            <i className="fa-brands fa-tiktok text-primary-dark-blue text-xl"></i>
        </a>
    )
}

export function WhatappLink(){
    return(
        <a 
            className="bg-white grid place-items-center rounded-full w-10 h-10"
            href={FLEXIPAY_WHATSAPP}
            target="_blank">
            <WhatappIcon color="#000541" size="20"/>
        </a>
    )
}