import DashboardWrapper from "../../components/DashboardWrapper";
import { Button, Wrapper, WrapperHeader } from '../../components'
import { EditIcon } from '../../components/icons'
import supportImage from '../../asset/supportImage.png'
import { toggleEditProfile } from '../../redux/slice/modal'
import { useDispatch } from "react-redux";

import { useGetUserQuery } from "../../redux/slice/User";
import { Skeleton, Button as MuiButton } from "@mui/material";
import DeliveryAddress from "../Dashboard/DeliceryAddress";
import { useState } from "react";

export function Profile(){
    let [open, setOpen] = useState(false)
    let dispatch = useDispatch()
    let { user, loading} = useGetUserQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.result.data,
            loading: isLoading
        })
    })
    return(
        <>
            <DashboardWrapper>
                <div className="flex flex-col space-y-9">
                    <div className="flex justify-between items-stretch space-x-8">
                        <Wrapper styles="rounded-xl p-5 w-1/2">
                            <WrapperHeader>Account Details</WrapperHeader>
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
                                            <p className="capitalize">{user?.first_name} {user?.last_name}</p>
                                            <p>{user?.phone_number}</p>
                                            <p>{ user?.email }</p>
                                        </>
                                    }
                                </div>
                                <div className="mt-10 w-6/12">
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
                        </Wrapper>

                        <Wrapper styles="rounded-xl p-5 w-1/2">
                            <WrapperHeader>Delivery Address</WrapperHeader>
                            <DeliveryAddress user={user} loading={loading}/>
                        </Wrapper>
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
        </>
    )
}

export default Profile