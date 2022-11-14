import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductCategory, Empty } from "../../components"
import banner from '../../asset/banner.png'
import { useGetProductsQuery, useGetSubCategoriesQuery, useGetCategoryProductsQuery } from "../../redux/api/Product"
import BannerSlides from "./bannerSlide"
import { LazyLoadImage } from "react-lazy-load-image-component"

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
import { useState } from "react"


export function Landing(){
    const [category_ids] = useState({
        smart_phones: "f7b1cad2-7255-4bad-aba9-f4a9b5e02d65",
        tv: "af4389b5-a06a-4751-94c2-961877673fc0",
        home_applience: "134d8432-6939-4812-b37b-93e6bf31f7a1", //"b15de1d2-83e8-447b-8717-bf748fd3225e",
        laptops: "974a816f-8635-4d11-9073-627a01ade564"
    })

    let { products, loadingProduct } = useGetProductsQuery(1, {
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loadingProduct: isLoading
        }) 
    })

    // Phone and Tablet
    let {smart_phones, smart_phones_loading} = useGetCategoryProductsQuery({page: 1, id: category_ids.smart_phones}, {
        selectFromResult: ({ data, isLoading }) => ({
            smart_phones: data?.result.data,
            smart_phones_loading: isLoading,
        })
    })

    // TVs
    let {tvs, tvs_loading} = useGetCategoryProductsQuery({page: 1, id: category_ids.tv}, {
        selectFromResult: ({ data, isLoading }) => ({
            tvs: data?.result.data,
            tvs_loading: isLoading,
        })
    })

    // HOME APPLIENCES
    let {home_appliences, home_appliences_loading} = useGetCategoryProductsQuery({page: 1, id: category_ids.home_applience}, {
        selectFromResult: ({ data, isLoading }) => ({
            home_appliences: data?.result.data,
            home_appliences_loading: isLoading,
        })
    })

    // LAPTOPS
    let {laptops, laptops_loading} = useGetCategoryProductsQuery({page: 1, id: category_ids.laptops}, {
        selectFromResult: ({ data, isLoading }) => ({
            laptops: data?.result.data,
            laptops_loading: isLoading,
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
        {id: 10, img: cat10, link: "/category/", name: "Real Estate"},
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
                            <LazyLoadImage src={banner} className="object-cover w-full h-full"/>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl py-2 px-1 overflow-x-auto sm:overflow-hidden">
                        <CategorySlide categories={categories}/>
                    </div>
                    {/* <ProductsBallSlide 
                        products={catTop} 
                        loading={loadingProduct}
                    /> */}

                    <ProductsSlide 
                        products={smart_phones} 
                        title="PHONES"
                        link={"/category/" + category_ids.smart_phones}
                        loading={smart_phones_loading}
                    />

                    <ProductsSlide 
                        products={tvs} 
                        title="TVs"
                        link={"/category/" + category_ids.tv}
                        loading={tvs_loading}
                    />

                    <ProductsSlide 
                        products={laptops} 
                        title="LAPTOPS"
                        link={"/category/" + category_ids.laptops}
                        loading={laptops_loading}
                    />

                    <ProductCategory 
                        title="SHOP FROM OUR TOP CATEGORIES"
                        products={categories}
                        loading={false}
                    />

                    <ProductsSlide 
                        products={home_appliences} 
                        title="HOME APPLIANCES"
                        link={"/category/" + category_ids.home_applience}
                        loading={home_appliences_loading}
                    />

                    
                    <ProductsSlide 
                        products={products}
                        title="NEW ARRIVAL" 
                        link="/products"
                        loading={loadingProduct}
                    />
                    {/* <ProductsSlideDummy /> */}

                    {/* <BannerSlides /> */}
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Landing