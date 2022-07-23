import DashboardWrapper from "../components/DashboardWrapper";
import { Button } from '../components'
import { EditIcon } from '../components/icons'
import supportImage from '../asset/supportImage.png'
import { toggleEditProfile } from '../redux/slice/modalSlice'
import { useDispatch } from "react-redux";

import { useGetUserQuery } from "../redux/slice/User";

export function Profile(){
    let dispatch = useDispatch()
    let {data, isLoading: loading} = useGetUserQuery()
    return(
        <DashboardWrapper>
            <div className="flex flex-col space-y-9">
                <div className="flex justify-between items-stretch space-x-8">
                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Account Details</h3>
                        <div className="rounded-xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
                            <div className="text-grey-200 leading-9 capitalize">
                                <p className="capitalize">{data?.gender === 'male'? 'Mr.': 'Mrs'} {data?.first_name} {data?.last_name}</p>
                                <p>{data?.phone_number}</p>
                                <p>{ data?.email }</p>
                            </div>
                            <div className="mt-14 w-6/12">
                                <Button type="button" color="#FF5000" onClick={() => dispatch(toggleEditProfile())}>
                                    <div className="flex space-x-3 items-center">
                                        <EditIcon size="20" color="white"/>
                                        <p className="text-sm">Update Profile</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-primary-dark-blue text-lg font-semibold">Delivery Address </h3>
                            <div className="w-4/12">
                                <Button type="button" color="#FF5000">
                                    <p className="text-sm">Add Address</p>
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-xl border border-grey-100 pt-5 pb-5 mt-5 px-3 w-full h-10/12">
                            <div className="text-grey-200 leading-7 capitalize bg-grey-900 py-4 px-4 rounded-xl">
                                <p className="font-light">Plot 101, Redeemed Road, Eagle Island</p>
                                <p className="font-light">Port Harcourt, Rivers State, Nigeria.</p>
                                <p className="font-light">09093284414</p>
                                <div className="flex space-x-3 items-center ml-auto justify-end mt-7 cursor-pointer">
                                    <EditIcon size="20" color="#FF5000"/>
                                    <p className="text-primary-orange-200 text-sm">Edit Address</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-primary-dark-blue items-center flex justify-between rounded-xl pr-5">
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

export default Profile