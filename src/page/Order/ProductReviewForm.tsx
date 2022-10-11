import ModelWrapper from "../../components/Models/ModelWrapper"
import StarIcon from "../../components/icons/StarIcon"
import { useState } from "react"
import { Rating } from "@mui/material"
import { CardText, CardWrapper } from "../../components/StyledComponent"
import { IOrderModel } from "./orderItem"
import { formatNumber } from "../../utils"
import FPFormikProductReview from "./service"
import { useCommentOnAProductMutation, useRateAProductMutation } from "../../redux/api/Reviews"
import { LoadingButton } from "@mui/lab"


function ProductReviewForm({order, open, close}: IOrderModel){
    let [isReport, setIsReport] = useState(false)

    let [comment, { isLoading: commenting }] = useCommentOnAProductMutation()
    let [rate, {isLoading: rating}] = useRateAProductMutation()

    let formik = FPFormikProductReview(comment, rate)
    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            components={
            <div className="flex w-full">
                <div 
                className={`w-1/2 ${!isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200'} border-solid text-sm sm:text-base  py-3 px-2 hover:bg-gray-100 cursor-pointer`}
                onClick={() => setIsReport(false)}>Rate This Prodcuct</div>
                <div 
                className={`w-1/2 text-right ${isReport ? 'text-primary-blue border-primary-blue border-b-2' : 'text-grey-200 border-b-1 border-grey-200 '} text-sm sm:text-base hover:bg-gray-100 py-3 px-2 cursor-pointer`}
                onClick={() => setIsReport(true)}>Report This Product</div>
            </div>
        }>
            <div className="h-full overflow-y-auto scrollbar relative px-1">
                <CardWrapper 
                styles="rounded-sm">
                    <div className="flex w-full sm:w-full space-x-2 sm:space-x-4 items-stretch sm:pb-0">
                        <img src={order.order_detail[0].product.product_images[0].image_link} alt="" className="w-[108px] h-[108px]  object-cover rounded sm:rounded-md"/>
                        <div className="flex flex-col w-full">
                            <CardText>{ order.order_detail[0].product.name }</CardText>
                            <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail[0].price)}</p>
                        </div>
                    </div>
                </CardWrapper>

                <p className="w-11/12 text-center text-crimson text-[13px] sm:text-sm font-medium bg-primary-orange-300 p-1 my-5 mx-4 rounded-lg">
                    Your { !isReport ? 
                   'Review will be visible to the seller and other customers' :
                   'Report will be submitted to the admin'
                   }
                </p>
                <form onSubmit={(e) => {
                    formik.setFieldValue('slug', order.order_detail[0].product.slug)
                    formik.handleSubmit(e)
                }}>
                    <textarea 
                        className="w-11/12 rounded-lg text-sm p-4 border-grey-100 border border-solid mx-4 h-48"
                        placeholder="Type your review here..."
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}></textarea>
                    {
                        !isReport &&
                        <div className="flex justify-center gap-3 my-3">
                            <Rating
                                name="rate" 
                                emptyIcon={<StarIcon size="30" color="#EDEEF0"/>}
                                icon={<StarIcon size="30" color="#FFD600"/>} 
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                            />
                        </div>
                        
                    }
                    

                    <div className="mx-auto my-4 flex justify-center w-fit">
                        <LoadingButton
                            color="secondary" 
                            startIcon={<StarIcon color="white" size="20" />}
                            variant="contained"
                            loading={commenting || rating}
                            type="submit"
                        >
                                Submit {!isReport ? 'Review' : 'Report' }
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </ModelWrapper>
    )
}

export default ProductReviewForm