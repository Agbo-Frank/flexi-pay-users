
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

function Subscription ({ subscription }: {subscription: ISubscription}) {
    const matches = useMediaQuery('(min-width:600px)');
    let [open, setOpen] = useState({
        details: false,
        cancel: false
    })
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
                    <CardImg src={TV} />
                    <div>
                        <div className="flex flex-col sm:h-full items-stretch">
                            <CardText>Books</CardText>
                            <small className="text-grey-200 text-xs sm:text-sm">Placed on  {moment(subscription.created_at).format("MMM Do YY")}</small>
                            <ProgressBar width="50%"/>
                            <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(subscription.amount)}</p>
                        </div>
                    </div>
                </div>
                <CardActions>
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
                </CardActions>
            </CardWrapper> 
        </>  
    )
}

export default Subscription