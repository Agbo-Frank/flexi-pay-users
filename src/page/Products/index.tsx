import { Button, Checkbox, MenuItem, Pagination, Skeleton } from "@mui/material"
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
import { hasQueryString, serializeFormQuery } from "../../utils"
import Filters from "./filters"


export function Products(){
    let [page, setPage] = useState(1)
    let [products, setProducts] = useState<IProduct[]>([])
    let [loading, setLoading] = useState(false)
    let [pagination, setPagination] = useState<IPagination<IProduct[]>>()

    let [searchParams, setSearchParams] = useSearchParams()
    
    let [filters, setFilters] = useState<IFilter>({
        parent_category: searchParams.get('parent_category') || "",
        sub_category:  "",
        price: "",
        product_name: searchParams.get('search') || "",
        latest: searchParams.get('latest')  || 'false',
        page
    })

    let navigate = useNavigate()
    let [filterProduct] = useLazyFilterProductQuery()
    let [getProducts] = useLazyGetProductsQuery()

    useEffect(() => {
        setLoading(true)
        if(hasQueryString(searchParams)){
            filterProduct(filters)
                .unwrap()
                .then(result => {
                    console.log(result)
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
                })
                .catch(err => console.log(err))
        }
        setLoading(false)
    }, [page, searchParams, filters])

    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <Breadcrumb />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen flex flex-col sm:flex-row sm:space-x-6 bg-white sm:bg-grey-500 justify- items-stretch">
                    <Filters 
                        filters={filters} 
                        setFilters={setFilters}
                        searchParams={searchParams} 
                        setSearchParams={setSearchParams}
                    />
                    <div className="w-full sm:w-9/12">
                        <div className="rounded-lg bg-white">
                            <div className="flex justify-between items-center py-3 px-2 sm:px-6 border-b border-grey-100">
                                <p>{
                                    loading ?
                                    <Skeleton width={150} sx={{fontSize: 16}}/>: 
                                    `${pagination?.total || 0} Results Found`
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
                                <div className="flex items-center">
                                    <Checkbox 
                                        color="secondary"
                                        checked={
                                            searchParams.has('latest') ?
                                            searchParams.get('latest') === 'true' ? true : false :
                                            filters.latest === 'true' ? true : false
                                        }
                                        size="small"
                                        onChange={(e, checked) => setSearchParams({...serializeFormQuery(searchParams), latest: `${checked}`})}
                                    />
                                    <span>Latest</span>
                                </div>
                            </div>
                            <div className={`${products?.length > 0 || loading ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : ""} grid gap-2 px-2 sm:px-6 py-1`}>
                                {
                                    loading ?
                                    [1, 2, 3, 4].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products.length > 0 ? 
                                    products?.map((product, idx) => <ProductCard product={product} key={idx}/>) :
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
                                }
                            </div>
                        </div>
                        <div className="ml-auto float-right my-5">
                            <Pagination 
                                count={pagination?.last_page} 
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