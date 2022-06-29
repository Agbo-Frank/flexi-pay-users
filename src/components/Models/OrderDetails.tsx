import ItemWrapper from "../ItemWrapper";
import ModelWrapper from "./ModelWrapper";
import TV from '../../asset/monitor.png'
import Button from "../Button";
import BagIcon from "../icons/Bag";
import CalenderIcon from "../icons/CalenderIcon";


function OrderDetails(){

    return(
        <ModelWrapper>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky top-0 left-0 bg-white">
                    <h2 className="text-lg text-primary-dark-blue font-semibold m-4">Order Details</h2>
                    <div className="mx-4 mt-3 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="w-24">
                                <img src={TV} className="w-full h-auto object-contain "/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="w-9/12 text-grey-200 text-sm">43" inches D-LED TV +1 years Warranty - Black</p>
                                <p className="font-bold text-primary-dark-blue text-xs">150, 000</p>
                            </div>
                        </div>
                        <Button color="#FF5000">
                            <div className="flex items-center gap-2">
                                <BagIcon color="white" size="15"/>
                                <p className="text-sm">Re-Order</p>
                            </div>
                        </Button>
                    </div>
                </div>
                
                <div className="m-4 h-fit">
                    <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-2xl mb-3">
                        <div className="flex justify-start items-center gap-3">
                            <p className={`delivered text-white px-2 py-1 rounded-sm uppercase text-xs w-fit`}>delivered</p>
                            <p className="flex gap-2 items-center">
                                <CalenderIcon color='#555555' size={"14"} />
                                <p>19-06-2022</p>
                            </p>
                        </div>
                        <p>Order No: 320945</p>
                        <p>Quantity: 1</p>
                        <p>Total: 150,000</p>
                        <p>Order Placed: 14-06-2022</p>
                    </div>
                    <div className="flex justify-between gap-5 mb-4">
                        <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-2xl w-1/2 leading-7">
                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="text-grey-200 text-sm">Door Delivery</p>
                            </div>

                            <div className="leading-7">
                                <h2 className="font-semibold">Delivery Method</h2>
                                <p className="capitalize text-grey-200 text-sm mb-2">Mr. John</p>

                                <p className="capitalize text-grey-200 text-sm w-9/12">
                                    Plot 101, Redeemed Road, Eagle Island, Port Harcourt, 
                                    Rivers State, Nigeria.
                                </p>
                            </div>
                        </div>
                        <div className="text-grey-200 text-sm p-3 border border-solid border-grey-100 rounded-2xl w-1/2">
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