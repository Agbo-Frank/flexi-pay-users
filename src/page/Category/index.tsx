import { Button, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, useParams, useLocation } from "react-router-dom"
import { 
    Body,
    ProductCard, Empty,
    ProductCardSkeleton, 
    Breadcrumb,
    SearchBar
} from "../../components"
import { SearchIcon } from "../../components/icons"
import { IFilter, IProduct, } from "../../interface"
import { 
    useLazyGetCategoryProductsQuery,
    useLazyGetSubCategoriesQuery
} from "../../redux/api/Product"
import { serializeFormQuery } from "../../utils"
import Filters from "../Products/filters"


export function CategoryPage(){
    let [searchParams, setSearchParams] = useSearchParams()
    let [page, setPage] = useState(searchParams.has("page") ? parseInt(`${searchParams.get('page')}`) : 1)
    let { id } = useParams()

    const location = useLocation()

    let [getProducts, {products, loading, pagination}] = useLazyGetCategoryProductsQuery({
        selectFromResult: ({ data, isLoading }) => ({
            pagination: data?.result,
            products: data?.result.data,
            loading: isLoading,
        })
    })

    let [getCategory, {category, loading_category, sub_categories}] = useLazyGetSubCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            category: data?.result,
            loading_category: isLoading,
            sub_categories: data?.result.sub_categories
        })
    })

    function changePage(page: number) {
        setSearchParams({...serializeFormQuery(searchParams), page})
        setPage(page)
    }


    
    let [filters, setFilters] = useState<IFilter>({
        parent_category: searchParams.get('parent_category') || "",
        sub_category:  "",
        price: "",
        product_name: searchParams.get('search') || "",
        latest: searchParams.get('latest')  || 'false',
        page
    })

    let navigate = useNavigate()

    useEffect(() => {
        getProducts({page, id: `${id}`})
        getCategory({page, id: `${id}`})
        console.log(id)
    }, [page, searchParams, filters, id, location.pathname])

    products = products?.filter((product: IProduct) => product.product_images.length > 0)

    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Breadcrumb title={category?.name}/>
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen flex flex-col sm:flex-row sm:space-x-6 bg-white sm:bg-grey-500 justify- items-stretch">
                    <Filters 
                        sub_categories={sub_categories}
                        searchParams={searchParams} 
                        setSearchParams={setSearchParams}
                    />
                    <div className="w-full sm:w-9/12">
                        <div className="rounded-lg bg-white">
                            <div className="flex justify-between items-center py-3 px-2 sm:px-6 border-b border-grey-100">
                                {category ? <p>Result for {category?.name}</p> : <Skeleton width={150} sx={{fontSize: 16}}/>}
                                <p>{
                                    loading ?
                                    <Skeleton width={150} sx={{fontSize: 16}}/>: 
                                    `${(products && products?.length) || 0} Results Found`
                                }</p>
                            </div>
                            <div className={`${(products && products?.length > 0) || loading ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : ""} grid gap-2 px-2 sm:px-6 py-1`}>
                                {
                                    loading ?
                                    [1, 2, 3, 4].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products && products?.length > 0 ? 
                                    products?.map((product, idx) => <ProductCard product={product} key={idx}/>) :
                                    <div className="grid place-items-center w-full">
                                        <Empty 
                                            title="No Category Result"
                                            Icon={SearchIcon}
                                            message="There are no results for the selected category yet. Kindly select another category or you can return to the shopping page."
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
                                page={page}
                                showLastButton
                                showFirstButton
                                onChange={(e, page) => changePage(page)}/>
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default CategoryPage