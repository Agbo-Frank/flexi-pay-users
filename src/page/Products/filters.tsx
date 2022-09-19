import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { IFilter } from "../../interface";
import { useGetCategoriesQuery } from "../../redux/api/Product"
import { serializeFormQuery } from "../../utils";


interface IFiltersProps {
    filters: IFilter,
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>,
    searchParams: URLSearchParams;
    setSearchParams: any
}


export function Filters({filters, setFilters, searchParams, setSearchParams}: IFiltersProps){
    let navigate = useNavigate()

    let { categories, loading } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })
    return(
        <div className="hidden sm:block sm:w-3/12 h-full border bg-white py-2 rounded-lg">
            <h3 className="text-[#222222] font-medium ml-4 text-lg">Category</h3>
            <ul className="">
                {
                    !loading && categories && 
                    categories?.map((category, idx) => <li 
                        className={`py-1 pl-9 w-full cursor-pointer hover:bg-grey-500 ${searchParams.has('parent_category') && (searchParams.get('parent_category') === category.name.toLowerCase() && "bg-grey-500")} text-[#222222]`}
                        key={idx}
                        onClick={() => setSearchParams({...serializeFormQuery(searchParams),parent_category: category.name.toLowerCase()})}
                        >
                            {category.name}
                        </li>)
                }
            </ul>
        </div>
    )
}

export default Filters