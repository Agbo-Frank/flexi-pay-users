import ModelWrapper from "../../components/Models/ModelWrapper";
import TV from '../../asset/monitor.png'
import MarkCircleIcon from "../../components/icons/MarkCircleIcon";
import { IOrderModel } from "./orderItem";
import { formatNumber } from "../../utils";
import { CardImg, CardText } from "../../components";
import moment from "moment";

interface ITrackRec {
    name: string;
    color: string;
    date: string;
    line?: boolean;
    active: boolean;
    style: 'placed'| 'proccessing' | 'delivered' | 'pending' | string
}

function TrackRec({ name, color, date, style, line = false, active}: ITrackRec){
    let splitedDate: string[] = date.split('-')
    date = splitedDate.join(' - ')

    return(
        <div className={`active border-l-2  relative ${line && 'h-20'}`}>
            <div className="flex gap-4 items-center absolute -top-4 -left-4">
                {/* <MarkCircleIcon size="30" color={color}/> */}
                <i className="fa-solid fa-circle-check text-[30px]"></i>
                <div className="relative">
                    <p className={`uppercase text-sm rounded-lg py-2 ${style} ${!active && "opacity-30"} px-4 text-white`}>{ name }</p>
                    <small className="text-grey-700 text-sm absolute top-full left-0 mt-2 ">{ date }</small>
                </div>
            </div>
        </div>
    )
}

function Tracker({order, open, close}: IOrderModel){
    let orderStatus = ['placed', 'pending', 'processed', 'shipped', 'delivered']
//     'failed',
//    'success',
//     'paid',
//     'processed',
    return(
        <ModelWrapper isOpen={open} closeModal={close}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="top-0 left-0 bg-white z-50 pb-2">
                    <h2 className="text-lg text-primary-dark-blue font-semibold m-4 mx-5">Tracker Order</h2>
                    {/* <div className="mx-4 mt-3 flex justify-between items-center"> */}
                        <div className="flex gap-4 mx-5">
                            <CardImg src={order.order_detail.product.product_images[0].image_link} />
                            <div className="flex flex-col sm:h-full items-stretch">
                                <CardText>{order.order_detail.product.name}</CardText> 
                                <small className="text-grey-200 text-xs sm:text-sm">Placed on  {moment(order.order_detail.created_at).format('L')}</small>
                                <small className="text-grey-200 text-xs sm:text-sm">orderId: {345679}</small>
                                <p className={`${ order.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ order.status }</p>
                                <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail.price)}</p>
                            </div>
                        </div>
                    {/* </div> */}
                </div>

                <div className="text-grey-200 text-sm border border-solid border-grey-100 rounded-lg mb-3 m-5 p-7 xs:p-10 overflow-hidden">
                    <div className="w-full h-full">
                        {
                            orderStatus.map((status, idx) => (
                                <TrackRec 
                                    name={status} 
                                    style={status} 
                                    color="#A0A0A1" 
                                    active={orderStatus.indexOf('pending') + 1 > orderStatus.indexOf(status)}
                                    date="12-05-2021" 
                                    line={orderStatus.indexOf(status) !== orderStatus.length - 1}
                                />
                            ))
                        }
                        
                        {/* <TrackRec name="proccesssing" style="proccessing" color="#E78405" date="12-05-2021" line/>
                        <TrackRec name="out for delivery" style="pending" color="#FF5000" date="12-05-2021" line/>
                        <TrackRec name="delivered" style="delivered" color="#91CD5E" date="12-05-2021"/> */}
                    </div>

                    <p className="mt-20">Your order has been successfully delivered</p>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default Tracker