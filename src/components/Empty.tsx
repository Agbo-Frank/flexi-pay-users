import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import {HeartIcon} from "./icons"
import Iicon from "./icons/interface";
import { useMediaQuery } from "@mui/material";

interface IEmptyProps {
    Icon: React.FC<Iicon>;
    title: string;
    message: string;
    button: any;
    fullWidth?: boolean,
    size?: "small" | "medium" | "large"
}

export function Empty({title, Icon, message, button, fullWidth = false, size="large"}: IEmptyProps){
    let media = useMediaQuery('(min-width:600px)')
    return(
        <div className={`${fullWidth ? size === "small" ? "w-full" : "sm:w-[400px]" : "w-full"} bg-white text-center rounded-xl ${size === "small" ? "py-3 my-5" : "py-6 my-10"} flex justify-center flex-col border border-solid mx-auto px-5 sm:px-10`}>
            <div className={`mx-auto ${size=== "small" ? "sm:my-1"  :"sm:my-3"}`}>
                <Icon size={!media || size=== "small" ? "45" : "60"} color="#E8E5FF"/>
            </div>
    
            <p className={`text-xl font-semibold capitalize my-2 ${size=== "small" ? "sm:my-3" : "sm:my-6"}`}>{ title }</p>
            <p className="text-grey-700">{ message }
            </p>
            <div className="my-3 mx-auto">{ button }</div>
        </div>
    )
}

export default Empty