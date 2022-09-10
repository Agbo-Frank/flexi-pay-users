import { Button, MenuItem, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { 
    Body, Categories, 
    DropDown, Header, 
    ProductCard, Empty,
    ProductCardSkeleton, 
    Breadcrumb,
    SearchBar} from "../../components"
import { SearchIcon } from "../../components/icons"
import { IFilter, IPagination, IProduct } from "../../interface"
import { 
    useLazyGetProductsQuery, 
    useLazyFilterProductQuery, 
    useLazySearchProductQuery 
} from "../../redux/api/Product"
import Filters from "./filters"


export function Products(){
    let [page, setPage] = useState(1)
    let [products, setProducts] = useState<IProduct[]>([])
    let [loading, setLoading] = useState(false)
    let [pagination, setPagination] = useState<IPagination<IProduct[]>>()
    let [filters, setFilters] = useState<IFilter>({
        parent_category: "",
        sub_category: "",
        price: "",
        product_name: "",
        latest: ""
    })

    let [searchParams] = useSearchParams()
    let navigate = useNavigate()

    let [searchProduct, { isLoading }] = useLazySearchProductQuery()
    let [filterProduct] = useLazyFilterProductQuery()
    let [getProducts] = useLazyGetProductsQuery()

    useEffect(() => {
        setLoading(true)
        if(searchParams.has('search')){
            searchProduct({search_params: searchParams.has('search') ? `${searchParams.get('search')}` : ""})
                .unwrap()
                .then(result => {
                    setProducts(result.result.data.data)

                    setPagination(result.result.data)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
        else {
            
            getProducts(page)
                .unwrap()
                .then(result => {
                    setProducts(result.result.data)
                    setPagination(result.result)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [page, searchParams])

    useEffect(() => {
        // if(searchParams.has('filters')){
            filterProduct(filters)
                .unwrap()
                .then(result => {
                    console.log(result)
                    setProducts(result.result.data.data)
                    setPagination(result.result.data)
                    setLoading(false)
                })
                .catch(err => console.log(err))

        // }
    }, [filters])

    return(
        <Body bgColor="bg-grey-500">
            <div className="w-full h-fit bg-grey-500">
                <Header />
                <Categories />
                <Breadcrumb />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen flex flex-col sm:flex-row sm:space-x-6 bg-grey-500 justify- items-stretch">
                    <Filters 
                        filters={filters} 
                        setFilters={setFilters} />
                    <div className="w-full sm:w-9/12">
                        <div className="rounded-lg bg-white">
                            <div className="flex justify-between items-center py-3 px-6 border-b border-grey-100">
                                <p>{
                                    loading ?
                                    <Skeleton width={150} sx={{fontSize: 16}}/>: 
                                    `${pagination?.total} Results Found`
                                }</p>
                                {/* <div className="flex items-center space-x-4">
                                    <p>Sort By:</p>
                                    <div className="w-52">
                                        <DropDown component={<span>Payment Type</span>} arrow>
                                            <MenuItem>Profile</MenuItem>
                                            <MenuItem>My account</MenuItem>
                                            <MenuItem>Logout</MenuItem>
                                        </DropDown>
                                    </div>
                                </div> */}
                            </div>
                            <div className={`${products!.length > 0 && 'grid grid-cols-2 md:grid-cols-4'} gap-2 px-3 sm:px-6 py-1`}>
                                {
                                    !loading ?
                                    [1, 2, 3, 4, 5].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products.length === 0 ? 
                                    <div className="grid place-items-center w-full">
                                        <Empty 
                                            title="No Search Results"
                                            Icon={SearchIcon}
                                            message="There are no results for your search yet. Kindly search for another key word(s) or you can return to your shopping."
                                            button={
                                                <Button
                                                    startIcon={<i className="fa-solid fa-bag-shopping"></i>}
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => navigate('/')}
                                                >
                                                    Go to Shopping
                                                </Button>
                                            }/>
                                    </div>
                                    :
                                    products?.map((product, idx) => <ProductCard product={product} key={idx}/>)
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