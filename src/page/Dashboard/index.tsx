import {BagIcon, CartIcon, EditIcon, HeartIcon, WalletIcon} from "../../components/icons";

import supportImage from '../../asset/supportImage.png'

import DashboardWrapper from "../../components/DashboardWrapper";
import { useGetUserQuery } from "../../redux/slice/User";
import { Button, Skeleton } from "@mui/material";
import { useGetUserCartQuery } from "../../redux/slice/Cart";
import { FLEXIPAY_COOKIE } from "../../utils/constants";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useLazyGetWalletDetailsQuery } from "../../redux/slice/wallet";
import { formatNumber } from "../../utils";
import Card from "./card";
import DeliveryAddress from "./DeliceryAddress";
import { Wrapper, WrapperHeader } from "../../components";
import { useGetUserSavedItemsQuery } from "../../redux/slice/SavedItems";


export  function Dashboard (): JSX.Element {
    let { user, loading} = useGetUserQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.result.data,
            loading: isLoading
        })
    })

    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let { carts } = useGetUserCartQuery({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""}, {
        selectFromResult: ({ data }) => ({
            carts: data?.result.data,
        })
    })
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

    useEffect(() => {
        if(user?.reserved_account?.account_number){
            getUserBalance()
        }
    }, [user])

    console.log(user)
    return(
        <DashboardWrapper>
            <div>
                <div className="flex justify-between space-x-5">
                    <Card Icon={HeartIcon} count={savedItems?.length || 0} name="saved items" />
                    <Card Icon={CartIcon} count={carts?.length || 0} name="cart items"/>
                    <Card Icon={BagIcon} count={5} name="order items"/>
                    <Card Icon={WalletIcon} count={user?.reserved_account?.account_number ? formatNumber(`${wallet?.balance}`) : 0} name="balance"/>
                </div>

                <div className="flex items-stretch justify-between my-7 space-x-6">
                    <div className="bg-white rounded-xl p-5 w-1/2">
                        <h3 className="text-primary-dark-blue text-lg font-semibold">Account Details</h3>
                        <div className="rounded-xl border border-grey-100 pt-10 pb-5 mt-5 px-7 w-full">
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
                            <div className="mt-10 w-6/12">
                                <Button 
                                    variant="outlined"
                                    startIcon={<EditIcon size="20" color="#FF5000"/>}
                                    size="large"
                                    color="secondary">
                                        Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
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
                        <Button 
                            type="button" 
                            color="secondary"
                            variant='contained'
                            size="large">
                                Contact Us
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard