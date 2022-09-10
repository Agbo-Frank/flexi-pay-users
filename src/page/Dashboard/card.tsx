import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import Iicon from "../../components/interface";


interface ICardProps {
    Icon: React.FC<Iicon>;
    name: string;
    count: number | string;
}

export function Card({ Icon, name, count }: ICardProps){
    let matches = useMediaQuery("(min-width:600px)")

    function returnProps(type: string){
        switch (type){
            case 'saved items':
                return {
                    color: '#ff5000',
                    link:  "/saved-items"
                }
            case 'cart items':
                return {
                    color: '#000A81',
                    link: "/cart"
                }
            case 'order items':
                return {
                    color: '#1900FE',
                    link: '/order'
                }
            default:
                return {
                    color: '#E78405',
                    link: "/wallet"
                }
        }
    }
    return(
        <Link to={returnProps(name).link} className="flex space-x-5 items-center px-3 sm:px-7 shadow py-3 sm:py-6 bg-white rounded-xl hover:card-shadow hover:shadow-lg cursor-pointer w-fit">
            <Icon size={matches ? "35" : "25"} color={returnProps(name).color} />
            
            <div>
                <p className="text-2xl font-bold">{ count }</p>
                <p className="text-sm text-grey-700 capitalize">{ name }</p>
            </div>
        </Link>
    )
}

export default Card