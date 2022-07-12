import Button from "../components/Button"
import ItemWrapper from "../components/ItemWrapper"
import Empty from "../components/Empty"

import {CartIcon, TrashIcon} from "../components/icons"

import TV from '../asset/monitor.png'
import DashboardWrapper from "../components/DashboardWrapper"

export function SavedItem () {
    return(
        <ItemWrapper 
        img={TV} 
        lower={
            <>
                <Button color="#ff5000" >
                    <div className="flex items-center space-x-2">
                        <CartIcon color='white' size="17" />
                        <p className="text-white text-sm">Add to Cart</p>
                    </div>
                </Button>
                <Button color="#ff5000" outline>
                    <div className="flex items-center space-x-2">
                        <TrashIcon color="#ff5000" size="17"/>
                        <p className="text-primary-orange-200 text-sm">Remove</p>
                    </div>
                </Button>
            </>
        }
        upper={
            <div className="flex flex-col w-10/12 h-full items-stretch justify-evenly">
                <p className="w-9/12 text-grey-200">43" inches D-LED TV +1 years Warranty - Black</p>
                <p className="font-semibold text-primary-dark-blue ">₦ 150, 000</p>
            </div>
        }
        />
            
                
    )
}


export function SavedItems (){
    return(
        <DashboardWrapper>
            <div className="bg-white w-full min-h-400 border rounded-4xl py-5 px-4">
                <h3 className="text-primary-dark-blue text-lg font-semibold">Saved Items(0)</h3>
                {/* <Empty name="saved items" Icon={HeartIcon}/> */}
                <div className="w-full mt-8 mb-2 overflow-y-auto h-screen scrollbar">
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                    <SavedItem />
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default SavedItems