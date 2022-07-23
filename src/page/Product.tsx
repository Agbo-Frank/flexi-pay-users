import { useState } from "react"
import Slider from "react-slick";

import { Body, Header, Categories, Toast, ProductSlide, Rating, Button, ProductsSlide, Footer,  } from "../components"
import { BusIcon, CartIcon, ExclamationIcon, HeartIcon, QuestionIcon, ReturnIcon, StarIcon, WalletIcon, WarrantyIcon } from "../components/icons"
import StoreIcon from "../components/icons/StoreIcon";

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

function ProductVendor(){
    return(
        <div className=" gap-3 flex justify-between items-stretch">
            <div className="w-9/12 rounded-2xl bg-white">
                <p className="p-4 border-b border-grey-900 font-medium text-md">Seller Information</p>
                <ul className="text-grey-1200 space-y-4 p-4">
                    <li className="flex space-x-3 items-center">
                        <div className="flex space-x-2 items-center">
                            <StoreIcon color="#222222" size="15"/>
                            <p>Store Name:</p>
                        </div>
                        <p>Duchess Store</p>
                    </li>
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Verified Customer’s Reivews</p>
                        <p>291</p>
                    </li>
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Seller Score</p>
                        <p>94%</p>
                    </li>
                    <li className="flex text-sm space-x-3 items-center">
                        <p>Number of Followers</p>
                        <p>150</p>
                    </li>
                </ul>
                <div className="flex items-center space-x-3 w-6/12 p-4">
                    <Button color="#FF5000">
                        <p>Follow</p>
                    </Button>

                    <Button color="#FF5000" outline>
                        <p>Vendor Info</p>
                    </Button>
                </div>
            </div>
            <div className="w-3/12 rounded-2xl bg-white p-4">
                <div className="rounded-2xl bg-primary-orange-300 w-full py-10 grid place-items-center">
                    <div className="w-48 space-y-3">
                        <p className="text-center font-medium">Do you have products to sell?</p>
                        <Button outline color="#FF5000">Become a Vendor</Button>
                    </div>
                </div>

                <div className="rounded-2xl bg-primary-dark-blue text-white p-4 w-full flex space-x-3">
                    <QuestionIcon color="white" size="30"/>
                    <div className="w-48 space-y-3">
                        <p className="font-medium">Do You Have any Questions?</p>
                        <p className="text-sm font-thin">Feel free to reach us</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function Product(){
    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit bg-grey-500">
                <Header />
                <Categories />
                <div className="fp-screen flex justify-between items-center bg-grey-500">
                    <ul className="flex my-3 text-sm">
                        <li className="text-grey-700">Home /</li> 
                        <li> Overview</li>
                    </ul>

                    {/* <Toast /> */}
                </div>
                <div className="fp-screen space-y-5 bg-grey-500">
                    <div className="bg-white p-7 rounded-2xl space-y-10">
                        <div className="flex space-x-8">
                            <div className="w-5/12">
                                <ProductSlide />
                            </div>
                            <div className="w-6/12 flex flex-col space-y-6">
                                <div>
                                    <h1 className="text-grey-1200 text-3xl">Anti Blue Computer & Phone Glasses....</h1>

                                    <div className="flex space-x-2">
                                        <Rating />
                                        <p className="font-light text-sm text-grey-200">219 Total Reviews</p>
                                    </div>
                                </div>

                                <div className="border-y border-grey-1100 py-5 my-3 space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <p className="text-primary-dark-blue font-semibold text-2xl">₦ 4,600</p>
                                        <s className="text-sm font-light text-grey-200">₦ 10,600</s>
                                    </div>
                                    <p className="text-grey-1200">Pay ₦ 100 / daily, ₦ 300/week or ₦ 500/month</p>
                                </div>
                                
                                <div className="flex justify-between w-9/12 space-x-6">
                                    <Button outline color="#FF5000">
                                        <div className="flex items-center space-x-2">
                                            <HeartIcon color="#FF5000" size="18" />
                                            <p>Save item</p>
                                        </div>
                                    </Button>
                                    <Button color="#FF5000">
                                        <div className="flex items-center space-x-2">
                                            <CartIcon  color="white" size="18" />
                                            <p>Add to Cart</p>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-semibold text-md text-primary-dark-blue">Share this product</p>
                                <div className="space-x-5 flex items-center my-3">
                                    <i className="text-primary-dark-blue text-2xl fa-brands fa-facebook"></i>
                                    <i className="text-primary-dark-blue text-2xl fa-brands fa-instagram-square"></i>
                                    <div className="bg-primary-dark-blue rounded-full w-7 h-7 inline-grid place-items-center">
                                        <i className="text-white text-md fa-brands fa-twitter"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 self-end">
                                <ExclamationIcon color="#000541" size="15"/>
                                <p className="text-sm">Report Product</p>
                            </div>
                        </div>
                    </div>
                    <ProductVendor />
                    <ProductDetails />
                    <ProductsSlide />
                    <ProductsSlide />
                    <ProductsSlide />
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Product
