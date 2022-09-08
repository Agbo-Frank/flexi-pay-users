import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import {HeartIcon} from "./icons"
import Iicon from "./icons/interface";
import { useMediaQuery } from "@mui/material";

interface IEmptyProps {
    Icon: React.FC<Iicon>;
    title: string;
    message: string;
    button: any
}

export function Empty({title, Icon, message, button}: IEmptyProps){
    let media = useMediaQuery('(min-width:600px)')
    return(
        <div className="sm:w-fp-500 bg-white text-center rounded-xl py-6 flex justify-center flex-col border border-solid mx-auto my-10 px-5 sm:px-10 sm:pb-20">
            <div className="mx-auto sm:my-3">
                <Icon size={media? "60" : "40"} color="#E8E5FF"/>
            </div>
    
            <p className="text-xl font-semibold capitalize my-2 sm:my-6">{ title }</p>
            <p className="text-grey-700">{ message }
            </p>
            <div className="my-3 mx-auto">{ button }</div>
        </div>
    )
}

export default Empty