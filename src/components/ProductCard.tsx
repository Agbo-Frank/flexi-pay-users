import product2 from '../asset/Product2.png'


export function ProductCard(){
    return(
        <div className="w-full bg-white rounded-lg h-fit p-2 space-y-4 hover:shadow-xl hover:-translate-y-1 hover:z-30 my-2">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
                <img src={product2} className="w-full h-full object-cover"/>
            </div>
            <div className='space-y-1'>
                <p className='truncate text-grey-1200 text-sm capitalize font-light'>Anti Blue Computer & Phone Glasses....</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ 4,600</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </div>
    )
}

export default ProductCard;