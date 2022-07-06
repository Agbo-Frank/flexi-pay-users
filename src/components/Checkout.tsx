import TV from '../asset/monitor.png'
import Button from './Button'
import BagIcon from './icons/Bag'


function CheckoutCard(){
    return(
        <div className="w-full flex justify-between mb-5">
            <div className="flex justify-between w-9/12 gap-3">
                <div className="w-3/4">
                    <img src={TV} className="w-full h-auto object-contain rounded-lg" />
                </div>
                <p className="text-xs text-grey-200">Anti Blue Computer And Phone Glasses.</p>
            </div>

            <div className='flex flex-col'>
                <p className="font-medium text-primary-dark-blue ml-auto">₦ 6,650</p>
                <small className="text-xs block ml-auto text-grey-700">x2</small>
            </div>
        </div>
    )
}


function CheckoutSummary (){
    return(
        <div className="sticky top-5 bg-white min-h-400 rounded-4xl py-6 px-6 border w-full self-start">
            <h2 className="text-lg text-primary-dark-blue font-semibold">Order Summary</h2>

            <div className="my-4 border-b border-solid border-grey-100">
                <CheckoutCard />
                <CheckoutCard />
                <CheckoutCard />
            </div>

            <div className="w-full">
                <p className="flex justify-between">
                    <p className="text-grey-200">Sub Total:</p>
                    <p className="text-primary-dark-blue font-semibold">₦ 9,900</p>
                </p>

                <div className="flex justify-center my-5 w-full mx-auto">
                    <Button color="#FF5000">
                        <div className="flex gap-2 items-center mx-3">
                            <BagIcon  size="20" color="white"/>
                            <p>CheckOut Now</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSummary