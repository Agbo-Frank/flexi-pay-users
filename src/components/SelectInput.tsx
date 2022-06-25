import { ISelectInput } from "./interface"


function SelectInput ({ label }: ISelectInput){
    return(
        <div className={`flex flex-col justify-between rounded-full border  border-solid focus-within:border-primary-blue border-grey-400 py-3 px-5 mb-4 w-full items-center relative`}>
            <label htmlFor="select" className="w-full">
                {/* <p className="text-grey-200">select a close pick up station</p> */}
                <select className="w-full" id="select">
                    <option value=""><p className="text-grey-400">{ label }</p></option>
                    <option value="guy">guy</option>
                    <option  className="w-full py-2 px-2 hover:bg-primary-blue hover:text-white">guy</option>
                    <option value="guy2">guy</option>
                    <option value="guy2">guy</option>
                </select>
            </label>
            {/* <ul className="absolute w-full left-0 top-full h-fit max-h-36 rounded-lg bg-white overflow-x-hidden overflow-y-auto scrollbar py-2">
                <li value="guy" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy1" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy2" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy2" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy1" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy2" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
                <li value="guy2" className="w-full py-1 px-2 hover:bg-primary-blue hover:text-white">guy</li>
            </ul> */}
            {/* <i className="fa-solid fa-angle-down focus-within:fa-angle-down"></i> */}
        </div>
    )
}

export default SelectInput