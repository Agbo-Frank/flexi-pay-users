import DashboardWrapper from "../../components/DashboardWrapper";
import { Button } from '../../components'
import { EditIcon } from '../../components/icons'
import supportImage from '../../asset/supportImage.png'
import { toggleEditProfile } from '../../redux/slice/modal'
import { useDispatch } from "react-redux";

import { useGetUserQuery } from "../../redux/slice/User";
import { Skeleton, Button as MuiButton } from "@mui/material";

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
                                {
                                    loading ?
                                    <>
                                        <Skeleton variant="text" height={20}/>
                                        <Skeleton variant="text" height={20}/>
                                        <Skeleton variant="text" height={20}/>
                                    </> :
                                    <>
                                        <p className="capitalize">{data?.result?.data.first_name} {data?.result?.data.last_name}</p>
                                        <p>{data?.result?.data.phone_number}</p>
                                        <p>{ data?.result?.data.email }</p>
                                    </>
                                }
                            </div>
                            <div className="mt-14 w-6/12">
                                <MuiButton 
                                    type="button" 
                                    color="secondary"
                                    variant='contained'
                                    size="large"
                                    onClick={() => dispatch(toggleEditProfile())}
                                    startIcon={<EditIcon size="20" color="white"/>}>
                                        Update Profile
                                </MuiButton>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-primary-dark-blue text-lg font-semibold">Delivery Address </h3>
                            <MuiButton 
                                type="button" 
                                color="secondary"
                                variant='contained'
                                size="large"
                                onClick={() => dispatch(toggleEditProfile())}>
                                    Add Address
                            </MuiButton>
                        </div>
                        <div className="rounded-xl border border-grey-100 pt-5 pb-5 mt-5 px-3 w-full h-10/12">
                            <div className="text-grey-200 leading-7 capitalize bg-grey-900 py-4 px-4 rounded-xl">
                                <p className="font-light">Plot 101, Redeemed Road, Eagle Island</p>
                                <p className="font-light">Port Harcourt, Rivers State, Nigeria.</p>
                                <p className="font-light">09093284414</p>
                                <div className="ml-auto w-fit">
                                    <MuiButton 
                                        type="button" 
                                        color="secondary"
                                        size="large"
                                        startIcon={<EditIcon size="20" color="#FF5000"/>}>
                                            Edit Address
                                    </MuiButton>
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
                        <MuiButton 
                            type="button" 
                            color="secondary"
                            variant='contained'
                            size="large">
                                Contact Us
                        </MuiButton>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Profile