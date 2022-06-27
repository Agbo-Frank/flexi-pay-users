import BagIcon from "../components/icons/Bag"
import {
    HeartIcon, CartIcon, 
    TrashIcon, TrackIcon, 
    DocIcon, StarIcon
} from "../components/icons"

import ItemWrapper from "../components/ItemWrapper"
import Empty from "../components/Empty"
import Button from "../components/Button"

import TV from '../asset/monitor.png'
import DashboardWrapper from "../components/DashboardWrapper"
import OrderDetails from "../components/Models/OrderDetails"
import { useState, Dispatch, SetStateAction } from "react"

import { useDispatch } from 'react-redux'
import { seeOrderDetails, trackOrder, toggleProductReview } from "../redux/slice/modalSlice"




interface IOrderModel {
    orderDetails: boolean
}


interface IOrderDetails {
    type: 'pending' | 'delivered' | 'processing',
    openModel?: Dispatch<SetStateAction<IOrderModel>>
}

function Details({ type }: IOrderDetails){
    return(
        <div className="flex flex-col w-11/12 h-full items-stretch justify-evenly">
            <p>43" inches D-LED TV +1 years Warranty - Black</p>
            <small className="text-grey-200">orderId: 345679</small>
            <p className={`${ type } text-white p-1 px-2 rounded-sm uppercase text-xs w-fit`}>{ type }</p>
            {/* <p className="font-bold text-primary-dark-blue">150, 000</p> */}
        </div>
    )
}

function Buttons ({type, openModel}: IOrderDetails): JSX.Element{
    const dispatch = useDispatch()

    if(type === 'processing'){
        return(
            <Button color="#ff5000" outline onClick={() => dispatch(trackOrder())}>
                <div className="flex gap-2 items-center">
                    <TrackIcon color="#ff5000" size="17"/>
                    <p className="text-primary-orange-200 text-sm">Track Item</p>
                </div>
            </Button>
        )
    }
    else if(type === 'delivered'){
        return (
        <>
             <Button color="#ff5000" onClick={() => dispatch(seeOrderDetails())}>
                <div className="flex gap-2 items-center">
                    <DocIcon color='white' size="17" />
                    <p className="text-white text-sm">See Details</p>
                </div>
            </Button>
            <Button color="#ff5000" outline onClick={() => dispatch(toggleProductReview())}>
                <div className="flex gap-2 items-center">
                    <StarIcon color="#ff5000" size="17"/>
                    <p className="text-primary-orange-200 text-sm">Rate Item</p>
                </div>
            </Button>
        </>
        )
    }
    return(<>
        <Button color="#ff5000" onClick={() => dispatch(trackOrder())}>
            <div className="flex gap-2 items-center">
                <TrackIcon color='white' size="17" />
                <p className="text-white text-sm">Track Items</p>
            </div>
        </Button>
        <Button color="#ff5000" outline>
            <p className="text-primary-orange-200 text-center text-sm">Cancel</p>
        </Button>
    </>)
}

function Order ({type, openModel}: IOrderDetails) {
    return(
        <ItemWrapper 
            img={TV} 
            lower={<Buttons type={type} openModel={openModel}/>}
            upper={<Details type={type} />}
        />     
    )
}


export function Orders (){
    let [openModel, setOpenModel] = useState<IOrderModel>({
        orderDetails: false
    })
    return(
        <>
            <DashboardWrapper>
                <div className="bg-white w-full rounded-4xl py-5 px-4">
                    <h3 className="text-primary-dark-blue text-lg font-semibold">Order (0)</h3>
                    {/* <Empty name="order" Icon={BagIcon}/> */}
                    <div className="w-full mt-8 mb-2 overflow-y-auto h-screen scrollbar">
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="delivered" openModel={setOpenModel}/>
                        <Order type="pending" openModel={setOpenModel}/>
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="delivered" openModel={setOpenModel}/>
                        <Order type="pending" openModel={setOpenModel}/>
                    </div>
                </div>
            </DashboardWrapper>
        </>
    )
}

export default Orders