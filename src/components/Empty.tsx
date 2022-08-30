import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import {HeartIcon} from "./icons"
import Iicon from "./icons/interface";

interface IEmptyProps {
    Icon: React.FC<Iicon>;
    title: string;
    message: string;
    button: any
}

export function Empty({title, Icon, message, button}: IEmptyProps){
    return(
        <div className="w-fp-500 text-center rounded-xl py-6 flex justify-center flex-col border border-solid border-grey-100 mx-auto my-10 px-10 pb-20">
            <div className="mx-auto my-3">
                <Icon size="60" color="#E8E5FF"/>
            </div>
    
            <p className="text-xl font-semibold capitalize my-6">{ title }</p>
            <p className="text-grey-700">{ message }
            </p>
            <div className="my-3 mx-auto">{ button }</div>
        </div>
    )
}

export default Empty