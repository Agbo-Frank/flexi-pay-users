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
import { FilterModal } from "../../components/Models"
import { IFilter, IProduct, } from "../../interface"
import { 
    useLazyGetCategoryProductsQuery,
    useLazyGetSubCategoriesQuery
} from "../../redux/api/Product"
import { serializeFormQuery } from "../../utils"
import Filters from "../Products/filters"
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';


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

    let [filter_toggler, setFilterToggler] = useState({
        modal: false,
        is_row: false
    })
    
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
                                    `${(pagination && pagination.total ) || 0} Results Found`
                                }</p>
                            </div>
                            <div className={`${(products && products?.length > 0) || loading ? `${filter_toggler.is_row ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-3 md:grid-cols-4` : ""} grid gap-2 px-2 sm:px-6 py-1`}>
                                {
                                    loading ?
                                    [1, 2, 3, 4].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products && products?.length > 0 ? 
                                    products?.map((product, idx) => <ProductCard is_row={filter_toggler.is_row} product={product} key={idx}/>) :
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
                <div className="flex justify-between text-white sm:hidden sticky right-0 left-0 bottom-0 z-50 h-[45px] w-screen bg-primary-dark-blue divide-x-2 divide-neutral-200">
                    <div className="w-3/12 h-full border-r border-white/60">
                        <Button 
                            className="w-full"
                            onClick={() => setFilterToggler(state => ({...state, is_row: !state.is_row}))}>
                                {
                                    filter_toggler.is_row ? 
                                    <GridViewRoundedIcon className="text-white"/> :
                                    <ViewListRoundedIcon className="text-white"/>
                                }
                        </Button>
                    </div>
                    <Button 
                    onClick={() => setFilterToggler(state => ({...state, modal: true}))}
                    className=" w-4/12 h-full grid place-items-center px-5">
                        <span className="text-white font-semibold text-[16px]">FILTERS</span>
                    </Button>
                    <div className="grid place-items-center font-semibold text-[16px] w-5/12 h-full border-r border-white/60">
                        <select className="bg-transparent">
                            <option>LATEST</option>
                        </select>
                    </div>
                </div>
                <FilterModal 
                    open={filter_toggler.modal}
                    searchParams={searchParams} 
                    setSearchParams={setSearchParams}
                    close={() => setFilterToggler(state => ({...state, modal: false}))}
                />
            </div>
        </Body>
    )
}

export default CategoryPage