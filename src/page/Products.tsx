import { Body, Categories, DropDown, Header, ProductCard } from "../components"


export function Products(){
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
                <div className="fp-screen flex space-x-6 bg-grey-500 justify-between">
                    <div className="w-3/12 h-full border border-black rounded-3xl"></div>
                    <div className="w-9/12 rounded-3xl bg-white">
                        <div className="flex justify-between items-center py-3 px-6 border-b border-grey-100">
                            <p>231 Results Found</p>
                            <div className="flex items-center space-x-4">
                                <p>Sort By:</p>
                                <div className="w-52">
                                    <DropDown />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 px-6 py-1">
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default Products