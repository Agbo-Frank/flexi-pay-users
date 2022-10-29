import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductCategory, Empty } from "../../components"
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


export function Landing(){
    let { products, loadingProduct } = useGetProductsQuery(1, {
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })
    let { products: products_2, loadingProduct: loadingProduct_2 } = useGetProductsQuery(2, {
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })
    let { products: products_3, loadingProduct: loadingProduct_3 } = useGetProductsQuery(3, {
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })

    const categories = [
        {id: 1, img: cat1, link: "/category/54513300-e938-4f21-8bd8-f5d1b0833001", name: "Computing"},
        {id: 2, img: cat2, link: "/category/5e9c5f59-72a6-44d6-97dc-02f03daffa36", name: "Phone and Tablet"},
        {id: 3, img: cat3, link: "/category/29ac2cd2-9f4c-41c3-8ad3-846cf0fe0d3b", name: "Electronics"},
        {id: 4, img: cat4, link: "/category/0050bb9b-be5e-4bf2-987c-72511482edc8", name: "Generators"},
        {id: 5, img: cat5, link: "/category/8c4ff4c5-a8c8-40cc-855b-812b268c3735", name: "Fashion"},
        {id: 6, img: cat6, link: "/category/", name: "Food Items"},
        {id: 7, img: cat7, link: "/category/", name: "health & beauty"},
        {id: 8, img: cat8, link: "/category/5e9c5f59-72a6-44d6-97dc-02f03daffa36", name: "Mobile accessories"},
        {id: 9, img: cat9, link: "/category/134d8432-6939-4812-b37b-93e6bf31f7a1", name: "Home Appliances"},
        // {id: 10, img: cat10, link: "/category/"},
    ]
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
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
                        products={products_2}
                        title="TOP SELLING PRODUCTS" 
                        link="/products"
                        loading={loadingProduct_2}
                    />

                    <ProductCategory 
                        title="SHOP FROM OUR TOP CATEGORIES"
                        products={categories}
                        loading={false}
                    />

                    <ProductsSlide 
                        products={products_3}
                        title="NEW ARRIVAL" 
                        link="/products"
                        loading={loadingProduct_3}
                    />
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Landing