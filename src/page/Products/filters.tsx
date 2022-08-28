import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IFilter } from "../../interface";
import { useGetCategoriesQuery } from "../../redux/slice/Product"


interface IFiltersProps {
    searchParams: URLSearchParams,
    setSearchParams: (nextInit: IFilter | any, navigateOptions?: {
        replace?: boolean | undefined;
        state?: any;
    } | undefined) => void
}


export function Filters({searchParams, setSearchParams}: IFiltersProps){
    let [searchParam, setSearchParam] = useSearchParams()
    let { categories, loading } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })
    return(
        <div className="w-3/12 h-full border bg-white py-2 rounded-lg">
            <h3 className="text-[#222222] font-medium ml-4 text-lg">Category</h3>
            <ul className="">
                {
                    categories?.map((category, idx) => <li 
                        className="py-1 pl-9 w-full cursor-pointer hover:bg-grey-500 text-[#222222]"
                        key={idx}
                        onClick={() => searchParam.set('parent_category', category.name)}
                        >
                            {category.name}
                        </li>)
                }
            </ul>
        </div>
    )
}

export default Filters