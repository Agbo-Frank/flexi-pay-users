import BagIcon from "../components/icons/Bag"
import HeartIcon from "../components/icons/HeartIcon"
import CartIcon from "../components/icons/CartIcon"
import TrashIcon from "../components/icons/TrashIcon"

import ItemWrapper from "../components/ItemWrapper"
import Empty from "../components/Empty"
import Button from "../components/Button"

import TV from '../asset/monitor.png'
import DashboardWrapper from "../components/DashboardWrapper"


interface IOrderDetails {
    type: 'pending' | 'delivered' | 'processing'
}

function Details({ type }: IOrderDetails){
    return(
        <>
            <p>43" inches D-LED TV +1 years Warranty - Black</p>
            <small className="text-grey-200">orderId: 345679</small>
            <p className={`${ type } text-white px-2 py-1 rounded-sm uppercase text-xs w-fit`}>{ type }</p>
            {/* <p className="font-bold text-primary-dark-blue">150, 000</p> */}
        </>
    )
}

function Order () {
    return(
        <ItemWrapper 
        img={TV} 
        lower={
            <>
                <Button color="#ff5000" >
                    <div className="flex gap-3">
                        <CartIcon color='white' size="20" />
                        <p className="text-white">Add to Cart</p>
                    </div>
                </Button>
                <Button color="#ff5000" outline>
                    <div className="flex gap-3">
                        <TrashIcon color="#ff5000" size="20"/>
                        <p className="text-primary-orange-200">Remove</p>
                    </div>
                </Button>
            </>
        }
        upper={<Details type="processing" />}
        />     
    )
}


function Orders (){
    return(
        <DashboardWrapper>
            <div className="bg-white w-full min-h-400 rounded-4xl py-5 px-4">
                <h3 className="text-primary-dark-blue text-lg font-semibold">Order (0)</h3>
                {/* <Empty name="order" Icon={BagIcon}/> */}
                <div className="w-full mt-8 mb-2 overflow-y-auto h-screen scrollbar">
                    <Order />
                    <Order />
                    <Order />
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Orders