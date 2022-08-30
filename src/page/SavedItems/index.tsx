import Empty from "../../components/Empty"
import { SavedItem, SavedItemSkeleton } from "./SavedItemsCard"
import { useGetUserSavedItemsQuery } from "../../redux/slice/SavedItems"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../../utils/constants"
import { Wrapper, WrapperHeader } from "../../components"
import { Button, Skeleton } from "@mui/material"
import { HeartIcon } from "../../components/icons"
import DashboardWrapper from "../../components/DashboardWrapper"
import { useNavigate } from "react-router-dom"




export function SavedItems (){
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let { savedItems, loading } = useGetUserSavedItemsQuery({guest_id: cookies["flex-pay-cookie"]? cookies["flex-pay-cookie"] : ""}, {
        selectFromResult: ({data, isLoading}) => ({
            savedItems: data?.result.data,
            loading: isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    let navigate = useNavigate()
    return(
        <DashboardWrapper>
            <Wrapper>
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
                    savedItems && savedItems?.length > 0 ?
                        <>
                            <WrapperHeader>Saved Items({savedItems?.length})</WrapperHeader>
                            <div className="w-full mt-8 mb-2 overflow-y-auto h-fit scrollbar">
                                {
                                    savedItems.map((savedItem, idx) => <SavedItem savedItem={savedItem}/>)
                                }
                            </div>
                        </>:
                        <Empty 
                            title="your cart is empty " 
                            Icon={HeartIcon}
                            message="You currently don’t have any item in your cart, kindly to go shop and add item to your cart"
                            button={
                            <Button
                                startIcon={<HeartIcon color="white" size="20"/>}
                                color="secondary"
                                size="large"
                                variant="contained"
                                onClick={() => navigate("/")}>
                                    Start Shopping
                            </Button>
                        }/>
                }
            </Wrapper>
        </DashboardWrapper>
    )
}

export default SavedItems