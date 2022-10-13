import DashboardWrapper from "../../components/DashboardWrapper"
import { useEffect, useState } from "react"
import { Empty, Wrapper, WrapperHeader } from "../../components"
import { Button, Pagination, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SavedItemSkeleton } from "../SavedItems/SavedItemsCard"
import { useLazyGetUserSubscriptionsQuery } from "../../redux/api/Order"
import { SubscriptionIcon } from "../../components/icons"
import Subscription from "./subscriptionItem"

export function Subscriptions (){
    let navigate = useNavigate()
    let [page, setPage] = useState(1)
    let [getSubscription, { subscriptions, pagination, loading }] = useLazyGetUserSubscriptionsQuery( {
        selectFromResult: ({ data, isLoading }) => ({
            subscriptions: data?.result.data,
            pagination: data?.result,
            loading: isLoading
        })
    })
    useEffect(() => {
        getSubscription(page)
    }, [loading, page])
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
                <div className="ml-auto float-right my-5">
                    {
                        subscriptions &&
                        <Pagination
                            count={pagination?.last_page} 
                            variant="outlined" 
                            shape="rounded" 
                            color="secondary"
                            hideNextButton={pagination?.next_page_url ? true : false}
                            hidePrevButton={pagination?.prev_page_url ? true : false}
                            page={pagination?.current_page || page}
                            showLastButton
                            showFirstButton
                            onChange={(e, page) => setPage(page)}/>
                    }
                </div>
            </DashboardWrapper>
        </>
    )
}

export default Subscriptions