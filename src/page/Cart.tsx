import Empty from "../components/Empty"
import CartIcon from "../components/icons/CartIcon"
import TrashIcon from "../components/icons/TrashIcon"

import TV from '../asset/monitor.png'
import MinusIcon from "../components/icons/MinusIcon"
import PlusIcon from "../components/icons/PlusIcon"
import Button from "../components/Button"
import BagIcon from "../components/icons/Bag"
import DashboardWrapper from "../components/DashboardWrapper"


function CartSummary(){
    return(
        <div className="w-full flex justify-between mb-5">
            <div className="flex justify-between w-8/12 gap-3">
                <div className="w-3/4">
                    <img src={TV} className="w-full h-auto object-contain rounded-lg" />
                </div>
                <p className="text-sm text-grey-200">Anti Blue Computer And Phone Glasses.</p>
            </div>

            <div>
                <p className="font-medium text-primary-dark-blue ml-auto">6,650</p>
                <small className="text-xs block ml-auto text-grey-700">x2</small>
            </div>
        </div>
    )
}

function Cart(){
    return(
        <div 
        className="flex justify-between shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 px-4 py-3 mx-6 mb-7 rounded-3xl">
            <div>
                <div className="flex gap-3 items-center">
                    <img src={TV} className="w-36 h-36 rounded-xl object-contain"/>
                    <div className="w-7/12">
                        <p className="text-grey-200">Anti Blue Computer And Phone Glasses</p>
                        <small className="text-grey-200">Qty: 1</small>
                    </div>
                </div>
                <p className="flex gap-2 items-center text-grey-700">
                    <TrashIcon color="#A0A0A1" size="14"/>
                    <p className="text-sm">Remove From Cart</p>
                </p>
            </div>
            <div className="self-end">
                <p className="font-semibold text-primary-dark-blue text-lg mb-4">3,300</p>
                <div className="flex justify-between items-center gap-3">
                    <div className="rounded-full font-bold text-white bg-primary-orange-200 w-5 h-5 flex justify-center items-center text-xl">
                        <MinusIcon color="white" size="14" />
                    </div>
                    <div className="font-semibold text-lg"> 1 </div>
                    <div className="rounded-full font-bold text-white bg-primary-orange-200 w-5 h-5 flex justify-center items-center text-xl">
                        <PlusIcon size="14" color="white" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Carts (){
    return(
        <DashboardWrapper>
            <div className="flex justify-between gap-5 w-full">
                <div className="bg-white min-h-400 rounded-4xl py-6 border w-7/12">
                    <div className="flex justify-between w-10/12 mx-6">
                        <h3 className="text-lg text-primary-dark-blue font-semibold">Carts(0)</h3>

                        <div className="flex justify-between gap-2 items-center">
                            <TrashIcon color="#FF5000" size="16" />
                            <p className="text-primary-orange-200">Empty Cart</p>
                        </div>
                    </div>

                    <div className="w-full mt-8 mb-2 overflow-y-auto h-screen scrollbar">
                        <Cart />
                        <Cart />
                        <Cart />
                        <Cart />
                    </div>
                    {/* <Empty name="cart" Icon={CartIcon}/> */}
                </div>


                <div className="bg-white min-h-400 rounded-4xl py-6 px-6 border w-5/12 self-start">
                    <h2 className="text-lg text-primary-dark-blue font-semibold">Order Summary</h2>

                    <div className="my-4 border-b border-solid border-grey-100">
                        <CartSummary />
                        <CartSummary />
                        <CartSummary />
                    </div>

                    <div className="w-full">
                        <p className="flex justify-between">
                            <p className="text-grey-200">Sub Total:</p>
                            <p className="text-primary-dark-blue text-lg font-semibold">9,900</p>
                        </p>

                        <div className="flex justify-center my-3">
                            <Button color="#FF5000">
                                <div className="flex gap-2 mx-3">
                                    <BagIcon  size="20" color="white"/>
                                    <p>CheckOut Now</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Carts