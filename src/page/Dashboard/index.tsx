import {BagIcon, CartIcon, EditIcon, HeartIcon, NairaIcon, WalletIcon} from "../../components/icons";

import supportImage from '../../asset/supportImage.png'

import DashboardWrapper from "../../components/DashboardWrapper";
import { useGetUserQuery } from "../../redux/api/User";
import { Button, Skeleton } from "@mui/material";
import { useGetUserCartQuery } from "../../redux/api/Cart";
import { FLEXIPAY_COOKIE } from "../../utils/constants";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useLazyGetWalletDetailsQuery } from "../../redux/api/wallet";
import { formatNumber } from "../../utils";
import Card from "./card";
import DeliveryAddress from "./DeliceryAddress";
import { Wrapper, WrapperHeader } from "../../components";
import { useGetUserSavedItemsQuery } from "../../redux/api/SavedItems";
import { useDispatch } from "react-redux";
import { toggleEditProfile } from "../../redux/slice/modal";
import { useGetUserOrdersQuery } from "../../redux/api/Order";
import { useNavigate } from "react-router-dom";


export  function Dashboard (): JSX.Element {
    let { user, loading} = useGetUserQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.result.data,
            loading: isLoading
        })
    })
    let dispatch = useDispatch()

    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    // let { carts } = useGetUserCartQuery({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""}, {
    //     selectFromResult: ({ data }) => ({
    //         carts: data?.result.data,
    //     })
    // })
    let { savedItems } = useGetUserSavedItemsQuery(undefined, {
        selectFromResult: ({ data }) => ({
            savedItems: data?.result.data,
        })
    })
    let [getUserBalance, { wallet }] = useLazyGetWalletDetailsQuery({
        selectFromResult: ({ data }) => ({
            wallet: data?.result.data
        })
    })
    let { orders } = useGetUserOrdersQuery(1, {
        selectFromResult: ({ data, isLoading }) => ({
            orders: data?.result?.data
        })
    })
    console.log(orders)

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user])
    const navigate = useNavigate()
    return(
        <DashboardWrapper>
            <div className="bg-white sm:bg-transparent">
                <div className="flex py-3 sm:py-4 whitespace-nowrap overflow-x-auto justify-between space-x-5 sm:space-x-2 px-2">
                    <Card Icon={HeartIcon} count={savedItems?.length || 0} name="saved items" />
                    {/* <Card Icon={CartIcon} count={carts?.length || 0} name="cart items"/> */}
                    <Card Icon={BagIcon} count={orders?.total || 0} name="order items"/>
                    <Card Icon={NairaIcon} count={user?.reserved_account?.account_number ? formatNumber(`${wallet?.balance}`) : 0} name="balance"/>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch justify-between my-7 space-y-3 sm:space-y-0 sm:space-x-6 px-2">
                    <Wrapper styles="rounded-xl p-3 sm:p-5 w-full sm:w-1/2 bg-[#F4F4F4] sm:bg-white">
                        <WrapperHeader>Account Details</WrapperHeader>
                        <div className="rounded-xl border pt-5 sm:pt-10 pb-5 mt-3 sm:mt-5 px-5 sm:px-7 w-full bg-white">
                            <div className="text-grey-200 leading-9">
                                {
                                    loading ?
                                    <>
                                        <Skeleton variant="text" />
                                        <Skeleton variant="text" />
                                    </> :
                                    <>
                                        <p className="capitalize">{user?.first_name} {user?.last_name}</p>
                                        <p>{user?.phone_number}</p>
                                        <p>{ user?.email }</p>
                                    </>
                                }
                            </div>
                            <div className="mt-10 sm:w-6/12">
                                <Button 
                                    variant="contained"
                                    startIcon={<EditIcon size="20" color="white"/>}
                                    size="large"
                                    color="secondary"
                                    onClick={() => dispatch(toggleEditProfile())}>
                                        Edit Profile
                                </Button>
                            </div>
                        </div>
                    </Wrapper>
                    <Wrapper styles="rounded-xl p-3 sm:p-5 w-full sm:w-1/2 bg-[#F4F4F4] sm:bg-white">
                        <WrapperHeader>Address</WrapperHeader>
                        <DeliveryAddress />
                    </Wrapper>
                </div>

                <div className="hidden sm:flex  bg-primary-dark-blue items-center justify-between rounded-xl pr-5">
                    <div className="flex space-x-6 items-center text-white w-4/6">
                        <img src={supportImage} alt="support-img"/>
                        <p>
                            <p className="font-semibold text-2xl">Do you have any complains???</p>
                            <p className="text-sm">kindly reach out to our customer care, we will be happy to answer and assist you</p>
                        </p>
                    </div>

                    <div className="w-2/12">
                        <Button 
                            type="button" 
                            color="secondary"
                            variant='contained'
                            size="large"
                            onClick={() => navigate("/support")}>
                                Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard