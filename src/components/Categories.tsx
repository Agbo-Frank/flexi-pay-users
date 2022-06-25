import MenuIcon from "./icons/MenuIcon"


function Categories (): JSX.Element {
    return(
        <div className="w-full bg-primary-dark-blue text-white px-6 flex font-medium  justify-between py-2 xl:px-fp-5 2xl:px-fp-10">
            <div className="flex justify-start gap-5 capitalize items-center text-grey-600 text-sm">
                <div className="flex gap-4">
                    <MenuIcon size="20" color="white"/>
                    <span>All categories</span>
                </div>
                <p>services</p>
                <p>real estate</p>
                <p>house & appartment</p>
                <p>electronics</p>
                <p>home & kitchen</p>
            </div>
            <div className="w-fit h-fit p-1 overflow-hidden rounded-full">
                <div className="relative flex w-fit h-fit">
                    <div className="absolute inline-flex top-0 left-0 rounded-full animate-ping h-full w-full bg-white opacity-100"></div>
                    <a className="relative py-3 rounded-full px-5 bg-white text-primary-orange-200">Sell on <span className="text-primary-blue">FlexiPay</span></a>
                </div>
            </div>
        </div>
    )
}

export default Categories