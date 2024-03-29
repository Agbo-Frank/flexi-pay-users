import CalenderIcon from "../../components/icons/CalenderIcon";
import { CardWrapper, CardText, CopyText } from "../../components";
import ModelWrapper from '../../components/Models/ModelWrapper';
import { formatNumber, formatString } from '../../utils';
import moment from 'moment';
import { IOrderModel } from './orderItem';

function OrderDetails({order, open, close}: IOrderModel){
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Order Details">
            <div className="h-full overflow-y-auto sm:scrollbar relative">
                <div className="sticky top-0 left-0 bg-white">
                    <CardWrapper 
                    styles="rounded"
                    // className="mx-4 mt-3 flex justify-between items-center"
                    >
                       <div className="flex w-full sm:w-full space-x-2 sm:space-x-4 items-stretch sm:pb-0">
                            <img src={order.order_detail[0].product.product_images[0].image_link} alt="" className="w-[108px] h-[108px]  object-cover rounded sm:rounded-md"/>
                            <div className="flex flex-col w-full">
                                <CardText>{ order.order_detail[0].product.name }</CardText>
                                <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail[0].price)}</p>
                            </div>
                        </div>
                    </CardWrapper>
                </div>
                
                <div className="m-4 h-fit">
                    <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg mb-3">
                        <div className="flex justify-start items-center gap-3">
                            <p className="flex gap-2 items-center">
                                <CalenderIcon color='#555555' size={"14"} />
                                <p>{moment(order.order_detail[0].created_at).format('l')}</p>
                            </p>
                            <p className={`${ order.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ formatString(order.status) }</p>
                        </div>
                        {/* <p>Order No: <CopyText text={`${345679}`}/></p> */}
                        <p>Quantity: {order.order_detail[0].quantity}</p>
                        <p>Total: ₦ {formatNumber(parseFloat(order.order_detail[0].price) * order.order_detail[0].quantity)}</p>
                        <p>Order Placed: {moment(order.order_detail[0].created_at).format('l')}</p>
                        <p className="capitalize">Order Type: {order.order_type}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-5 mb-4">
                        <div className="text-grey-200 text-sm p-3 border border-solid rounded-lg w-full leading-7 sm:w-1/2">
                            {/* <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Door Delivery</p>
                            </div> */}

                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Address</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">{order.customer?.first_name + " " + order.customer?.last_name}</p>

                                {
                                    order.order_detail.length > 0 &&
                                
                                    <p className="capitalize text-grey-200 text-sm w-9/12">

                                        {
                                            order.order_detail[0]?.delivery_address?.house_address + ", " +
                                            order.order_detail[0]?.delivery_address?.nearest_bus_stop + ", " +
                                            order.order_detail[0]?.delivery_address?.city + ", " +
                                            order.order_detail[0]?.delivery_address?.state
                                        }
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg w-full sm:w-1/2">
                            {/* <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Installmental </p>
                            </div> */}

                            <div className="leading-7">
                                <h2 className="font-semibold">Shipment Details</h2>
                                {/* <p className="capitalize text-grey-200 text-sm mb-2">Installmental</p> */}

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                    <p>
                                        <span className="font-medium">Delivery period: </span>
                                        <span>{order?.shipment_detail?.delivery_period}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Delivery Fee: </span>
                                        <span>{order?.shipment_detail?.delivery_fee}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Tracking Code: </span>
                                        <span><CopyText text={order?.shipment_detail?.tracking_code} /></span>
                                    </p>
                                    <p>
                                        <span className="font-medium">Courier ID: </span>
                                        <span><CopyText text={order?.shipment_detail?.courier_id} /></span>
                                    </p>
                                    {/* <p>
                                        <span className="font-medium">Tracking Code: </span>
                                        <span>{order.shipment_details.tracking_code}</span>
                                    </p> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default OrderDetails