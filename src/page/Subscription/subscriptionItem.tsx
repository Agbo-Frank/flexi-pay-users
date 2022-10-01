
import { useDispatch } from 'react-redux'
import { CardActions, CardImg, CardText, CardWrapper, CopyText, ProgressBar } from "../../components"
// import OrderDetails from "./OrderDetails"
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
import { formatNumber } from '../../utils'
import { LoadingButton } from '@mui/lab'
import { useCancelSubscriptionMutation } from '../../redux/api/Order'
import { cancelSubscription } from './services'


export interface IOrderModel {
    order: IOrder,
    open: boolean;
    close: () => void | any
}


interface IOrderDetails {
    order: IOrder;
}

function Subscription ({ subscription }: {subscription: ISubscription}) {
    const matches = useMediaQuery('(min-width:600px)');
    let [open, setOpen] = useState({
        details: false,
        cancel: false
    })
    let [cancelSub, {isLoading}] = useCancelSubscriptionMutation()
    return(
        <>  <>
                {/* <OrderDetails order={order} open={open.details} close={() => setOpen(state => ({...state, details: false}))}/> */}
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
                        >Cancel</Button>

                        <LoadingButton
                        // onClick={() => cancelSubscription({id: subscription.})}
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
                <div className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0"
                onClick={() => setOpen(state => ({...state, details: true}))}>
                    <CardImg src={ `${subscription.installment.product?.product_images[0].image_link}` } />
                    <div>
                        <div className="flex flex-col sm:h-full items-stretch">
                            <CardText>{ subscription.installment.product?.name }</CardText>
                            {/* <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(subscription.amount)}</p> */}
                            <small className="text-grey-200 text-xs sm:text-sm">Subscribed on  {moment(subscription.created_at).format("MMM Do YY")}</small>
                            <p className={`${ subscription.is_completed ? 'paid' : 'pending' } py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit my-1`}>{ subscription.is_completed ? 'paid' : 'pending' }</p>
                            <ProgressBar width={((parseFloat(subscription.amount) / parseFloat(subscription.amount_to_be_paid)) * 100).toString()}/>
                        </div>
                    </div>
                </div>
                <CardActions>
                    <Button 
                        color="secondary"
                        size={matches ? "large" : "medium"}  
                        onClick={() => setOpen(state => ({...state, track: true}))}
                        startIcon={<i className="text-white fa-solid fa-plus"></i>}
                        variant="contained">
                            Top up
                    </Button>
                    <Button 
                        color="secondary"
                        size={matches ? "large" : "medium"}  
                        variant="outlined"
                        onClick={() => setOpen(state => ({...state, cancel: true}))}>
                            Cancel
                    </Button>
                </CardActions>
            </CardWrapper> 
        </>  
    )
}

export default Subscription