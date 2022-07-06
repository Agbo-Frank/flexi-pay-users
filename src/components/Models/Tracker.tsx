import ModelWrapper from "./ModelWrapper";
import TV from '../../asset/monitor.png'
import MarkCircleIcon from "../icons/MarkCircleIcon";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from '../../redux/store'
import { trackOrder  } from '../../redux/slice/modalSlice'

interface ITrackRec {
    name: string;
    color: string;
    date: string;
    line?: boolean;
    style: 'placed'| 'proccessing' | 'delivered' | 'pending'
}

function TrackRec({ name, color, date, style, line = false}: ITrackRec){
    let splitedDate: string[] = date.split('-')
    date = splitedDate.join(' - ')

    return(
        <div className={`border-l-2  relative ${line && 'h-20'}`}>
            <div className="flex gap-4 items-center absolute -top-4 -left-4">
                <MarkCircleIcon size="30" color={color}/>
                <div className="relative">
                    <p className={`uppercase text-sm rounded-lg py-2 ${style} px-4 text-white`}>{ name }</p>
                    <small className="text-grey-700 text-sm absolute top-full left-0 mt-2 ">{ date }</small>
                </div>
            </div>
        </div>
    )
}

function Tracker(){
    const isOpen: boolean = useSelector((state: RootState) => state.modal.trackOrder)
    const dispatch = useDispatch()
    return(
        <ModelWrapper isOpen={isOpen} closeModal={() => dispatch(trackOrder())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky top-0 left-0 bg-white z-50 pb-2">
                    <h2 className="text-lg text-primary-dark-blue font-semibold m-4 mx-5">Tracker Item</h2>
                    {/* <div className="mx-4 mt-3 flex justify-between items-center"> */}
                        <div className="flex gap-4 items-center mx-5">
                            <div className="w-24">
                                <img src={TV} className="w-full h-auto object-contain "/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="w-9/12 text-grey-700 text-sm">43" inches D-LED TV +1 years Warranty - Black</p>
                                <p className="font-medium text-primary-dark-blue text-sm">150, 000</p>
                            </div>
                        </div>
                    {/* </div> */}
                </div>

                <div className="text-grey-200 text-sm border border-solid border-grey-100 rounded-2xl mb-3 m-5 p-10 overflow-hidden">
                    <div className="w-full h-full">
                        <TrackRec name="order placed" style="placed" color="#A0A0A1" date="12-05-2021" line/>
                        <TrackRec name="proccesssing" style="proccessing" color="#E78405" date="12-05-2021" line/>
                        <TrackRec name="out for delivery" style="pending" color="#FF5000" date="12-05-2021" line/>
                        <TrackRec name="delivered" style="delivered" color="#91CD5E" date="12-05-2021"/>
                    </div>

                    <p className="mt-20">Your order has been successfully delivered</p>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default Tracker