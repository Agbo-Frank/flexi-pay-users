
import { Rating, Skeleton, Button } from "@mui/material";
import moment from "moment";
import { Empty } from "../../components";
import { MessageIcon } from "../../components/icons";
import { useGetReviewsQuery } from "../../redux/api/Reviews";


export function ProductReview({ slug }: {slug: string}){
    let { reviews, pagination, isLoading} = useGetReviewsQuery({slug, page: "1"}, {
        selectFromResult: ({ data, isLoading}) => ({
            reviews: data?.result.data.data,
            pagination: data?.result.data,
            isLoading
        })
    })
    const average_rating = reviews?.reduce((total, review) => {
        return total + (typeof review.rate === 'string' ? parseFloat(`${review.rate}`) : review.rate)
    }, 0) || 0
    
    if(reviews?.length === 0){
        return(
            <Empty 
                title="No Reviews Yet"
                Icon={MessageIcon}
                message="Customers who have bought this product have not yet posted comments"
                button={
                    <Button color="secondary">Start Shopping</Button>
                }
            />
        )
    }
    else {
        return(
            <div className="w-full sm:py-5 sm:space-y-3">
                <div className="flex justify-between border border-b-0 sm:border-0">
                    <p className="font-semibold sm:font-medium sm:text-lg m-2 sm:mb-0">Verified Customer’s Reviews</p>
                    <Button
                    color="secondary"
                    endIcon={<i className="font-bold text-xs fa-solid fa-chevron-right"></i>}>
                        View More
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 border sm:border-0 p-2">
                    <div className="bg-grey-900 rounded-xl min-w-fp-300 mx-auto my-2 sm:my-0 sm:mx-0 w-[90%] sm:w-2/12">
                        <div className="p-4 border-b border-grey-100">
                            <h1 className="font-medium text-sm">Verified Ratings ({ reviews?.length })</h1>
                        </div>
                        <div className="bg-white grid place-items-center text-4xl text-primary-gold font-medium m-4 py-10 rounded-lg">{ (average_rating/(reviews?.length || 1)).toFixed(1) }</div>
                        <div className="px-4 pb-4">
                            <div className="flex space-x-2 items-center">
                                <p>{reviews?.filter(review => review.rate > 4.4).length}</p>
                                <Rating 
                                    readOnly
                                    value={5}
                                    emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                    icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                    />
                            </div>
                            <div className="flex space-x-2 items-center">
                                <p>{reviews?.filter(review => review.rate > 3.4 && review.rate < 4.3).length}</p>
                                <Rating 
                                    readOnly
                                    value={4}
                                    emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                    icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                />
                            </div>
                            <div className="flex space-x-2 items-center">
                                <p>{reviews?.filter(review => review.rate > 2.4 && review.rate < 3.3).length}</p>
                                <Rating 
                                    readOnly
                                    value={3}
                                    emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                    icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                />
                            </div>
                            <div className="flex space-x-2 items-center">
                                <p>{reviews?.filter(review => review.rate > 1.4 && review.rate < 2.3).length}</p>
                                <Rating 
                                    readOnly
                                    value={2}
                                    emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                    icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                />
                            </div>
                            <div className="flex space-x-2 items-center">
                                <p>{reviews?.filter(review => review.rate < 1.3).length}</p>
                                <Rating 
                                    readOnly
                                    value={1}
                                    emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                    icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="min-w-fp-300 sm:w-3/12 space-y-4">
                        <h1 className="font-medium text-sm">Comments From Customers</h1>
                        <div className="space-y-4">
                            {
                                isLoading ?
                                [1, 2, 3].map(() => (
                                    <div className="space-y-2">
                                        <Skeleton sx={{fontSize: 14}} width={200}/>
                                        <Skeleton sx={{fontSize: 16}} width={150}/>
                                        <div className="text-sx flex items-center justify-between">
                                            <Skeleton sx={{fontSize: 14}} width={80}/>
                                            <Skeleton sx={{fontSize: 14}} width={80}/>
                                        </div>
                                    </div>
                                )):
                                reviews?.map((review, idx) => (
                                    <div className="space-y-2 border-b pb-4 w-full">
                                        <p className="text-sm">{review.comment}</p>
                                        {
                                            review.rate &&
                                            <Rating 
                                                readOnly
                                                value={4}
                                                emptyIcon={<i className="text-primary-gold text-sm sm:text-lg fa-regular fa-star"></i>}
                                                icon={<i className="text-primary-gold text-sm sm:text-lg fa-solid fa-star"></i>}
                                            />
                                        }
                                        
                                        <div className="text-sx items-center flex justify-between">
                                            <small className="capitalize">By {review.user.first_name + " " + review.user.last_name}</small>
                                            <small>Date: {moment(review.created_at).format("l")}</small>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )   
    }
}

export default ProductReview