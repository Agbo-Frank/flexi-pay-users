import { useParams } from "react-router-dom";

import { Body, Header, Categories, ProductSlide, Rating, Footer, Breadcrumb, ProductsSlide, ProductsSlideDummy,  } from "../../components"
import { CartIcon, HeartIcon,  } from "../../components/icons"
import { useGetProductQuery } from "../../redux/api/Product";
import { LoadingButton } from "@mui/lab";
import { useAddToCartMutation } from "../../redux/api/Cart";
import { HandleAddToCartClick, HandleSaveItemClick } from "../../services";
import { useSavedItemMutation } from "../../redux/api/SavedItems";
import ProductVendor from "./productVendor";
import ProductDetails from "./productDetails";

export function Product(){
    let { slug } = useParams()

    let { product, loading } = useGetProductQuery(`${slug}`, {
        selectFromResult: ({data, isLoading}) => ({
            product: data && data?.result.data,
            loading: isLoading
        })
    })

    let [addToCart, {data, isLoading, error}] = useAddToCartMutation()
    let [savedItem, { isLoading: savingItem,}] = useSavedItemMutation()

    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <Breadcrumb />
                <div className="fp-screen space-y-5 bg-white sm:bg-grey-500">
                    <div className="bg-white sm:p-7 sm:space-y-10">
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8">
                            <div className="w-full sm:w-5/12">
                                <ProductSlide />
                            </div>
                            <div className="w-full sm:w-6/12 flex flex-col space-y-6 px-2 sm:px-0">
                                <div>
                                    <h1 className="text-grey-1200 text-xl sm:text-3xl">Anti Blue Computer & Phone Glasses....</h1>

                                    <div className="flex space-x-2">
                                        <Rating />
                                        <p className="font-light text-[10px] sm:text-sm text-grey-200">219 Total Reviews</p>
                                    </div>
                                </div>

                                <div className="border-y border-grey-1100 py-3 sm:py-5 my-2 space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <p className="text-primary-dark-blue font-bold text-2xl">₦ 4,600</p>
                                        <s className="text-[13px] font-light text-grey-200">₦ 10,600</s>
                                    </div>
                                    <p className="text-grey-1200 text-[13px] sm:text-base">Pay ₦ 100 / daily, ₦ 300/week or ₦ 500/month</p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:w-9/12 sm:space-x-6 space-y-3 sm:space-y-0">
                                    <LoadingButton
                                        startIcon={<HeartIcon color="#FF5000" size="18" />}
                                        variant="outlined"
                                        size="large"
                                        loading={savingItem}
                                        color="secondary"
                                        onClick={() => HandleSaveItemClick(product?.uuid, savedItem)}>
                                        Save item
                                    </LoadingButton>
                                    <LoadingButton
                                        startIcon={<CartIcon  color="white" size="18" />}
                                        variant="contained"
                                        size="large"
                                        loading={isLoading}
                                        color="secondary"
                                        onClick={() => HandleAddToCartClick(product?.uuid, addToCart)}>
                                        Add to Cart
                                    </LoadingButton>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between my-2 sm:my-0 px-2 sm:px-0">
                            <div>
                                <p className="font-medium sm:font-semibold text-sm sm:text-md text-primary-dark-blue">Share this product</p>
                                <div className="space-x-3 sm:space-x-5 flex items-center my-1 sm:my-3">
                                    <i className="text-primary-dark-blue sm:text-2xl fa-brands fa-facebook"></i>
                                    {/* <i className="text-primary-dark-blue sm:text-2xl fa-brands fa-instagram-square"></i> */}
                                    <div className="bg-primary-dark-blue rounded-full w-5 h-5 sm:w-7 sm:h-7 inline-grid place-items-center">
                                        <i className="text-white text-xs sm:text-md fa-brands fa-twitter"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 self-start sm:self-end">
                                <i className="fa-solid fa-circle-exclamation text-sm"></i>
                                <p className=" text-xs sm:text-sm">Report Product</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-col-reverse">
                        <ProductDetails />
                        <ProductVendor />
                    </div>
                    
                    <ProductsSlideDummy />
                    <ProductsSlideDummy />
                    <ProductsSlideDummy />
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Product
