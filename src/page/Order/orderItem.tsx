
import { useDispatch } from 'react-redux'
import { CardActions, CardImg, CardText, CardWrapper, CopyText, ProgressBar } from "../../components"
import OrderDetails from "./OrderDetails"
import Empty from "../../components/Empty"
import { useState, Dispatch, SetStateAction } from "react"
import TV from '../../asset/monitor.png'
import BagIcon from "../../components/icons/Bag"
import {
    HeartIcon, CartIcon, 
    TrashIcon, TrackIcon, 
    DocIcon, StarIcon
} from "../../components/icons"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import { IOrder } from '../../interface'
import moment from 'moment'
import Tracker from './Tracker'
import { formatNumber } from '../../utils'
import ProductReviewForm from './ProductReviewForm'
import { LoadingButton } from '@mui/lab'


export interface IOrderModel {
    order: IOrder,
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
    }>>
}

function Buttons ( { order, setOpen }: IOrderButtons): JSX.Element{
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
                startIcon={<DocIcon color='white' size="17" />}>
                    See Details
            </Button>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                variant="outlined" 
                startIcon={<StarIcon color="#ff5000" size="17"/>}
                onClick={() => setOpen(state => ({...state, review: true}))}>
                    Review Item
            </Button>
        </>
        )
    }
    else{
        return(<>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                onClick={() => setOpen(state => ({...state, track: true}))}
                startIcon={<TrackIcon color='white' size="17" />}
                variant="contained">
                    Track Items
            </Button>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                variant="outlined"
                onClick={() => setOpen(state => ({...state, cancel: true}))}>
                    Cancel
            </Button>
        </>)
    }
}

function Order ({ order}: IOrderDetails) {
    let [open, setOpen] = useState({
        track: false,
        details: false,
        review: false,
        cancel: false
    })
    return(
        <>  <>
                <Tracker order={order} open={open.track} close={() => setOpen(state => ({...state, track: false}))}/>
                <OrderDetails order={order} open={open.details} close={() => setOpen(state => ({...state, details: false}))}/>
                <ProductReviewForm order={order} open={open.review} close={() => setOpen(state => ({...state, review: false}))}/>
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
                        >Cancel </Button>

                        <LoadingButton
                        // onClick={}
                        // loading={removing}
                        color="secondary"
                        variant="contained"
                        >
                            Confirm
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </>
            <CardWrapper>
                <div className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0"
                onClick={() => setOpen(state => ({...state, details: true}))}>
                    <CardImg src={order.order_detail?.product.product_images[0].image_link} />
                    <div>
                        <div className="flex flex-col sm:h-full items-stretch">
                            <CardText>{ order.order_detail?.product.name }</CardText>
                            <small className="text-grey-200 text-xs sm:text-sm">Placed on  {moment(order.order_detail.created_at).format("MMM Do YY")}</small>
                            <small className="text-grey-200 text-xs sm:text-sm my-1">orderId: <CopyText text={order.id}/></small>
                            {
                                // type === 'subscription' ?
                                // <ProgressBar width="50%"/>:
                                <p className={`${ order.status } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ order.status }</p>
                            }
                            <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(order.order_detail.price)}</p>
                            
                            {/* <p className="font-bold text-primary-dark-blue">150, 000</p> */}
                        </div>
                    </div>
                </div>
                <CardActions>
                    <Buttons 
                        order={order}
                        setOpen={setOpen}/>
                </CardActions>
            </CardWrapper> 
        </>  
    )
}

export default Order