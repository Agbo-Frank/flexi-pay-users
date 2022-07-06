import MasterCardIcon from "./icons/MasterCard"

function CreditCard () {
    return(
        <div className="border border-primary-blue rounded-2xl flex flex-col w-80 px-4 py-3 my-4 text-primary-blue">
            <p className="mt-3">23****53***3</p>
            <p>Mr John Doe</p>
            <div className="flex gap-2 items-center text-sm w-fit ml-auto mt-4">
                <MasterCardIcon size="24"/>
            </div>
        </div>
    )
}

export default CreditCard