import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductsSlideDummy, ProductCategory, Empty } from "../../components"
import banner from '../../asset/banner.png'
import { useGetProductsQuery } from "../../redux/api/Product"
import BannerSlides from "./bannerSlide"

import cat1 from '../../asset/categories1.png'
import cat2 from '../../asset/categories2.png'
import cat3 from '../../asset/categories3.png'
import cat4 from '../../asset/categories4.png'
import cat5 from '../../asset/categories5.png'
import cat6 from '../../asset/categories6.png'
import cat7 from '../../asset/categories7.png'
import cat8 from '../../asset/categories8.png'
import cat9 from '../../asset/categories9.png'
import cat10 from '../../asset/categories10.png'
import { HourglassEmptyRounded } from "@mui/icons-material"
import { SubscriptionIcon } from "../../components/icons"


export function Landing(){
    let { products, loadingProduct } = useGetProductsQuery(1, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })

    const categories = [
        {id: 1, img: cat1},
        {id: 2, img: cat2},
        {id: 3, img: cat3},
        {id: 4, img: cat4},
        {id: 5, img: cat5},
        {id: 6, img: cat6},
        {id: 7, img: cat7},
        {id: 8, img: cat8},
        {id: 9, img: cat9},
        {id: 10, img: cat10},
    ]
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen bg-white sm:bg-grey-500 space-y-7 sm:space-y-3 my-3">
                    <div className="w-full h-fit sm:h-96 flex justify-between items-stretch space-x-5">
                        <div className="h-full w-full sm:w-9/12 overflow-hidden rounded-xl">
                            <LandingSlide />
                        </div>
                        <div className="hidden sm:block h-full w-3/12 overflow-hidden rounded-xl">
                            <img src={banner} className="object-cover w-full h-full"/>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl py-2 px-1 overflow-x-auto sm:overflow-hidden">
                        <CategorySlide />
                    </div>
                    {/* <ProductsBallSlide 
                        products={catTop} 
                        loading={loadingProduct}
                    /> */}

                    <ProductsSlide 
                        products={products} 
                        title="FEATURED PRODUCTS"
                        link="/products"
                        loading={loadingProduct}
                    />
                    {/* <ProductsSlideDummy /> */}

                    <BannerSlides />

                    <ProductsSlide 
                        products={products}
                        title="TOP SELLING PRODUCTS" 
                        link="/products"
                        loading={loadingProduct}
                    />

                    <ProductCategory 
                        title="SHOP FROM OUR TOP CATEGORIES"
                        products={categories}
                        loading={loadingProduct}
                    />

                    <ProductsSlide 
                        products={products}
                        title="NEW ARRIVAL" 
                        link="/products"
                        loading={loadingProduct}
                    />
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Landing