import { useParams } from "react-router-dom";

import { Body, Header, Categories, ProductSlide, Rating, Footer,  } from "../../components"
import { CartIcon, ExclamationIcon, HeartIcon,  } from "../../components/icons"
import { useGetProductQuery } from "../../redux/slice/Product";
import { LoadingButton } from "@mui/lab";
import { useAddToCartMutation } from "../../redux/slice/Cart";

import { useCookies } from 'react-cookie';
import { FLEXIPAY_COOKIE } from "../../utils/constants";
import { HandleAddToCartClick } from "../../services";

export function Product(){
    let { slug } = useParams()
    
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);

    let { product, loading } = useGetProductQuery(`${slug}`, {
        selectFromResult: ({data, isLoading}) => ({
            product: data && data?.result.data,
            loading: isLoading
        })
    })

    let [addToCart, {data, isLoading, error}] = useAddToCartMutation()

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
                                
                                <div className="flex w-9/12 space-x-6">
                                    <LoadingButton
                                        startIcon={<HeartIcon color="#FF5000" size="18" />}
                                        variant="outlined"
                                        size="large"
                                        color="secondary">
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
                    {/* <ProductVendor />
                    <ProductDetails />
                    <ProductsSlide />
                    <ProductsSlide />
                    <ProductsSlide /> */}
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Product
