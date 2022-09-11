import TV from '../../asset/monitor.png'
import Button from "../../components/Button";
import BagIcon from "../../components/icons/Bag";
import CalenderIcon from "../../components/icons/CalenderIcon";

import { useDispatch, useSelector } from 'react-redux'
import { CardWrapper, CardImg, CardActions, CardText, CopyText } from "../../components";
import ModelWrapper from '../../components/Models/ModelWrapper';
import { IOrderModel } from './orderItem';
import { formatNumber } from '../../utils';
import moment from 'moment';

function OrderDetails({order, open, close}: IOrderModel){
    return(
        <ModelWrapper isOpen={open} closeModal={close}>
            <div className="h-full overflow-y-auto sm:scrollbar relative">
                <div className="sticky top-0 left-0 bg-white">
                    <h2 className="text-lg text-primary-dark-blue font-semibold m-4">Order Details</h2>
                    <CardWrapper 
                    styles="rounded"
                    // className="mx-4 mt-3 flex justify-between items-center"
                    >
                        <div className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0">
                            <CardImg src={order.order_detail.product.product_images[0].image_link} />
                            <div className="flex flex-col gap-3">
                                <CardText 
                                // className="w-9/12 text-grey-200 text-sm"
                                >{ order.order_detail.product.name }</CardText>
                                <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail.price)}</p>
                            </div>
                        </div>
                        <CardActions 
                        // className="w-4/12"
                        >
                            <Button color="#FF5000">
                                <div className="flex items-center gap-2">
                                    <BagIcon color="white" size="15"/>
                                    <p className="text-sm">Re-Order</p>
                                </div>
                            </Button>
                        </CardActions>
                    </CardWrapper>
                </div>
                
                <div className="m-4 h-fit">
                    <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg mb-3">
                        <div className="flex justify-start items-center gap-3">
                            <p className={`${ order.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ order.status }</p>
                            <p className="flex gap-2 items-center">
                                <CalenderIcon color='#555555' size={"14"} />
                                <p>{moment(order.order_detail.created_at).format('l')}</p>
                            </p>
                        </div>
                        <p>Order No: <CopyText text={`${345679}`}/></p>
                        <p>Quantity: {order.order_detail.quantity}</p>
                        <p>Total: ₦ {formatNumber(`${order.order_detail.price}`)}</p>
                        <p>Order Placed: {moment(order.order_detail.created_at).format('l')}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-5 mb-4">
                        <div className="text-grey-200 text-sm p-3 border border-solid rounded-lg w-full sm:w-1/2 leading-7">
                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Door Delivery</p>
                            </div>

                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Address</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">{order.customer?.first_name + " " + order.customer?.last_name}</p>

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                    Plot 101, Redeemed Road, Eagle Island, Port Harcourt, 
                                    Rivers State, Nigeria.
                                    
                                </p>
                            </div>
                        </div>
                        <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg w-full sm:w-1/2">
                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Installmental </p>
                            </div>

                            <div className="leading-7">
                                <h2 className="font-semibold">Payment Details</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">Installmental</p>

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                    <p>
                                        <span className="font-medium">Plan: </span>
                                        <span>₦ 10,000</span>
                                    </p>

                                    <p>
                                        <span className="font-medium">Interval: </span>
                                        <span> Weekly </span>
                                    </p>

                                    <p>
                                        <span className="font-medium">Total: </span>
                                        <span>Weekly ₦ 150,000</span>
                                    </p>
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