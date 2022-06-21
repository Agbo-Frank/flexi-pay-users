import Button from "../../components/Button";
import BagIcon from "../../components/icons/Bag";
import CartIcon from "../../components/icons/CartIcon";
import EditIcon from "../../components/icons/EditIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import Iicon from "../../components/icons/interface";
import WalletIcon from "../../components/icons/WalletIcon";

interface ICardProps {
    Icon: React.FC<Iicon>;
    name: string;
    count: number;
}

function Card({ Icon, name, count }: ICardProps){
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
        <div className="flex gap-5 items-center px-7 py-6 bg-white rounded-4xl hover:card-shadow shadow-sm cursor-pointer">
            <Icon size="35" color={color} />
            <div>
                <p className="text-2xl font-bold">{ count }</p>
                <p className="text-sm text-grey-700 capitalize">{ name }</p>
            </div>
        </div>
    )
}

function Overview(): JSX.Element {
    return (
      <div>
        <div className="flex justify-between">
            <Card Icon={HeartIcon} count={13} name="saved items" />
            <Card Icon={CartIcon} count={0} name="cart items"/>
            <Card Icon={BagIcon} count={5} name="order items"/>
            <Card Icon={WalletIcon} count={0} name="balance"/>
        </div>
        <div className="flex items-center justify-between">
            <div className="bg-white rounded-4xl p-5">
                <h3 className="text-primary-dark-blue text-xl font-semibold">Account Details</h3>
                <div className="rounded-4xl border border-grey-100 py-10 mt-10 px-7 pr-24">
                    <div>
                        <p>mr John dole</p>
                        <p>09093284414</p>
                        <p>mrjohndoe@gmail.com</p>
                    </div>
                    <Button type="button" color="#FF5000" outline={true}>
                        <div className="flex gap-3">
                            <EditIcon size="25" color="#FF5000"/>
                            <p>Edit Profile</p>
                        </div>
                    </Button>
                </div>
            </div>
            <div>
                <h3>Accoun Details</h3>
                <div>
                    <div>
                        <p>mr John dole</p>
                        <p>09093284414</p>
                        <p>mrjohndoe@gmail.com</p>
                    </div>
                    <Button type="button" color="#FF5000" outline={true}>
                        <div>
                            <EditIcon size="25" color="#FF5000"/>
                            <p>Edit Profile</p>
                        </div>
                    </Button>`
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Overview;