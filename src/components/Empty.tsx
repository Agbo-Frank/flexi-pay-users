import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import {HeartIcon} from "./icons"
import Iicon from "./icons/interface";

interface IEmptyProps {
    Icon: React.FC<Iicon>;
    name: string;
}

function Empty({name, Icon}: IEmptyProps){
    return(
        <div className="w-fp-500 text-center rounded-4xl py-6 flex justify-center flex-col border border-solid border-grey-100 mx-auto my-10 px-10 pb-20">
            <div className="mx-auto my-3">
                <Icon size="60" color="#E8E5FF"/>
            </div>
    
            <p className="text-xl font-semibold capitalize my-6">your {name} is empty</p>
            <p className="text-grey-700">
                You currently don’t have any item in 
                your {name}, kindly to go 
                shop and add item to your {name}
            </p>
            <div className="my-3 mx-auto">
                <Button type="button" color="#FF5000">
                    <div className="flex justify-center items-center gap-4">
                        <CartIcon color="white" size="20"/>
                        <p>Start Shopping</p>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Empty