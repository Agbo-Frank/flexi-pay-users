import DashboardWrapper from "../../components/DashboardWrapper"
import { useState } from "react"
import { Empty, Wrapper, WrapperHeader } from "../../components"
import { Button, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SavedItemSkeleton } from "../SavedItems/SavedItemsCard"
import { useGetUserSubscriptionsQuery } from "../../redux/api/Order"
import { SubscriptionIcon } from "../../components/icons"
import Subscription from "./subscriptionItem"


interface IOrderModel {
    orderDetails: boolean
}

export function Subscriptions (){
    let navigate = useNavigate()
    let { subscriptions, pagination, loading } = useGetUserSubscriptionsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            subscriptions: data?.result.data,
            pagination: data?.result,
            loading: isLoading
        })
    })
    console.log(subscriptions, pagination)
    return(
        <>
            <DashboardWrapper>
                <Wrapper>
                    <WrapperHeader>subscription ({subscriptions?.length || 0})</WrapperHeader>
                    {/* <Empty name="order" Icon={BagIcon}/> */}
                    
                    {   
                        loading ?
                        <div className="bg-white rounded-xl py-6">

                            <div>
                                <Skeleton sx={{fontSize: 18}} width={"30%"}/>
                            </div>

                            <div className="flex flex-col space-y-5 w-full mt-8 mb-2 overflow-y-auto scrollbar h-screen">
                                {
                                    [1, 2].map((cart, idx) =>  <SavedItemSkeleton key={idx}/>)
                                }
                            </div>
                        </div> :
                        !subscriptions || subscriptions?.length === 0 ?
                        <Empty 
                        title="You have no Subscription yet"
                        Icon={SubscriptionIcon}
                        message="You haven't placed any order, kindly place an order now!"
                        button={
                            <Button
                                startIcon={<SubscriptionIcon color="white" size="20"/>}
                                color="secondary"
                                size="large"
                                variant="contained"
                                onClick={() => navigate("/")}>
                                    Start Shopping
                            </Button>
                        }/> :
                        subscriptions?.map(subscription => (
                            <Subscription subscription={subscription}/>
                        ))
                    }
                </Wrapper>
            </DashboardWrapper>
        </>
    )
}

export default Subscriptions