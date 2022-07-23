import Button from "../components/Button";
import {BagIcon, CartIcon, EditIcon, HeartIcon, WalletIcon} from "../components/icons";

import supportImage from '../asset/supportImage.png'

import DashboardWrapper from "../components/DashboardWrapper";

import Iicon from "../components/icons/interface";
import { useGetUserQuery } from "../redux/slice/User";


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
        <div className="flex space-x-5 items-center px-7 py-6 bg-white rounded-xl hover:card-shadow hover:shadow-lg cursor-pointer w-1/4">
            <Icon size="35" color={color} />
            <div>
                <p className="text-2xl font-bold">{ count }</p>
                <p className="text-sm text-grey-700 capitalize">{ name }</p>
            </div>
        </div>
    )
}

export  function Dashboard (): JSX.Element {
    let {data, isLoading: loading} = useGetUserQuery()
    console.log(data, loading)
    return(
        <DashboardWrapper>
            <div>
                <div className="flex justify-between space-x-5">
                    <Card Icon={HeartIcon} count={13} name="saved items" />
                    <Card Icon={CartIcon} count={0} name="cart items"/>
                    <Card Icon={BagIcon} count={5} name="order items"/>
                    <Card Icon={WalletIcon} count={0} name="balance"/>
                </div>

                <div className="flex items-stretch justify-between my-7 space-x-6">
                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Account Details</h3>
                        <div className="rounded-xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
                            <div className="text-grey-200 leading-9 capitalize">
                                <p className="capitalize">{data?.gender === 'male'? 'Mr.': 'Mrs'} {data?.first_name} {data?.last_name}</p>
                                <p>{data?.phone_number}</p>
                                <p>{ data?.email }</p>
                            </div>
                            <div className="mt-14 w-6/12">
                                <Button type="button" color="#FF5000" outline={true}>
                                    <div className="flex gap-3 items-center">
                                        <EditIcon size="20" color="#FF5000"/>
                                        <p>Edit Profile</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Delivery Address</h3>
                        <div className="rounded-xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
                            <div className="text-grey-200 leading-9 capitalize">
                                <p>Plot 101, Redeemed Road, Eagle Island</p>
                                <p>Port Harcourt, Rivers State</p>
                                <p>Nigeria.</p>
                            </div>
                            <div className="mt-14 w-6/12">
                                <Button type="button" color="#FF5000" outline={true}>
                                    <div className="flex gap-3 items-center">
                                        <EditIcon size="20" color="#FF5000"/>
                                        <p>Edit Address</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary-dark-blue items-center flex justify-between rounded-5xl pr-5">
                    <div className="flex space-x-6 items-center text-white w-4/6">
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