import { Backdrop, Button, Checkbox, CircularProgress, MenuItem, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
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
    useLazySearchProductQuery, 
    useLazyGetStoreQuery
} from "../../redux/api/Product"
import { hasQueryString, serializeFormQuery } from "../../utils"
import CategoryFilter from "./filter"


export function Vendor(){
    let [page, setPage] = useState(1)
    let [products, setProducts] = useState<IProduct[]>([])
    let [loading, setLoading] = useState(false)
    let [pagination, setPagination] = useState<IPagination<IProduct[]> | null>()

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
            
            getProducts(`${vendor_id}`)
                .unwrap()
                .then(result => {
                    if(result.status === "failed"){
                        navigate("*", {replace: true})
                    }else{
                        setProducts(result.result.data)
                        setPagination(result.result)
                    }
                    
                })
                .catch(err => console.log(err))
        }
        setLoading(false)
    }, [page, searchParams, filters])

    const category = [
      {
        id: 1,
        title: "Price",
        subTitle: "&#8358;",
        rating: false,
        list: [
          {id: 1.1, text: "Under ₦10,000", value: "<10000"},
          {id: 1.2, text: "₦10,000 - ₦20,000", value: "10000-20000"},
          {id: 1.3, text: "₦20,000 - ₦30,000", value: "20000-30000"},
          {id: 1.4, text: "₦30,000 - ₦40,000", value: "30000-40000"},
          {id: 1.5, text: "₦40,000 - ₦50,000", value: "40000-50000"},
          {id: 1.5, text: "₦50,000 -  Above", value: "50000>"},
        ],
        range: true,
        search: false,
      },
    //   {
    //     id: 2,
    //     title: "Discount",
    //     subTitle: "",
    //     rating: false,
    //     list: [
    //       {id: 2.1, text: "50% and above", value: "50%>"},
    //       {id: 2.2, text: "40% and above", value: "40%"},
    //       {id: 2.3, text: "30% and above", value: "30%"},
    //       {id: 2.4, text: "20% and above", value: "20%"},
    //       {id: 2.5, text: "10% and above", value: "10%"},
    //       {id: 2.5, text: "5% and above", value: "5%"},
    //     ],
    //     range: false,
    //     search: false,
    //   },
    //   {
    //     id: 3,
    //     title: "Brand",
    //     subTitle: "",
    //     rating: false,
    //     list: [
    //       {id: 3.1, text: "Nokia", value: "nokia"},
    //       {id: 3.2, text: "Gionee", value: "gionee"},
    //       {id: 3.3, text: "Samsung", value: "samsung"},
    //       {id: 3.4, text: "Motorola", value: "motorola"},
    //       {id: 3.5, text: "iPhone", value: "iPhone"},
    //       {id: 3.5, text: "Infinix", value: "infinix"},
    //       {id: 3.6, text: "Techno", value: "techno"},
    //       {id: 3.7, text: "iTel", value: "iTel"},
    //     ],
    //     range: false,
    //     search: true,
    //   },
    //   {
    //     id: 4,
    //     title: "Sizes",
    //     subTitle: "",
    //     rating: false,
    //     list: [
    //       {id: 4.1, text: "7.0 inches", value: "7.0"},
    //       {id: 4.2, text: "6.4 inches", value: "6.4"},
    //       {id: 4.3, text: "6.1 inches", value: "6.1"},
    //       {id: 4.4, text: "5.5 inches", value: "5.5"},
    //       {id: 4.5, text: "5.0 inches", value: "5.0"},
    //       {id: 4.5, text: "4.5 inches", value: "4.5"},
    //     ],
    //     range: false,
    //     search: false,
    //   },
    //   {
    //     id: 5,
    //     title: "Ratings",
    //     subTitle: "",
    //     rating: true,
    //     list: [
    //       {id: 5.1, text: 5, value: 5},
    //       {id: 5.2, text: 4, value: 4},
    //       {id: 5.3, text: 3, value: 3},
    //       {id: 5.4, text: 2, value: 2},
    //       {id: 5.5, text: 1, value: 1},
    //     ],
    //     range: false,
    //     search: false,
    //   },
    ]
    console.log(vendor_id)
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
                    <CategoryFilter 
                        category={category}
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
                            <div className={`${products?.length > 0 || loading ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : ""} grid gap-2 px-2 sm:px-6 py-1`}>
                                {
                                    loading ?
                                    [1, 2, 3, 4].map((product, idx) => <ProductCardSkeleton key={idx}/>) :
                                    products?.length > 0 ? 
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
                                onChange={(e, page) => setPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default Vendor