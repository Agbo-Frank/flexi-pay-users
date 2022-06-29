import Button from "../components/Button"
import ItemWrapper from "../components/ItemWrapper"
import Empty from "../components/Empty"

import CartIcon from "../components/icons/CartIcon"
import TrashIcon from "../components/icons/TrashIcon"

import TV from '../asset/monitor.png'
import DashboardWrapper from "../components/DashboardWrapper"

function SavedItem () {
    return(
        <ItemWrapper 
        img={TV} 
        lower={
            <>
                <Button color="#ff5000" >
                    <div className="flex gap-3">
                        <CartIcon color='white' size="20" />
                        <p className="text-white">Add to Cart</p>
                    </div>
                </Button>
                <Button color="#ff5000" outline>
                    <div className="flex gap-3">
                        <TrashIcon color="#ff5000" size="20"/>
                        <p className="text-primary-orange-200">Remove</p>
                    </div>
                </Button>
            </>
        }
        upper={
            <>
                <p className="w-9/12 text-grey-200">43" inches D-LED TV +1 years Warranty - Black</p>
                <p className="font-bold text-primary-dark-blue">150, 000</p>
            </>
        }
        />
            
                
    )
}


function SavedItems (){
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