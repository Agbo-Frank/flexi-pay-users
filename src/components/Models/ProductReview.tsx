import ModelWrapper from "./ModelWrapper"
import Button from "../Button"
import TV from '../../asset/monitor.png'
import StarIcon from "../icons/StarIcon"
import { useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { toggleProductReview } from "../../redux/slice/modalSlice";
import { RootState } from "../../redux/store";


function ProductReview(){
    let [isReport, setIsReport] = useState(false)

    const productReview: boolean = useSelector((state: RootState) => state.modal.productReview)
    const dispatch = useDispatch()
    return(
        <ModelWrapper isOpen={productReview} closeModal={() => dispatch(toggleProductReview())}>
            <div className="h-full overflow-y-auto scrollbar relative">
                <div className="sticky top-0 left-0 bg-white">
                    <div className="flex w-11/12 mx-4">
                        <div 
                        className={`w-1/2 mb-2 ${!isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200'} border-solid  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                        onClick={() => setIsReport(false)}>Rate This Prodcuct</div>
                        <div 
                        className={`w-1/2 text-right mb-2 ${isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200 '} hover:bg-gray-100 py-3 px-2 cursor-pointer`}
                        onClick={() => setIsReport(true)}>Report This Prodcuct</div>
                    </div>

                    <div className="mx-4 mt-3 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="w-24">
                                <img src={TV} className="w-full h-auto object-contain "/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="w-9/12 text-grey-700 text-sm">43" inches D-LED TV +1 years Warranty - Black</p>
                                <p className="font-medium text-primary-dark-blue text-sm">150, 000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="w-11/12 text-center text-crimson text-sm font-medium bg-primary-orange-300 py-1 my-5 mx-4 rounded-lg">
                    Your { !isReport ? 
                   'Review will be visible to the seller and other customers' :
                   'Report will be submitted to the admin'
                   }
                </p>

                <textarea 
                className="w-11/12 rounded-lg text-sm p-4 border-grey-100 border border-solid mx-4 h-48"
                placeholder="Type your review here...">

                </textarea>
                {
                    !isReport &&
                    (<div className="flex justify-center gap-3 my-3">
                        <StarIcon size="30" color="#FFD600"/>
                        <StarIcon size="30" color="#FFD600"/>
                        <StarIcon size="30" color="#FFD600"/>
                        <StarIcon size="30" color="#EDEEF0"/>
                        <StarIcon size="30" color="#EDEEF0"/>
                    </div>)
                }
                

                <div className="mx-auto my-3 flex justify-center w-5/12">
                    <Button color="#FF5000" >
                        <div className="flex gap-3">
                            {!isReport && <StarIcon color="white" size="20" />}
                            <p className="white">Submit {!isReport ? 'Review' : 'Report' }</p>
                        </div>
                    </Button>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default ProductReview