import DashboardWrapper from "../../components/DashboardWrapper"
import { useEffect, useState } from "react"
import Order from "./orderItem"
import { Empty, Wrapper, WrapperHeader } from "../../components"
import { useLazyGetUserOrdersQuery } from "../../redux/api/Order"
import { BagIcon } from '../../components/icons'
import { Button, Pagination, Skeleton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { SavedItemSkeleton } from "../SavedItems/SavedItemsCard"


interface IOrderModel {
    orderDetails: boolean
}

export function Orders (){
    let navigate = useNavigate()
    let [page, setPage] = useState(1)
    let [getOrder, { orders, pagination, loading }] = useLazyGetUserOrdersQuery({
        selectFromResult: ({ data, isLoading }) => ({
            orders: data?.result?.data?.data,
            pagination: data?.result?.data,
            loading: isLoading
        })
    })
    useEffect(() => {
        getOrder(page)
    }, [loading, page])
    return(
        <>
            <DashboardWrapper>
                <Wrapper>
                    <WrapperHeader>Order ({pagination?.total || 0})</WrapperHeader>
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
                        !orders || orders?.length === 0 ?
                        <Empty 
                        title="You have no order yet"
                        Icon={BagIcon}
                        message="You haven't placed any order, kindly place an order now!"
                        button={
                            <Button
                                startIcon={<BagIcon color="white" size="20"/>}
                                color="secondary"
                                size="large"
                                variant="contained"
                                onClick={() => navigate("/")}>
                                    Start Shopping
                            </Button>
                        }/> 
                        :
                        orders?.map((order, idx) => (
                            <Order order={order} key={idx}/>
                        ))
                    }
                </Wrapper>
                <div className="ml-auto float-right my-5">
                    {
                        orders &&
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

export default Orders