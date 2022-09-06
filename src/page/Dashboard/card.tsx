import Iicon from "../../components/interface";


interface ICardProps {
    Icon: React.FC<Iicon>;
    name: string;
    count: number | string;
}

export function Card({ Icon, name, count }: ICardProps){
    function returnColor(type: string){
        switch (type){
            case 'saved items':
                return '#ff5000'
            case 'cart items':
                return '#000A81'
            case 'order items':
                return '#1900FE'
            default:
                return '#E78405'
        }
    }
    let color = returnColor(name)
    return(
        <div className="flex space-x-5 items-center px-7 py-6 bg-white rounded-xl hover:card-shadow hover:shadow-lg cursor-pointer w-1/4">
            <Icon size="35" color={color} />
            <div>
                <p className="text-2xl font-bold">{ count }</p>
                <p className="text-sm text-grey-700 capitalize">{ name }</p>
            </div>
        </div>
    )
}

export default Card