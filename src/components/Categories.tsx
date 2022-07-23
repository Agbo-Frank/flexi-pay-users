import { useLocation } from "react-router-dom"
import MenuIcon from "./icons/MenuIcon"


export function Categories (): JSX.Element {
    return(
        <div className="w-full bg-primary-dark-blue text-white">
            <div className="flex py-2 bg-primary-dark-blue font-medium justify-between fp-screen">
                <div className="flex justify-start space-x-5 capitalize items-center text-grey-600 text-sm">
                    <div className="flex space-x-4">
                        <MenuIcon size="20" color="white"/>
                        <span>All categories</span>
                    </div>
                    <p>services</p>
                    <p>real estate</p>
                    <p>house & appartment</p>
                    <p>electronics</p>
                    <p>home & kitchen</p>
                </div>

                <div className="w-fit h-fit p-1 overflow-hidden rounded-xl">
                    <div className="relative flex w-fit h-fit overflow-hidden rounded-xl">
                        <div className="absolute inline-flex top-0 left-0 rounded-xl animate-ping h-full w-full bg-white"></div>
                        <a className="relative py-2 rounded-xl px-4 text-sm bg-white text-primary-orange-200">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories