import Empty from "../../components/Empty"
import { SavedItem, SavedItemDummy, SavedItemSkeleton } from "./SavedItemsCard"
import { useGetUserSavedItemsQuery } from "../../redux/api/SavedItems"
import { useCookies } from "react-cookie"
import { FLEXIPAY_COOKIE } from "../../utils/constants"
import { Wrapper, WrapperHeader } from "../../components"
import { Button, Skeleton } from "@mui/material"
import { HeartIcon } from "../../components/icons"
import DashboardWrapper from "../../components/DashboardWrapper"
import { useNavigate } from "react-router-dom"


export function SavedItems (){
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let { savedItems, loading } = useGetUserSavedItemsQuery(undefined, {
        selectFromResult: ({data, isLoading}) => ({
            savedItems: data?.result.data,
            loading: isLoading
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    let navigate = useNavigate()

    console.log(savedItems)
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
                            <div className="w-full mt-2 sm:mt-8 overflow-y-auto h-fit scrollbar">
                                {
                                    savedItems?.map((savedItem, idx) => <SavedItem savedItem={savedItem} key={idx}/>)
                                }
                            </div>
                        </>:
                        <Empty 
                            title="you have no saved items " 
                            Icon={HeartIcon}
                            message="You currently don’t have any item in your Saved Items, kindly to go shop and add item to your Saved Items"
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

// export function SavedItems (){
//     const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

//     let { savedItems, loading } = useGetUserSavedItemsQuery(undefined, {
//         selectFromResult: ({data, isLoading}) => ({
//             savedItems: data?.result.data,
//             loading: isLoading
//         }),
//         refetchOnFocus: true,
//         refetchOnReconnect: true
//     })

//     let navigate = useNavigate()
//     return(
//         <DashboardWrapper>
//             <Wrapper>
//                 {
//                     loading ?
//                     <div className="bg-white rounded-xl py-6">

//                         <div>
//                             <Skeleton sx={{fontSize: 18}} width={"30%"}/>
//                         </div>

//                         <div className="flex flex-col space-y-5 w-full mt-8 mb-2 overflow-y-auto scrollbar h-screen">
//                             {
//                                 [1, 2].map((cart, idx) =>  <SavedItemSkeleton key={idx}/>)
//                             }
//                         </div>
//                     </div> :
//                     savedItems && savedItems?.length === 0 ?
//                         <>
//                             <WrapperHeader>Saved Items({savedItems?.length})</WrapperHeader>
//                             <div className="w-full sm:mt-8 mb-2 overflow-y-auto h-fit scrollbar">
//                                 {
//                                     savedItems.map((savedItem, idx) => <SavedItem savedItem={savedItem}/>)
//                                 }
//                             </div>
//                         </>:
//                         <>
//                             <WrapperHeader>Saved Items({savedItems?.length})</WrapperHeader>
//                             <div className="w-full mt-2 sm:mt-3 overflow-y-auto h-fit scrollbar">
//                                 {
//                                     [1,2,3,4]?.map((savedItem, idx) => <SavedItemDummy />)
//                                 }
//                             </div>
//                         </>
//                 }
//             </Wrapper>
//         </DashboardWrapper>
//     )
// }

export default SavedItems