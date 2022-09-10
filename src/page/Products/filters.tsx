import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { IFilter } from "../../interface";
import { useGetCategoriesQuery } from "../../redux/api/Product"


interface IFiltersProps {
    filters: IFilter,
    setFilters: React.Dispatch<React.SetStateAction<IFilter>>
}


export function Filters({filters, setFilters}: IFiltersProps){
    let navigate = useNavigate()

    let { categories, loading } = useGetCategoriesQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            categories: data?.result,
            loading: isLoading
        })
    })
    console.log(categories)
    return(
        <div className="hidden sm:block sm:w-3/12 h-full border bg-white py-2 rounded-lg">
            <h3 className="text-[#222222] font-medium ml-4 text-lg">Category</h3>
            <ul className="">
                {
                    !loading && categories && 
                    categories?.map((category, idx) => <li 
                        className="py-1 pl-9 w-full cursor-pointer hover:bg-grey-500 text-[#222222]"
                        key={idx}
                        onClick={() => {
                            navigate({
                                search: '?filters=true'
                            })
                            setFilters(state => ({...state, parent_category: category.name}))
                        }}
                        >
                            {category.name}
                        </li>)
                }
            </ul>
        </div>
    )
}

export default Filters