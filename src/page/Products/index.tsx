import { MenuItem, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Body, Categories, DropDown, Header, ProductCard, ProductCardSkeleton } from "../../components"
import { IFilter } from "../../interface"
import { useLazyGetProductsQuery, useLazyFilterProductQuery } from "../../redux/slice/Product"
import Filters from "./filters"


export function Products(){
    let [page, setPage] = useState(1)

    let [searchParams, setSearchParams] = useSearchParams()

    let [getProducts, { products, loading, pagination }] = useLazyGetProductsQuery({
        selectFromResult: ({ data, isLoading }) => ({
            products: data?.result.data,
            loading: isLoading,
            pagination: data?.result
        }),
        refetchOnFocus: true,
        refetchOnReconnect: true
    })

    let [filter, { filteredProducts, loadingFilters }]= useLazyFilterProductQuery({
        selectFromResult: ({data, isLoading}) => ({
            filteredProducts: data?.result.data,
            loadingFilters: isLoading,
            filterPagination: data?.result
        })
    })

    let [data, setData] = useState({
        products: loading ? [] : products,
        loading: loadingFilters || loading,
        pagination: pagination
    })

    useEffect(() => {
        if(searchParams.values.length > 0){
            filter(searchParams)
                .unwrap()
                .then(data => {
                    setData(state => ({
                        ...state,
                        products: data.result.data,
                        pagination: data.result
                    }))
                })
                .catch(err => console.log(err))
        }
        else{
            getProducts(page)
                .unwrap()
                .then(data => {
                    setData(state => ({
                        ...state,
                        products: data.result.data,
                        pagination: data.result
                    }))
                })
                .catch(err => console.log(err))
        }
    }, [searchParams, page])

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
                <div className="fp-screen flex space-x-6 bg-grey-500 justify- items-stretch">
                    <Filters 
                        setSearchParams={setSearchParams} 
                        searchParams={searchParams}/>
                    <div className="w-9/12">
                        <div className="rounded-lg bg-white">
                            <div className="flex justify-between items-center py-3 px-6 border-b border-grey-100">
                                <p>{
                                    loading ?
                                    <Skeleton width={150} sx={{fontSize: 16}}/>: 
                                    `${pagination?.total} Results Found`
                                }</p>
                                <div className="flex items-center space-x-4">
                                    <p>Sort By:</p>
                                    <div className="w-52">
                                        <DropDown component={<span>Payment Type</span>} arrow>
                                            <MenuItem>Profile</MenuItem>
                                            <MenuItem>My account</MenuItem>
                                            <MenuItem>Logout</MenuItem>
                                        </DropDown>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 px-6 py-1">
                                {
                                    data.loading ?
                                    [1, 2, 3, 4, 5].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    data.products?.map((product, idx) => <ProductCard product={product} key={idx}/>)
                                }
                            </div>
                        </div>
                        <div className="ml-auto float-right my-5">
                            <Pagination 
                                count={pagination?.total} 
                                variant="outlined" 
                                shape="rounded" 
                                color="secondary"
                                hideNextButton={pagination?.next_page_url ? true : false}
                                hidePrevButton={pagination?.prev_page_url ? true : false}
                                page={pagination?.current_page || page}
                                showLastButton
                                showFirstButton
                                onChange={(e, page) => setPage(page)}/>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default Products