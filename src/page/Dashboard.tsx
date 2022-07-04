import Button from "../components/Button";
import {BagIcon, CartIcon, EditIcon, HeartIcon, WalletIcon} from "../components/icons";

import supportImage from '../asset/supportImage.png'

import DashboardWrapper from "../components/DashboardWrapper";

import Iicon from "../components/icons/interface";


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
        <div className="flex gap-5 items-center px-7 py-6 bg-white rounded-4xl hover:card-shadow shadow-sm cursor-pointer w-1/4">
            <Icon size="35" color={color} />
            <div>
                <p className="text-2xl font-bold">{ count }</p>
                <p className="text-sm text-grey-700 capitalize">{ name }</p>
            </div>
        </div>
    )
}

export  function Dashboard (): JSX.Element {
    return(
        <DashboardWrapper>
            <div>
                <div className="flex justify-between gap-4">
                    <Card Icon={HeartIcon} count={13} name="saved items" />
                    <Card Icon={CartIcon} count={0} name="cart items"/>
                    <Card Icon={BagIcon} count={5} name="order items"/>
                    <Card Icon={WalletIcon} count={0} name="balance"/>
                </div>

                <div className="flex items-center justify-between my-7 gap-5">
                    <div className="bg-white rounded-4xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Account Details</h3>
                        <div className="rounded-4xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
                            <div className="text-grey-200 leading-9 capitalize">
                                <p>mr John dole</p>
                                <p>09093284414</p>
                                <p>mrjohndoe@gmail.com</p>
                            </div>
                            <div className="mt-14 w-6/12">
                                <Button type="button" color="#FF5000" outline={true}>
                                    <div className="flex gap-3 items-center">
                                        <EditIcon size="25" color="#FF5000"/>
                                        <p>Edit Profile</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-4xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Account Details</h3>
                        <div className="rounded-4xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
                            <div className="text-grey-200 leading-9 capitalize">
                                <p>mr John dole</p>
                                <p>09093284414</p>
                                <p>mrjohndoe@gmail.com</p>
                            </div>
                            <div className="mt-14 w-6/12">
                                <Button type="button" color="#FF5000" outline={true}>
                                    <div className="flex gap-3 items-center">
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
                    <div className="w-2/12">
                        <Button type="button" color="#FF5000">
                            <p className="mx-3">Contact Us</p>
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard