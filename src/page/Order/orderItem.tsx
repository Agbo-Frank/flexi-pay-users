
import { useDispatch } from 'react-redux'
import { CardActions, CardImg, CardText, CardWrapper, CopyText, ProgressBar } from "../../components"
import OrderDetails from "./OrderDetails"
import Empty from "../../components/Empty"
import { useState, Dispatch, SetStateAction } from "react"
import TV from '../../asset/monitor.png'
import BagIcon from "../../components/icons/Bag"
import {
    TrackIcon, 
    DocIcon, StarIcon
} from "../../components/icons"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import { IOrder, ISubscription } from '../../interface'
import moment from 'moment'
import Tracker from './Tracker'
import { formatNumber, formatString, sliceString } from '../../utils'
import ProductReviewForm from './ProductReviewForm'
import { LoadingButton } from '@mui/lab'
import backgroundImage from "../../asset/backgroundImage.png"
import { cancelOrder } from './service'
import { useCancelOrderMutation } from '../../redux/api/Order'


export interface IOrderModel {
    order: IOrder;
    open: boolean;
    close: () => void | any
}


interface IOrderDetails {
    order: IOrder;
}
interface IOrderButtons {
    order: IOrder;
    setOpen: Dispatch<SetStateAction<{
        track: boolean;
        details:boolean;
        review: boolean;
        cancel: boolean
    }>>,
    disabled: any
}

function Buttons ( { order, setOpen, disabled }: IOrderButtons): JSX.Element{
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch()


    if(order.status === 'processed'){
        return(
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"} 
                variant='contained'
                startIcon={<TrackIcon color="white" size="17"/>}
                onClick={() => setOpen(state => ({...state, track: true}))}
                disabled={disabled === null}
                >
                    Track Item
            </Button>
        )
    }
    else if(order.status === 'delivered'){
        return (
        <>
             <Button 
                color="secondary"
                size={matches ? "large" : "medium"} 
                variant='contained'
                onClick={() => setOpen(state => ({...state, details: true}))}
                startIcon={<DocIcon color='white' size="17" />}
                disabled={disabled === null}>
                    See Details
            </Button>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                variant="outlined" 
                startIcon={<StarIcon color="#ff5000" size="17"/>}
                onClick={() => setOpen(state => ({...state, review: true}))}
                disabled={disabled === null}>
                    Review Item
            </Button>
        </>
        )
    }
    
    else if(order.status === 'pending'){
        return(<>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                onClick={() => setOpen(state => ({...state, track: true}))}
                startIcon={<TrackIcon color='white' size="17" />}
                variant="contained"
                disabled={disabled === null}>
                    Track Items
            </Button>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                variant="outlined"
                onClick={() => setOpen(state => ({...state, cancel: true}))}
                disabled={disabled === null}>
                    Cancel
            </Button>
        </>)
    }
    else{
        return (
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"} 
                variant='contained'
                onClick={() => setOpen(state => ({...state, details: true}))}
                startIcon={<DocIcon color='white' size="17" />}
                disabled={disabled === null}>
                    See Details
            </Button>
        )
    }
}

function Order ({ order}: IOrderDetails) {
    let [open, setOpen] = useState({
        track: false,
        details: false,
        review: false,
        cancel: false
    })
    console.log(order)
    let [disabled] = useState(order.order_detail[0]?.product)
    const [canOrder, {isLoading}] = useCancelOrderMutation()
    const dispatch = useDispatch()
    return(
        <>  
            <>
                {
                    open.track &&
                    <Tracker order={order} open={open.track} close={() => setOpen(state => ({...state, track: false}))}/>
                }

                {
                    open.details &&
                    <OrderDetails order={order} open={open.details} close={() => setOpen(state => ({...state, details: false}))}/>
                }

                {
                    open.review &&
                    <ProductReviewForm order={order} open={open.review} close={() => setOpen(state => ({...state, review: false}))}/>
                }
                <Dialog open={open.cancel} onClose={() => setOpen(state => ({...state, cancel: false}))}>
                    <DialogTitle>Cancel Order</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to cancel your order?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpen(state => ({...state,  cancel: false}))}
                        >Abort </Button>

                        <LoadingButton
                        onClick={() => {
                            cancelOrder(
                                {order_id: order.id}, 
                                canOrder, 
                                dispatch,
                                () => setOpen(state => ({...state, cancel: false}))
                            )
                        }}
                        loading={isLoading}
                        color="secondary"
                        variant="contained"
                        >
                            Proceed
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
            <CardWrapper>
                <div 
                className={`flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0 ${!order.order_detail[0]?.product && "opacity-40"}`}
                onClick={() => setOpen(state => ({...state, details: true}))}>
                    <CardImg src={disabled === null ? backgroundImage : order.order_detail[0]?.product?.product_images[0]?.image_link} />
                    <div>
                        <div className="flex flex-col sm:h-full items-stretch">
                            <CardText>{ disabled === null ? "Product Doesn't exist" : sliceString(order.order_detail[0]?.product?.name, 25) }</CardText>
                            <small className="text-grey-200 text-xs sm:text-sm">Placed on  {moment(order.order_detail[0].created_at).format("MMM Do YY")}</small>
                            <small className="text-grey-200 text-xs sm:text-sm my-1">orderId: <CopyText text={typeof order.id === 'number' ? order.id.toString() : order.id}/></small>
                            <p className={`${ order.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ formatString(order.status) }</p>
                            <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail[0].price)}</p>
                        </div>
                    </div>
                </div>
                <CardActions>
                    <Buttons 
                        order={order}
                        setOpen={setOpen}
                        disabled={disabled}
                    />
                </CardActions>
            </CardWrapper> 
        </>  
    )
}

export default Order