import { Navigate, useParams } from "react-router-dom";

import { Body, Header, Categories, Footer, Breadcrumb, ProductsSlide, CopyText } from "../../components"
import { CartIcon, HeartIcon,  } from "../../components/icons"
import { useGetProductQuery, useLazyGetOtherProductsFromVendorQuery, useLazyGetRecentlyViewedQuery, useLazyGetSimilarProductsQuery } from "../../redux/api/Product";
import { LoadingButton } from "@mui/lab";
import { Backdrop, Button, Chip, CircularProgress, Rating } from "@mui/material"
import { useAddToCartMutation } from "../../redux/api/Cart";
import { handleSaveItemClick } from "../../services";
import { handleAddToCartClick } from "../Cart/service";
import { useSavedItemMutation } from "../../redux/api/SavedItems";
import ProductVendor from "./productVendor";
import ProductDetails from "./productDetails";
import { formatNumber, sliceString } from "../../utils";
import { Helmet } from 'react-helmet-async';
import { useCookies } from "react-cookie";
import { FLEXIPAY_COOKIE, FLEXIPAY_REDIRECT, FLEXIPAY_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import ProductSlide from "./productSlide";
import { useGetReviewsQuery } from "../../redux/api/Reviews";
import { useEffect, useState } from "react";
import { IInstallment, IVariations } from "../../interface";
import { RootState } from "../../redux/store";
import { QuantityController } from "../../components/QuantityController";
import AttributeDisplay from "./attributeDisplay";

interface IVariants {
    price?: string;
    id: string | null;
    discounted_price?: string;
    quantity?: string
}

export function Product(){
    let { slug } = useParams()
    const [quantity, setQuantity] = useState(1)

    const isAuth = useSelector((state: RootState) => state.data.isAuth)

    const [variations, setVariations] = useState<IVariants>({
        price: "0",
        id: null,
        discounted_price: "",
        quantity: ""
      })
    

    let { product, loading, error: err } = useGetProductQuery(`${slug}`, {
        refetchOnReconnect: true,
        selectFromResult: ({data, isLoading, error}) => ({
            product: data && data?.result?.data,
            loading: isLoading,
            error
        })
    })

    // the get other product by vendor api 
    const [getOtherProducts, {other_product, loading_other_product} ]= useLazyGetOtherProductsFromVendorQuery({
        selectFromResult: ({ data, isLoading }) => ({
            other_product: data?.result?.data?.data,
            loading_other_product: isLoading
        })
    })

    // get similar product api
    const [getSimilarProducts, {similar_product, loading_similar_product} ]= useLazyGetSimilarProductsQuery({
        selectFromResult: ({ data, isLoading }) => ({
            similar_product: data?.result?.data?.data,
            loading_similar_product: isLoading
        })
    })

    //get recently viewed api
    const [getRecentlyViewed, {recently_viewed, loading_recently_viewed} ]= useLazyGetRecentlyViewedQuery({
        selectFromResult: ({ data, isLoading }) => ({
            recently_viewed: data?.result.data,
            loading_recently_viewed: isLoading
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

    useEffect(() => {
        if(product?.category?.uuid){
            getSimilarProducts({product_uuid: slug, category_uuid: product?.category?.uuid})
        }
    }, [loading, loading_similar_product])

    useEffect(() => {
        if(product?.vendor?.uuid){
            getOtherProducts({product_uuid: slug, vendor_uuid: product?.vendor?.uuid})
        }
    }, [loading, loading_other_product])

    useEffect(() => {
        if(product){
          setVariations(state => ({
            ...state,
            price: product?.price,
            discounted_price: product?.discounted_price,
            quantity: product?.stock 
          }))
        }
      }, [loading, slug])

    useEffect(() => {
        if(isAuth){
            getRecentlyViewed()
        }
    }, [loading, loading_recently_viewed])

    function DisplayInstallment({installment, id}: {installment: IInstallment, id: number}){
        return(
            <Chip 
                label={"₦ " + formatNumber(installment.amount) + " " + installment.frequency[0].toUpperCase() + installment.frequency.slice(1)} 
                color="secondary"
                // variant="ou"
            />
        )
    }

    function updateProperties(attribute: IVariations){
        setVariations({
            price: attribute.price,
            discounted_price: attribute.discounted_price,
            id: attribute.id,
        })
    }

    if(err){
        console.log(err)
        return <Navigate to="*" replace/>
    }
    else{
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
                    <Backdrop
                        className="text-[#fff] backdrop-blur z-50"
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className="w-full h-fit bg-white sm:bg-grey-500">
                        <Breadcrumb />
                        <div className="fp-screen space-y-5 bg-white sm:bg-grey-500">
                            <div className="bg-white sm:p-7 sm:space-y-10">
                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8">
                                    <div className="mt-10 sm:mt-0 w-full sm:w-5/12">
                                        <ProductSlide images={product ? product.product_images.map(image => image?.image_link) : []}/>
                                    </div>
                                    <div className="relative w-full sm:w-6/12 flex flex-col space-y-2 px-2 sm:px-0">
                                        <div>
                                            <h1 className="text-grey-1200 text-xl sm:text-4xl font-medium capitalize">{product?.name}</h1>
                                            {
                                                (product && product?.product_code) &&
                                                <p className="font-semibold text-sm text-grey-200 my-[6px]">
                                                    <CopyText text={product?.product_code} />
                                                </p>
                                                
                                            }
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
                                                <p className="text-primary-dark-blue font-bold text-2xl">₦ {formatNumber(variations?.price || 0)}</p>
                                                {
                                                    product?.discounted_price ?
                                                    <s className="text-[13px] font-light text-grey-200">₦ {formatNumber(variations?.discounted_price || 0)}</s>:
                                                    null
                                                }
                                            </div>
                                            <div className="pt-3">
                                                {
                                                    (!product?.installments || product.installments.length === 0) ?
                                                    <>No Installment Plans</> :
                                                    <div className="flex space-x-2 items-center">
                                                        <span>Pay</span>
                                                        <div className="flex flex-nowrap whitespace-nowrap space-x-2 overflow-x-auto scrollbar-hidden">
                                                            {
                                                                product.installments.map((installment, idx) => <DisplayInstallment installment={installment} id={idx} key={idx}/>)
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="flex justify-start items-center space-x-2">
                                            <p>Quantity</p>
                                            <QuantityController 
                                                quantity={quantity}
                                                handleMinusClick={() => setQuantity(state => state - 1)}
                                                handlePlusClick={() => setQuantity(state => state + 1)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                        
                                        {
                                            product && product?.attributes.length > 0 &&
                                            <AttributeDisplay attributes={product?.attributes} setVariations={setVariations} variations={variations}/>
                                        }
                                        
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
                                                onClick={() => handleAddToCartClick(
                                                    {product_uuid: product?.uuid, attribute_id: variations.id, quantity: quantity.toString()}, 
                                                    addToCart, 
                                                    dispatch, 
                                                    {cookies, setCookie
                                                })}>
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
                                <ProductVendor vendor={product?.vendor}/>
                            </div>
                            {
                                (loading_other_product || (other_product && other_product?.length > 0)) &&
                                <ProductsSlide 
                                    products={other_product}
                                    title="other products from this seller" 
                                    link={"/" + product?.vendor?.name_slug}
                                    titleCase="uppercase"
                                    loading={loading_other_product}
                                />
                            }

                            {
                                (loading_similar_product || (similar_product && similar_product?.length > 0)) &&
                                <ProductsSlide 
                                    products={similar_product}
                                    title="similar products" 
                                    link={"/category/" + product?.uuid}
                                    titleCase="uppercase"
                                    loading={loading_similar_product}
                                />
                            }

                            {
                                (loading_recently_viewed || (recently_viewed && recently_viewed?.length > 0)) &&
                                <ProductsSlide 
                                    products={recently_viewed?.map(recently_viewed => recently_viewed.product)}
                                    title="recently viewed product" 
                                    link={"/products"}
                                    titleCase="uppercase"
                                    loading={loading_recently_viewed}
                                />
                            }
                        </div>

                        <Footer />
                    </div>
                </Body>
            </>
        )
    }
}

export default Product
