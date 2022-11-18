import { Backdrop, Button, Checkbox, CircularProgress, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import { 
    Body, 
    ProductCard, Empty,
    ProductCardSkeleton, 
    Breadcrumb,
    SearchBar} from "../../components"
import { SearchIcon } from "../../components/icons"
import { IFilter, IPagination, IProduct } from "../../interface"
import { 
    useLazyFilterProductQuery, 
    useLazyGetStoreQuery
} from "../../redux/api/Product"
import {  serializeFormQuery } from "../../utils"
import Filters from "../Products/filters"
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { FilterModal } from "../../components/Models"


export function Vendor(){
    let [page, setPage] = useState(1)
    let [products, setProducts] = useState<IProduct[]>([])
    let [loading, setLoading] = useState(false)
    let [pagination, setPagination] = useState<IPagination<IProduct[]> | null>()
    let [filter_toggler, setFilterToggler] = useState({
        modal: false,
        is_row: false
    })

    let { id: vendor_id } = useParams()

    let [searchParams, setSearchParams] = useSearchParams()
    
    let [filters, setFilters] = useState<IFilter>({
        parent_category: searchParams.get('parent_category') || "",
        sub_category:  "",
        price: "",
        product_name: searchParams.get('search') || "",
        latest: searchParams.get('latest')  || 'false',
        page,
        price_range: [{
            from: searchParams.has('price_from') ? parseFloat(`${searchParams.get('price_from')}`) : null,
            to: searchParams.has('price_to') ? parseFloat(`${searchParams.get('price_to')}`) : null
        }]
    })

    console.log(filters)

    let navigate = useNavigate()
    let [filterProduct] = useLazyFilterProductQuery()
    let [getProducts] = useLazyGetStoreQuery()

    useEffect(() => {   
        getProducts({page, slug: `${vendor_id}`})
            .unwrap()
            .then(result => {
                if(result.status === "failed"){
                    navigate("/*", {replace: true})
                }else{
                    setProducts(result.result.data)
                    setPagination(result.result)
                }
                
            })
            .catch(err => console.log(err))
    }, [page, searchParams, filters])
    products = products?.filter((product: IProduct) => product.product_images.length > 0)
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <Backdrop
                className="text-[#fff] backdrop-blur z-50"
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Breadcrumb />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="fp-screen flex flex-col sm:flex-row sm:space-x-6 bg-white sm:bg-grey-500 justify- items-stretch">
                    <Filters
                        searchParams={searchParams} 
                        setSearchParams={setSearchParams}
                    />
                    <div className="w-full sm:w-9/12">
                        <div className="rounded-lg bg-white">
                            <div className="flex justify-between items-center py-2 px-2 sm:px-6 border-b border-grey-100">
                                <p className="font-medium text-lg capitalize">{vendor_id?.replace(/-/g, ' ')}</p>
                            </div>
                            <div className="flex justify-between items-center py-1 px-2 sm:px-6 border-b border-grey-100">
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
                            <div className={`${products?.length > 0 || loading ? `${filter_toggler.is_row ? 'grid-cols-1' : 'grid-cols-2'} sm:grid-cols-3 md:grid-cols-4` : ""} grid gap-2 px-2 sm:px-6 py-1`}>
                                {
                                    loading ?
                                    [1, 2, 3, 4].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products?.length > 0 ? 
                                    products?.map((product, idx) => <ProductCard is_row={filter_toggler.is_row} product={product} key={idx}/>) :
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
                                onChange={(e, page) => setPage(page)}
                            />
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

export default Vendor