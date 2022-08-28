import { useState } from "react"
import { useParams } from "react-router-dom";
import Slider from "react-slick";

import { Body, Header, Categories, Toast, ProductSlide, Rating, Button, ProductsSlide, Footer,  } from "../../components"
import { BusIcon, CartIcon, ExclamationIcon, HeartIcon, QuestionIcon, ReturnIcon, StarIcon, WalletIcon, WarrantyIcon } from "../../components/icons"
import StoreIcon from "../../components/icons/StoreIcon";
import { useGetProductQuery } from "../../redux/slice/Product";
import ProductVendor from "./productVendor";


function ProductDetails(){
    let tabNames = ['product details', 'delivery', 'shipping', 'return policy', 'specifications', 'reviews', 'warranty']
    let [index, setIndex] = useState('product details')
    return(
        <div className="overflow-hidden rounded-2xl">
            <div className={`flex bg-primary-orange-300`}>
                {
                    tabNames.map((tab, i) => (
                        <p 
                        className={`capitalize p-4 text-sm ${index === tab && 'bg-white text-primary-orange-200'} hover:bg-white hover:text-primary-orange-200 cursor-pointer`}
                        onClick={() => setIndex(tab)}>{tab}</p>
                    ))
                }
            </div>
            <div className="bg-white p-4">
                <div className="relative rounded-md overflow-x-hidden">
                    <div className="w-full">
                        {
                            index === 'product details' &&
                            (
                                <p className="text-grey-1200 w-9/12 leading-7">
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
                            <div className="w-full py-5 space-y-3">
                                <div className="flex justify-between">
                                    <p className="font-medium text-lg">Verified Customer’s Reviews</p>
                                    <div className="flex space-x-2 items-center cursor-pointer text-primary-orange-200">
                                        <p className="capitalize text-sm">View More</p>
                                        <i className="font-bold text-xs fa-solid fa-chevron-right"></i>
                                    </div>
                                </div>

                                <div className="flex space-x-6">
                                    <div className="bg-grey-900 rounded-xl min-w-fp-300 w-2/12">
                                        <div className="p-4 border-b border-grey-100">
                                            <h1 className="font-medium text-sm">Verified Ratings (219)</h1>
                                        </div>
                                        <div className="bg-white grid place-items-center text-4xl text-primary-gold font-medium m-4 py-10 rounded-lg">4.0</div>
                                        <div className="px-4 pb-4">
                                            <div className="flex space-x-2 items-center">
                                                <p>20</p>
                                                <Rating />
                                            </div>
                                            <div className="flex space-x-2 items-center">
                                                <p>20</p>
                                                <Rating />
                                            </div>
                                            <div className="flex space-x-2 items-center">
                                                <p>20</p>
                                                <Rating />
                                            </div>
                                            <div className="flex space-x-2 items-center">
                                                <p>20</p>
                                                <Rating />
                                            </div>
                                            <div className="flex space-x-2 items-center">
                                                <p>20</p>
                                                <Rating />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="min-w-fp-300 w-3/12 space-y-4">
                                        <h1 className="font-medium text-sm">Comments From Customers</h1>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <p className="text-sm">This is perfect, just as seen</p>
                                                <Rating />
                                                <div className="text-sx flex justify-between">
                                                    <small>By Mary Iniak</small>
                                                    <small>Date: 10-07-2022</small>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm">“This is perfect, just as seen</p>
                                                <Rating />
                                                <div className="text-sx flex justify-between">
                                                    <small>By Mary Iniak</small>
                                                    <small>Date: 10-07-2022</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default ProductDetails