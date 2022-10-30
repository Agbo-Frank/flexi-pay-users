import { Search } from "@mui/icons-material";
import { Checkbox, Divider, Rating, Slider } from "@mui/material";
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { IFilter, ISubCategory } from "../../interface";
import { useLazyGetCategoriesQuery } from "../../redux/api/Product"
import { filter_inputs, serializeFormQuery } from "../../utils";


interface IFiltersProps {
    searchParams: URLSearchParams;
    setSearchParams: any;
    sub_categories?: ISubCategory[]
}


export function Filters({searchParams, setSearchParams, sub_categories}: IFiltersProps){
    let navigate = useNavigate()
    let [categories, setCategories] = useState<any[]>()
    const [values, setValues] = useState<any>([1000, 300000])

    let [getCategories, { data, loading }] = useLazyGetCategoriesQuery({
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.result,
            loading: isLoading
        })
    })

    useEffect(() => {
        if(!sub_categories){
            getCategories()
                .unwrap()
                .then(data => {
                    setCategories(data.result)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            setCategories(sub_categories)
        }
    }, [loading, sub_categories])

    categories = sub_categories ? sub_categories : categories

    function submitPriceRange(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setSearchParams({...serializeFormQuery(searchParams), from: values[0], to: values[1]})
    }
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
            {filter_inputs?.length && filter_inputs.map((val: any, index: any)=>(
                <div className="w-full" key={index}>
                <div className="w-full p-5">
                    <div className="flex justify-between">
                    <h3 className="text-[#222222] font-medium text-lg">{val.title}</h3>
                    <h3 className="text-[#222222] font-medium text-lg" dangerouslySetInnerHTML={{__html: val.subtitle}} />
                    </div>
                    <div className={`w-full h-[35px] relative my-3 ${val.search ? "block" : "hidden"}`}>
                    <input className="rounded-3xl w-full h-full border border-[#E8E5FF] px-3" placeholder="Search brands" />
                    <button className="rounded-3xl md:w-[20%] h-full absolute top-0 right-0 bg-[#FF5000] text-white hover:opacity-50"><Search /></button>
                    </div>
                    <div className="py-2 overflow-y-auto max-h-[400px]">
                    {val.list?.length && val.list?.map((arr: any)=>(
                        <div className="flex" key={arr.id}>
                        <Checkbox color="secondary" value={arr.value} size="small" />{val.rating ? (<Rating readOnly name="size-small" defaultValue={arr.text} size="small" className="mt-2" />) : (<span className="mt-2">{arr.text}</span>)}
                        </div>
                    ))}
                    </div>
                    <div className={`w-full ${val.range ? "block" : "hidden"}`}>
                    <p className="font-medium">Set Price Range (₦)</p>
                    <form 
                        // className="flex justify-between h-[40px] space-x-2 py-1"
                        onSubmit={submitPriceRange}>
                            <div>
                                <Slider 
                                value={values}
                                defaultValue={values}
                                min={1000}
                                max={300000}
                                valueLabelDisplay="auto"
                                onChange={(e, v) => setValues(v)}
                                color="secondary"
                                getAriaValueText={(value) => "₦ " + value}
                            />
                            </div>
                            <div className="flex justify-between h-[40px] space-x-2 py-1">
                                <input 
                                    type="number" 
                                    className="rounded-2xl md:w-[40%] h-full border border-[#E8E5FF] px-3" 
                                    placeholder="₦ from"  
                                    value={values[0]}
                                    onChange={(e) => setValues([e.target.value, values[1]])}
                                />
                                <input 
                                    type="number" 
                                    className="rounded-2xl md:w-[40%] h-full border border-[#E8E5FF] px-3" 
                                    placeholder="₦ to" 
                                    value={values[1]}
                                    onChange={(e) => setValues([values[0], e.target.value])}
                                />
                                <button className="rounded-2xl md:w-[20%] h-full bg-[#FF5000] text-white hover:opacity-50 " type="submit">OK</button>
                            </div>
                    </form>
                    </div>
                </div>
                {index < filter_inputs?.length && (<Divider  />)}
                </div>
            ))}
        </div>
    )
}

export default Filters