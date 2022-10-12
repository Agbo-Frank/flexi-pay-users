import CalenderIcon from "../../components/icons/CalenderIcon";
import { CardWrapper, CardText, CopyText } from "../../components";
import ModelWrapper from '../../components/Models/ModelWrapper';
import { formatNumber, sliceString } from '../../utils';
import moment from 'moment';
import { ISubscriptionModal } from './subscriptionItem';

function SubscriptionDetails({subscription, open, close}: ISubscriptionModal){
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            title="Subscription Details">
            <div className="h-full overflow-y-auto sm:scrollbar relative">
                <div className="sticky top-0 left-0 bg-white">
                    <CardWrapper 
                    styles="rounded"
                    // className="mx-4 mt-3 flex justify-between items-center"
                    >
                       <div className="flex w-full sm:w-full space-x-2 sm:space-x-4 items-stretch sm:pb-0">
                            <img src={subscription.installment.product?.product_images[0].image_link} alt="" className="w-[108px] h-[108px]  object-cover rounded sm:rounded-md"/>
                            <div className="flex flex-col w-full">
                                <CardText>{ sliceString(subscription.installment.product?.name) }</CardText>
                                <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(subscription.installment.product?.price)}</p>
                            </div>
                        </div>
                    </CardWrapper>
                </div>
                
                <div className="m-4 h-fit">
                    <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg mb-3">
                        <div className="flex justify-start items-center gap-3">
                            <p className={`${ subscription.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ subscription.status }</p>
                            <p className="flex gap-2 items-center">
                                <CalenderIcon color='#555555' size={"14"} />
                                <p>{moment(subscription.created_at).format('l')}</p>
                            </p>
                        </div>
                        {/* <p>Order No: <CopyText text={`${345679}`}/></p> */}
                        <p>Amount Paid: {subscription.amount_paid}</p>
                        <p>Amount Left: ₦ {formatNumber(subscription.amount_left)}</p>
                        <p>Total Amount: ₦ {formatNumber(subscription.amount_to_be_paid)}</p>
                        <p>Subscription Placed: {moment(subscription.created_at).format('l')}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between gap-5 mb-4">
                        {/* <div className="text-grey-200 text-sm p-3 border border-solid rounded-lg w-full leading-7">
                            {/* <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Door Delivery</p>
                            </div>

                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Address</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">{order.customer?.first_name + " " + order.customer?.last_name}</p>

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                    {
                                        order.order_detail[0]?.delivery_address?.house_address + ", " +
                                        order.order_detail[0]?.delivery_address?.nearest_bus_stop + ", " +
                                        order.order_detail[0]?.delivery_address?.city + ", " +
                                        order.order_detail[0]?.delivery_address?.state
                                    }
                                </p>
                            </div>
                        </div> */}
                        <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-lg w-full sm:w-1/2">
                            <div className="leading-7">
                                <h2 className="font-semibold">Payment Method</h2>
                                <p className="text-grey-200 text-sm">{ / wallet /.test(subscription.method) ? "Wallet" : "Card"}</p>
                            </div>

                            <div className="leading-7">

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                <h2 className="font-semibold">Payment Details</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">Installmental</p>
                                
                                    <p>
                                        <span className="font-medium">Plan: </span>
                                        <span>₦ {formatNumber(subscription.installment.amount)}</span>
                                    </p>

                                    <p>
                                        <span className="font-medium">Interval: </span>
                                        <span className="capitalize"> {subscription.installment.frequency} </span>
                                    </p>

                                    <p>
                                        <span className="font-medium">Total: </span>
                                        <span>Weekly ₦ {formatNumber(subscription.amount_to_be_paid)}</span>
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

export default SubscriptionDetails