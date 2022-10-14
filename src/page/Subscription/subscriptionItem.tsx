
import { useDispatch } from 'react-redux'
import { CardActions, CardImg, CardText, CardWrapper, CopyText, FormInput, ProgressBar } from "../../components"
// import OrderDetails from "./OrderDetails"
import Empty from "../../components/Empty"
import { useState, Dispatch, SetStateAction } from "react"
import {NairaIcon} from "../../components/icons"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import { IOrder, ISubscription } from '../../interface'
import moment from 'moment'
import { formatNumber, sliceString } from '../../utils'
import { LoadingButton } from '@mui/lab'
import { useCancelSubscriptionMutation, useTopUpSubscriptionMutation } from '../../redux/api/Order'
import { cancelSubscription, FPFormikTopUpSubscription } from './services'
import SubscriptionDetails from './subscriptionDetails'


export interface ISubscriptionModal {
    subscription: ISubscription,
    open: boolean;
    close: () => void | any
}

function Subscription ({ subscription }: {subscription: ISubscription}) {
    const matches = useMediaQuery('(min-width:600px)');
    let [open, setOpen] = useState({
        details: false,
        cancel: false,
        top_up: false
    })
    const dispatch = useDispatch()
    let [cancelSub, {isLoading}] = useCancelSubscriptionMutation()
    let [topUp, {isLoading: toping}] = useTopUpSubscriptionMutation()
    const formik = FPFormikTopUpSubscription(topUp, () => setOpen(state => ({...state, top_up: false})))

    function getProgress(){
        const amount_left = parseInt(subscription.amount_left)
        const amount_to_be_paid = parseInt(subscription.amount_to_be_paid)
        const amount_paid = parseInt(subscription.amount_paid)

        const result = (amount_paid / amount_to_be_paid) * 100
        return Math.floor(result)

    }

    console.log(subscription)
    return(
        <>  <>
                {
                    open.details &&
                    <SubscriptionDetails subscription={subscription} open={open.details} close={() => setOpen(state => ({...state, details: false}))}/>
                }
                <Dialog open={open.cancel} onClose={() => setOpen(state => ({...state, cancel: false}))}>
                    <DialogTitle>Cancel Subscription</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Cancelling this subscription will attract a fee of 25% of your saved up amount.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpen(state => ({...state,  cancel: false}))}
                        >Abort</Button>

                        <LoadingButton
                        onClick={() => {
                            cancelSubscription(
                                {id: subscription?.id}, 
                                cancelSub, 
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

                <Dialog open={open.top_up} onClose={() => setOpen(state => ({...state, top_up: false}))}>
                    <DialogTitle>Top Up Your Subscription</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Kindly ensure you have a sufficient balance in your wallet
                        </DialogContentText>
                        <form className='mt-5'>
                            <FormInput
                                type="text" 
                                name="amount" 
                                label={ "Enter Amount"} 
                                Icon={NairaIcon}
                                formik={formik}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setOpen(state => ({...state,  cancel: false}))}
                        >Cancel</Button>

                        <LoadingButton
                        onClick={() => {
                            formik.setFieldValue("subscription_id", subscription?.id)
                            formik.setFieldValue("top_up_method", "wallet")
                            formik.submitForm()
                        }}
                        loading={toping}
                        color="secondary"
                        variant="contained"
                        >
                            Top up
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
                            <CardText>{ sliceString(subscription.installment.product?.name)}</CardText>
                            {/* <p className="font-semibold text-primary-dark-blue ">₦ {formatNumber(subscription.amount)}</p> */}
                            <small className="text-grey-200 text-xs sm:text-sm">Subscribed on  {moment(subscription.created_at).format("MMM Do YY")}</small>
                            <p className={`${ subscription.status } py-[1px] px-1 sm:px-2 rounded-sm uppercase text-[9px] sm:text-xs w-fit my-1`}>{ subscription.status }</p>
                            <ProgressBar width={getProgress().toString() + "%"}/>
                        </div>
                    </div>
                </div>
                <CardActions>
                    <Button 
                        color="secondary"
                        size={matches ? "large" : "medium"}  
                        onClick={() => setOpen(state => ({...state, top_up: true}))}
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