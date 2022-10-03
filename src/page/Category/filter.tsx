import { Search } from "@mui/icons-material";
import { Checkbox, Divider, Rating } from "@mui/material";
import { IFilter } from "../../interface";


interface IFiltersProps {
  category: any
}


export function CategoryFilter({category}: IFiltersProps){
    
    return(
        <div className="hidden sm:block sm:w-3/12 h-full border bg-white rounded-lg">
          {category?.length && category.map((val: any, index: any)=>(
            <div className="w-full">
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
                      <Checkbox value={arr.value} size="small" />{val.rating ? (<Rating readOnly name="size-small" defaultValue={arr.text} size="small" className="mt-2" />) : (<span className="mt-2">{arr.text}</span>)}
                    </div>
                  ))}
                </div>
                <div className={`w-full ${val.range ? "block" : "hidden"}`}>
                  <p className="font-medium">Set Price Range</p>
                  <div className="flex justify-between h-[40px] space-x-2 py-1">
                    <input className="rounded-2xl md:w-[40%] h-full border border-[#E8E5FF] px-3" placeholder="₦ from" />
                    <input className="rounded-2xl md:w-[40%] h-full border border-[#E8E5FF] px-3" placeholder="₦ to" />
                    <button className="rounded-2xl md:w-[20%] h-full bg-[#FF5000] text-white hover:opacity-50">OK</button>
                  </div>
                </div>
              </div>
              {index - category?.length && (<Divider  />)}
            </div>
          ))}
        </div>
    )
}

export default CategoryFilter