import { useParams } from "react-router-dom";

import { Body, Header, Categories, Footer, Breadcrumb, ProductsSlide } from "../../components"
import { CartIcon, HeartIcon,  } from "../../components/icons"
import { useGetProductQuery } from "../../redux/api/Product";
import { LoadingButton } from "@mui/lab";
import { Rating } from "@mui/material"
import { useAddToCartMutation } from "../../redux/api/Cart";
import { handleSaveItemClick } from "../../services";
import { handleAddToCartClick } from "../Cart/service";
import { useSavedItemMutation } from "../../redux/api/SavedItems";
import ProductVendor from "./productVendor";
import ProductDetails from "./productDetails";
import { formatNumber } from "../../utils";
import { Helmet } from 'react-helmet-async';
import { useCookies } from "react-cookie";
import { FLEXIPAY_COOKIE, FLEXIPAY_REDIRECT, FLEXIPAY_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import ProductSlide from "./productSlide";
import { useGetReviewsQuery } from "../../redux/api/Reviews";

export function Product(){
    let { slug } = useParams()

    let { product, loading } = useGetProductQuery(`${slug}`, {
        refetchOnReconnect: true,
        selectFromResult: ({data, isLoading}) => ({
            product: data && data?.result.data,
            loading: isLoading
        })
    })

    let { reviews } = useGetReviewsQuery({slug: product?.slug || "", page: "1"}, {
        selectFromResult: ({ data, isLoading}) => ({
            reviews: data?.result.data.data,
            pagination: data?.result.data,
            isLoading
        })
    })

    const average_rating = reviews?.reduce((total, review) => {
        return total + (typeof review.rate === 'string' ? parseFloat(`${review.rate}`) : review.rate)
    }, 0) || 0

    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);
    const dispatch = useDispatch()

    let [addToCart, {data, isLoading, error}] = useAddToCartMutation()
    let [savedItem, { isLoading: savingItem,}] = useSavedItemMutation()

    console.log(product)

    return(
        <>
            <Helmet prioritizeSeoTags>
                <title className="capitalize">{product?.name + "| FlexiPay"}</title>
                <meta property="og:image" content={product?.product_images[0].image_link} />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Flexipay Nigeria" />
                <meta property="og:description" content={product?.description} />
                <meta property="og:title" content={product?.name} />
                <meta property="fb:add_id" content="769500967651765" />
                {/* <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="640" /> */}
                <meta property="og:url" content={FLEXIPAY_REDIRECT + "/product/" + product?.slug} />
            </Helmet>
            <Body bgColor="bg-white sm:bg-grey-500">
                <div className="w-full h-fit bg-white sm:bg-grey-500">
                    <Breadcrumb />
                    <div className="fp-screen space-y-5 bg-white sm:bg-grey-500">
                        <div className="bg-white sm:p-7 sm:space-y-10">
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8">
                                <div className="w-full sm:w-5/12">
                                    <ProductSlide images={product ? product.product_images.map(image => image.image_link) : []}/>
                                </div>
                                <div className="relative w-full sm:w-6/12 flex flex-col space-y-2 px-2 sm:px-0">
                                    <div>
                                        <h1 className="text-grey-1200 text-xl sm:text-4xl font-medium capitalize truncate">{product?.name}</h1>
                                        <p className="font-semibold text-sm text-grey-200 my-[6px]">{product?.product_code}</p>
                                        <div className="flex space-x-3">
                                            <Rating readOnly
                                                value={parseInt((average_rating / (reviews?.length || 1)).toString())}
                                                size="small"
                                                emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star" />}
                                                icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star" />}
                                            />
                                            <p className="font-medium text-[10px] sm:text-sm text-grey-200">{
                                                !reviews || reviews?.length === 0  ? 
                                                "No Review yet":
                                                reviews?.length.toString() + "Total Review" + (reviews?.length > 1 ? "s" : "")
                                                
                                            }</p>
                                        </div>
                                    </div>

                                    <div className="border-y border-grey-1100 py-3 sm:py-5 my-1 space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <p className="text-primary-dark-blue font-bold text-2xl">₦ {formatNumber(product?.price || 0)}</p>
                                            {
                                                product?.discounted_price ?
                                                <s className="text-[13px] font-light text-grey-200">₦ {formatNumber(product?.discounted_price || 0)}</s>:
                                                null
                                            }
                                        </div>
                                        <div className="pt-3">
                                            <span className="py-2 px-4 bg-[#FF500033] rounded-lg text-[13px] sm:text-base text-[#FF5000] font-medium">
                                                {
                                                    (!product?.installments || product.installments.length === 0) ?
                                                    <>No Installment Plans</> :
                                                    <>Pay
                                                        {
                                                            product.installments.map(installment => <>{installment.amount + " / " + installment.frequency}</>)
                                                        }
                                                    </>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full flex flex-col sm:flex-row sm:w-9/12 sm:space-x-6 space-y-3 sm:space-y-0">
                                        <LoadingButton
                                            startIcon={<HeartIcon color="#FF5000" size="18" />}
                                            variant="outlined"
                                            size="large"
                                            loading={savingItem}
                                            color="secondary"
                                            className="w-auto md:w-[900px] text-xs"
                                            onClick={() => handleSaveItemClick(product?.uuid, savedItem, dispatch)}>
                                            Saved Items
                                        </LoadingButton>
                                        <LoadingButton
                                            startIcon={<CartIcon  color="white" size="18" />}
                                            variant="contained"
                                            size="large"
                                            loading={isLoading}
                                            color="secondary"
                                            className="w-auto md:w-[900px] text-xs"
                                            onClick={() => handleAddToCartClick(product?.uuid, addToCart, dispatch, {cookies, setCookie})}>
                                            Add to Cart
                                        </LoadingButton>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between my-2 sm:my-0 px-2 sm:px-0">
                                <div>
                                    <p className="font-medium sm:font-semibold text-sm sm:text-md text-primary-dark-blue">Share this product</p>
                                    <div className="space-x-2 sm:space-x-3 flex items-center my-1 sm:my-3">
                                        <a 
                                            href={"https://twitter.com/intent/tweet?text=Checkout%20this%20product%20on%20Flexipay&url=" + FLEXIPAY_REDIRECT + "/product/" + product?.slug } 
                                            target="_blank"
                                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] border border-primary-dark-blue rounded-full grid place-items-center cursor-pointer">
                                            <i className="fa-brands fa-twitter text-primary-dark-blue text-sm sm:text-base"></i>
                                        </a>
                                        <a 
                                            href={"https://www.facebook.com/sharer/sharer.php?quote=Checkout%20this%20product%20on%20Flexipay&u=" + FLEXIPAY_REDIRECT + "/product/" + product?.slug}
                                            target="_blank"
                                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] border border-primary-dark-blue rounded-full grid place-items-center cursor-pointer">
                                            <i className="fa-brands fa-facebook-f text-primary-dark-blue text-sm sm:text-base"></i>
                                        </a>
                                        <a 
                                            href={"whatsapp://send?text=Checkout%20this%20product%20on%20Flexipay%0A" + FLEXIPAY_REDIRECT + "/product/" + product?.slug}
                                            target="_blank"
                                            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] border border-primary-dark-blue rounded-full grid place-items-center cursor-pointer">
                                            <i className="fa-brands fa-whatsapp text-primary-dark-blue text-sm sm:text-base"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1 self-start sm:self-end">
                                    <i className="fa-solid fa-circle-exclamation text-sm"></i>
                                    <p className=" text-xs sm:text-sm">Report Product</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 sm:flex-col-reverse">
                            <ProductDetails product={product}/>
                            <ProductVendor />
                        </div>
                        
                        
                        <ProductsSlide 
                            products={[]}
                            title="other products from this seller" 
                            link="/products"
                            titleCase="uppercase"
                            loading={true}
                        />
                        <ProductsSlide 
                            products={[]}
                            title="similar products" 
                            link="/products"
                            titleCase="uppercase"
                            loading={true}
                        />
                        <ProductsSlide 
                            products={[]}
                            title="recently viewed products" 
                            link="/products"
                            titleCase="uppercase"
                            loading={true}
                        />
                        {/* <ProductsSlideDummy />
                        <ProductsSlideDummy />
                        <ProductsSlideDummy /> */}
                    </div>

                    <Footer />
                </div>
            </Body>
        </>
    )
}

export default Product
