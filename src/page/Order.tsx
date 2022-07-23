import BagIcon from "../components/icons/Bag"
import {
    HeartIcon, CartIcon, 
    TrashIcon, TrackIcon, 
    DocIcon, StarIcon
} from "../components/icons"

import Empty from "../components/Empty"
import Button from "../components/Button"

import TV from '../asset/monitor.png'
import DashboardWrapper from "../components/DashboardWrapper"
import OrderDetails from "../components/Models/OrderDetails"
import { useState, Dispatch, SetStateAction } from "react"

import { useDispatch } from 'react-redux'
import { seeOrderDetails, trackOrder, toggleProductReview } from "../redux/slice/modalSlice"
import { ProgressBar } from "../components"




interface IOrderModel {
    orderDetails: boolean
}


interface IOrderDetails {
    type: 'pending' | 'delivered' | 'processing' | 'subscription',
    openModel?: Dispatch<SetStateAction<IOrderModel>>
}

function Buttons ({type, openModel}: IOrderDetails): JSX.Element{
    const dispatch = useDispatch()

    if(type === 'processing'){
        return(
            <Button color="#ff5000" outline onClick={() => dispatch(trackOrder())}>
                <div className="flex space-x-2 items-center">
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
                <div className="flex space-x-2 items-center">
                    <DocIcon color='white' size="17" />
                    <p className="text-white text-sm">See Details</p>
                </div>
            </Button>
            <Button color="#ff5000" outline onClick={() => dispatch(toggleProductReview())}>
                <div className="flex space-x-2 items-center">
                    <StarIcon color="#ff5000" size="17"/>
                    <p className="text-primary-orange-200 text-sm">Rate Item</p>
                </div>
            </Button>
        </>
        )
    }
    return(<>
        <Button color="#ff5000" onClick={() => dispatch(trackOrder())}>
            <div className="flex space-x-2 items-center">
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
        <div className="flex justify-between rounded-xl w-full shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 items-center px-6 py-6 mb-7">
            <div className="flex space-x-4 items-stretch">
                <img src={TV} alt="" />
                <div>
                    <div className="flex flex-col w-11/12 h-full items-stretch justify-evenly">
                        <p>43" inches D-LED TV +1 years Warranty - Black</p>
                        <small className="text-grey-200">orderId: 345679</small>
                        {
                            type === 'subscription' ?
                            <ProgressBar width="90%"/>:
                            <p className={`${ type } text-white p-1 px-2 rounded-sm uppercase text-xs w-fit`}>{ type }</p>
                        }
                        
                        {/* <p className="font-bold text-primary-dark-blue">150, 000</p> */}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                <Buttons type={type} openModel={openModel}/>
            </div>
        </div>   
    )
}


export function Orders (){
    let [openModel, setOpenModel] = useState<IOrderModel>({
        orderDetails: false
    })
    return(
        <>
            <DashboardWrapper>
                <div className="bg-white w-full rounded-xl py-5 px-4">
                    <h3 className="text-primary-dark-blue text-lg font-semibold">Order (0)</h3>
                    {/* <Empty name="order" Icon={BagIcon}/> */}
                    <div className="w-full mt-8 mb-2 overflow-y-auto h-screen scrollbar">
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="subscription" openModel={setOpenModel}/>
                        <Order type="pending" openModel={setOpenModel}/>
                        <Order type="processing" openModel={setOpenModel}/>
                        <Order type="delivered" openModel={setOpenModel}/>
                        <Order type="subscription" openModel={setOpenModel}/>
                    </div>
                </div>
            </DashboardWrapper>
        </>
    )
}

export default Orders