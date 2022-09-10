
import { useDispatch } from 'react-redux'
import { seeOrderDetails, trackOrder, toggleProductReview } from "../../redux/slice/modal"
import { CardActions, CardImg, CardText, CardWrapper, ProgressBar } from "../../components"
import OrderDetails from "../../components/Models/OrderDetails"
import Empty from "../../components/Empty"
import { useState, Dispatch, SetStateAction } from "react"
import TV from '../../asset/monitor.png'
import BagIcon from "../../components/icons/Bag"
import {
    HeartIcon, CartIcon, 
    TrashIcon, TrackIcon, 
    DocIcon, StarIcon
} from "../../components/icons"
import { Button, useMediaQuery } from '@mui/material'


interface IOrderModel {
    orderDetails: boolean
}


interface IOrderDetails {
    type: 'pending' | 'delivered' | 'processing' | 'subscription',
    openModel?: Dispatch<SetStateAction<IOrderModel>>
}

function Buttons ({type, openModel}: IOrderDetails): JSX.Element{
    const matches = useMediaQuery('(min-width:600px)');
    const dispatch = useDispatch()

    if(type === 'processing'){
        return(
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"} 
                variant='contained'
                startIcon={<TrackIcon color="white" size="17"/>}
                onClick={() => dispatch(trackOrder())}>
                    Track Item
            </Button>
        )
    }
    else if(type === 'delivered'){
        return (
        <>
             <Button 
                color="secondary"
                size={matches ? "large" : "medium"} 
                variant='contained'
                onClick={() => dispatch(seeOrderDetails())}
                startIcon={<DocIcon color='white' size="17" />}>
                    See Details
            </Button>
            <Button 
                color="secondary"
                size={matches ? "large" : "medium"}  
                variant="outlined" 
                startIcon={<StarIcon color="#ff5000" size="17"/>}
                onClick={() => dispatch(toggleProductReview())}>
                    Rate Item
            </Button>
        </>
        )
    }
    return(<>
        <Button 
            color="secondary"
            size={matches ? "large" : "medium"}  
            onClick={() => dispatch(trackOrder())}
            startIcon={<TrackIcon color='white' size="17" />}
            variant="contained">
                Track Items
        </Button>
        <Button 
            color="secondary"
            size={matches ? "large" : "medium"}  
            variant="outlined">
                Cancel
        </Button>
    </>)
}

function Order ({type, openModel}: IOrderDetails) {
    return(
        <>
            <CardWrapper>
                <div className="flex w-full sm:w-9/12 space-x-2 sm:space-x-4 items-stretch pb-4 sm:pb-0">
                    <CardImg src={TV} />
                    <div>
                        <div className="flex flex-col sm:h-full items-stretch">
                            <CardText>43" inches D-LED TV +1 years Warranty - Black</CardText>
                            <small className="text-grey-200 text-xs sm:text-sm">orderId: 345679</small>
                            {
                                type === 'subscription' ?
                                <ProgressBar width="50%"/>:
                                <p className={`${ type } text-white py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit`}>{ type }</p>
                            }
                            
                            {/* <p className="font-bold text-primary-dark-blue">150, 000</p> */}
                        </div>
                    </div>
                </div>
                <CardActions>
                    <Buttons type={type} openModel={openModel}/>
                </CardActions>
            </CardWrapper> 
        </>  
    )
}

export default Order