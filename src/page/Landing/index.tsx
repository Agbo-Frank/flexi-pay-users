import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductsSlideDummy } from "../../components"
import banner from '../../asset/banner.png'
import { useGetProductsQuery } from "../../redux/api/Product"
import BannerSlides from "./bannerSlide"


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

                    <ProductsSlide products={products} loading={loadingProduct}/>
                    {/* <ProductsSlideDummy /> */}

                    <BannerSlides />

                    <ProductsSlide products={products} loading={loadingProduct}/>
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Landing