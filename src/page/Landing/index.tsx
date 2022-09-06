import { CategorySlide, Body, Categories, Header, LandingSlide, ProductsSlide, Footer, SearchBar, ProductsSlideDummy } from "../../components"
import banner from '../../asset/banner.png'
import banner1 from '../../asset/banner1.png'
import banner2 from '../../asset/banner2.png'
import banner3 from '../../asset/banner3.png'
import { useGetProductsQuery } from "../../redux/slice/Product"


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
                <div className="block sm:hidden w-11/12 mx-auto">
                    <SearchBar />
                </div>
                <Categories />
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

                    {/* <ProductsSlide products={products} loading={loadingProduct}/> */}
                    <ProductsSlideDummy />

                    <div className="grid grid-cols-3 h-80 w-fit bg-white rounded-xl p-4 gap-3">
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <img src={banner3} alt="banner1" className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <img src={banner2} alt="banner2" className="object-cover w-full h-full"/>
                        </div>
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <img src={banner1} alt="banner3" className="object-cover w-full h-full"/>
                        </div>
                    </div>

                    <ProductsSlide products={products} loading={loadingProduct}/>
                </div>

                <Footer />
            </div>
        </Body>
    )
}

export default Landing