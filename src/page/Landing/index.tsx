import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductsSlideDummy, ProductsBallSlide, ProductCategory } from "../../components"
import banner from '../../asset/banner.png'
import { useGetProductsQuery } from "../../redux/api/Product"
import BannerSlides from "./bannerSlide"
import topCat1 from '../../asset/category/cat1.png'
import topCat2 from '../../asset/category/cat2.png'
import topCat3 from '../../asset/category/cat3.png'
import topCat4 from '../../asset/category/cat4.png'
import topCat5 from '../../asset/category/cat5.png'
import topCat6 from '../../asset/category/cat6.png'

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

import est1 from '../../asset/estate/house1.png'
import est2 from '../../asset/estate/house2.png'
import est3 from '../../asset/estate/house3.png'


export function Landing(){
    let { products, loadingProduct } = useGetProductsQuery(1, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })
    console.log(products)
    const catTop = [
        {id: 1, img: topCat1},
        {id: 2, img: topCat2},
        {id: 3, img: topCat3},
        {id: 4, img: topCat4},
        {id: 5, img: topCat5},
        {id: 6, img: topCat6},
    ]

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
        {id: 11, img: cat6},
        {id: 12, img: cat2},
    ]

    const estates = [
        {id: 1, img: est1},
        {id: 2, img: est2},
        {id: 3, img: est3},
    ]
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen bg-white sm:bg-grey-500 space-y-3 my-3">
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

                    <ProductCategory 
                        title="REAL ESTATE DEALS"
                        link="/"
                        products={estates}
                        grid={{sm: 12, md: 4, lg: 4}}
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