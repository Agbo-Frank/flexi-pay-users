import Button from "../../components/Button";
import BagIcon from "../../components/icons/Bag";
import CartIcon from "../../components/icons/CartIcon";
import EditIcon from "../../components/icons/EditIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import Iicon from "../../components/icons/interface";
import WalletIcon from "../../components/icons/WalletIcon";

import supportImage from '../../asset/supportImage.png'

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

        <div className="flex items-center justify-between my-7 gap-5">
            <div className="bg-white rounded-4xl p-5 w-1/2">
                <h3 className="text-primary-dark-blue text-xl font-semibold">Account Details</h3>
                <div className="rounded-4xl border border-grey-100 pt-10 pb-5 mt-10 px-7 w-11/12">
                    <div className="text-grey-200 leading-7 capitalize">
                        <p>mr John dole</p>
                        <p>09093284414</p>
                        <p>mrjohndoe@gmail.com</p>
                    </div>
                    <div className="mt-14">
                        <Button type="button" color="#FF5000" outline={true}>
                            <div className="flex gap-3">
                                <EditIcon size="25" color="#FF5000"/>
                                <p>Edit Profile</p>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-4xl p-5 w-1/2">
                <h3 className="text-primary-dark-blue text-xl font-semibold">Account Details</h3>
                <div className="rounded-4xl border border-grey-100 pt-10 pb-5 mt-10 px-7 w-11/12">
                    <div className="text-grey-200 leading-7 capitalize">
                        <p>mr John dole</p>
                        <p>09093284414</p>
                        <p>mrjohndoe@gmail.com</p>
                    </div>
                    <div className="mt-14">
                        <Button type="button" color="#FF5000" outline={true}>
                            <div className="flex gap-3">
                                <EditIcon size="25" color="#FF5000"/>
                                <p>Edit Profile</p>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-primary-dark-blue items-center flex justify-between rounded-5xl pr-5">
            <div className="flex gap-6 items-center text-white w-4/6">
                <img src={supportImage} alt="support-img"/>
                <p>
                    <p className="font-semibold text-2xl">Do you have any complains???</p>
                    <p className="text-sm">kindly reach out to our customer care, we will be happy to answer and assist you</p>
                </p>
            </div>
            <Button type="button" color="#FF5000">
                Contact Us
            </Button>
        </div>
      </div>
    );
  }
  
  export default Overview;