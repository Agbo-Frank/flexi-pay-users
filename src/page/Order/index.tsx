import DashboardWrapper from "../../components/DashboardWrapper"
import { useState } from "react"
import Order from "./orderItem"
import { Wrapper, WrapperHeader } from "../../components"
import { useGetUserOrdersQuery } from "../../redux/api/Order"


interface IOrderModel {
    orderDetails: boolean
}


export function Orders (){
    let [openModel, setOpenModel] = useState<IOrderModel>({
        orderDetails: false
    })

    let { data } = useGetUserOrdersQuery()
    console.log(data)
    return(
        <>
            <DashboardWrapper>
                <Wrapper>
                    <WrapperHeader>Order (0)</WrapperHeader>
                    {/* <Empty name="order" Icon={BagIcon}/> */}
                    {/* <div className="w-full mt-2 sm:mt-3 overflow-y-auto h-fit"> */}
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="subscription" openModel={setOpenModel}/>
                        <Order type="pending" openModel={setOpenModel}/>
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="delivered" openModel={setOpenModel}/>
                        <Order type="subscription" openModel={setOpenModel}/>
                    {/* </div> */}
                </Wrapper>
            </DashboardWrapper>
        </>
    )
}

export default Orders