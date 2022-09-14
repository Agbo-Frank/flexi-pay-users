import { useState } from "react"
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import { Body, Header, Categories, Toast, ProductSlide, Rating, Button, ProductsSlide, Footer,  } from "../../components"
import { BusIcon, CartIcon, ExclamationIcon, HeartIcon, QuestionIcon, ReturnIcon, StarIcon, WalletIcon, WarrantyIcon } from "../../components/icons"
import StoreIcon from "../../components/icons/StoreIcon";
import { IProduct } from "../../interface";
import { useGetProductQuery } from "../../redux/api/Product";
import ProductReview from "./ProductReview";
import ProductVendor from "./productVendor";


function ProductDetails({ product }: {product: IProduct | undefined}){
    let tabNames = ['product details', 'delivery', 'shipping', 'return policy', 'specifications', 'reviews', 'warranty']
    let [index, setIndex] = useState('product details')
    return(
        <div className="overflow-hidden rounded-2xl">
            <div className={`flex whitespace-nowrap overflow-x-auto scrollbar-hidden bg-[#E8E5FF]  sm:bg-primary-orange-300`}>
                {
                    tabNames.map((tab, i) => (
                        <p 
                        className={`capitalize p-4 text-sm ${index === tab && 'bg-white text-[#1900FE] sm:text-primary-orange-200'} hover:bg-white sm:hover:text-primary-orange-200 hover:text-[#1900FE] cursor-pointer font-semibold`}
                        onClick={() => setIndex(tab)}>{tab}</p>
                    ))
                }
            </div>
            <div className="bg-white px-2 sm:p-4">
                <div className="relative rounded-md overflow-x-hidden">
                    <div className="w-full">
                        {
                            index === 'product details' &&
                            (
                                <p className="text-grey-1200 sm:w-9/12 leading-7 text-sm sm:text-base">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget sem feugiat lobortis arcu aliquam sit feugiat. Eros, arcu, tempus velit, 
                                    id id ut enim amet. Bibendum at quam at malesuada. Posuere eget tempor urna dapibus ultrices ipsum feugiat pellentesque. Facilisis urna morbi 
                                    mauris vel sit pharetra, quam commodo urna. 
                                    Ac quam nulla volutpat risus elit et consectetur aliquam nunc. Sem potenti varius morbi integer sit. Sit sollicitudin arcu suspendisse 
                                    quam amet, enim nec lacus. Massa amet, massa consectetur maecenas a, volutpat.
                                </p>
                            )
                        }
                    </div>
                    {
                        index === 'delivery' &&
                        (
                            <div className="w-full py-5">
                                <div className="flex items-center space-x-2">
                                    <BusIcon color="#474747" size="50"/>
                                    <div>
                                        <p>Delivery</p>
                                        <p className="text-sm font-light">Estimated Delivery Time is: <span className="text-primary-orange-200">1 - 7 Working Days</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        index === 'return policy' &&
                        (
                            <div className="w-full py-5">
                                <div className="flex items-center space-x-2">
                                    <ReturnIcon color="#474747" size="50"/>
                                    <div>
                                        <p>Returen Policy</p>
                                        <p className="text-sm font-light">This Product is Eligeble for Returns or Exchanges within: <span className="text-primary-orange-200">1 - 7 Working Days</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        index === 'warranty' &&
                        (
                            <div className="w-full py-5">
                                <div className="flex items-center space-x-2">
                                    <WarrantyIcon color="#474747" size="50"/>
                                    <div>
                                        <p>Warranty</p>
                                        <p className="text-sm font-light">This Product Warranty is: <span className="text-primary-orange-200">12 Months</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        index === 'reviews' &&
                        (
                            <ProductReview slug={`${product?.slug}`}/>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductDetails