import ModelWrapper from "./ModelWrapper"
import TV from '../../asset/monitor.png'
import StarIcon from "../icons/StarIcon"
import { useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import { toggleProductReview } from "../../redux/slice/modal";
import { RootState } from "../../redux/store";
import { Button } from "@mui/material"
import { CardImg } from "../StyledComponent"


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
                        className={`w-1/2 mb-2 ${!isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200'} border-solid text-sm sm:text-base  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                        onClick={() => setIsReport(false)}>Rate This Prodcuct</div>
                        <div 
                        className={`w-1/2 text-right mb-2 ${isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200 '} text-sm sm:text-base hover:bg-gray-100 py-3 px-2 cursor-pointer`}
                        onClick={() => setIsReport(true)}>Report This Product</div>
                    </div>

                    <div className="mx-4 mt-3 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <CardImg src={TV} />
                            <div className="flex flex-col h-full items-stretch justify-evenly ">
                                <p className="text-grey-700 text-sm sm:text-base">43" inches D-LED TV +1 years Warranty - Black</p>
                                <p className="font-semibold text-primary-dark-blue ">₦ 150, 000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="w-11/12 text-center text-crimson text-[13px] sm:text-sm font-medium bg-primary-orange-300 p-1 my-5 mx-4 rounded-lg">
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
                

                <div className="mx-auto my-4 flex justify-center w-fit">
                    <Button 
                        color="secondary" 
                        startIcon={<StarIcon color="white" size="20" />}
                        variant="contained">
                            Submit {!isReport ? 'Review' : 'Report' }
                    </Button>
                </div>
            </div>
        </ModelWrapper>
    )
}

export default ProductReview