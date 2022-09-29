import { Instagram } from "@mui/icons-material";
import { FacebookIcon, MailIcon, PhoneIcon, TwitterIcon } from "./icons";
import WhatappIcon from "./icons/Whatapp";

export function FacebookLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href="https://www.facebook.com/FlexiPayNG"
            target="_blank">
            <FacebookIcon color="#000541" size="20"/>
        </a>
    )
}

export function InstagramLink(){
    return(
        <a 
            className="bg-white text-[#000541] text-xl  grid place-items-center rounded-full w-10 h-10 scale-95"
            href="https://www.instagram.com/FlexiPayNG"
            target="_blank">
            <Instagram />
        </a>
    )
}

export function TwitterLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href="https://twitter.com/@FlexiPayNG"
            target="_blank">
            <TwitterIcon color="#000541" size="20"/>
        </a>
    )
}

export function PhoneLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 rotate-[150deg] scale-95"
            href="tel:+2349020130444"
            target="_blank">
            <PhoneIcon color="#000541" size="20"/>
        </a>
    )
}

export function MailLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href="mailto:hello@FlexiPay.ng"
            target="_blank">
            <MailIcon color="#000541" size="20"/>
        </a>
    )
}

export function YoutubeLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10 scale-95"
            href="https://www.youtube.com/channel/UCKgsy8ZzkQH7I4LPLMwPInA"
            target="_blank">
            <i className="fa-brands fa-youtube text-primary-dark-blue text-xl"></i>
        </a>
    )
}

export function TiktokLink(){
    return(
        <a 
            className="bg-white  grid place-items-center rounded-full w-10 h-10"
            href="https://www.tiktok.com/@flexipay.ng"
            target="_blank">
            <i className="fa-brands fa-tiktok text-primary-dark-blue text-xl"></i>
        </a>
    )
}

export function WhatappLink(){
    return(
        <a 
            className="bg-white grid place-items-center rounded-full w-10 h-10"
            href="https://wa.me/+2349020130444"
            target="_blank">
            <WhatappIcon color="#000541" size="20"/>
        </a>
    )
}