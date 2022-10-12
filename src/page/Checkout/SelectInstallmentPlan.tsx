import { useDispatch, useSelector } from 'react-redux'
import { FPFormikCreateInstallment } from './service';
import { Alert, AlertColor, Button, Collapse } from '@mui/material';
import ModelWrapper from '../../components/Models/ModelWrapper';
import { useCreateInstallmentMutation } from '../../redux/api/Installment';
import product1 from '../../asset/product1.png'
import { IDetails, IInstallment, TCheckoutMethod } from '../../interface';
import { formatNumber, sliceString } from '../../utils';
import { useState } from 'react';
import { Empty } from '../../components';
import { SubscriptionIcon } from '../../components/icons'
import { toggleSnackBar } from '../../redux/slice/modal';



function SelectInstallmentPlan(
    {open, close, installments, setCheckoutData, checkoutdetail}: 
    {
        open: boolean, 
        close: () => void | any, 
        installments: IInstallment[] | undefined,
        checkoutdetail: Partial<IDetails>,
        setCheckoutData: React.Dispatch<React.SetStateAction<{
            method: TCheckoutMethod;
            installment_ids: string[]
        }>> 
    }
) {
    let [value, setValue] = useState<string>("")
    let [response, setResponse] = useState<{
        message: string;
        severity: AlertColor;
        open: boolean
    }>({
        message: "",
        severity: "error",
        open: false
    })
    let [createInstallment, { isLoading }] = useCreateInstallmentMutation()
    let dispatch = useDispatch()

    const formik = FPFormikCreateInstallment(createInstallment)

    return(
        <ModelWrapper 
            isOpen={open} 
            closeModal={close}
            size="medium"
            components={
                <div className="w-full flex p-1 gap-3 rounded-lg">
                    {/* <div className="flex w-9/12 gap-3"> */}
                        <img src={checkoutdetail.product?.product_images[0].image_link} className="w-[60px] h-[60px] object-cover rounded" />
                        <div className='flex flex-col'>
                            <p className="text-sm text-grey-200 capitalize">{sliceString(checkoutdetail.product?.name)}</p>
                            <p className="font-medium text-primary-dark-blue">₦ {formatNumber(checkoutdetail.unit_price || 0)}</p>
                            <small className="text-[14px] block text-grey-700">x{checkoutdetail.quantity}</small>
                        </div>
                    {/* </div> */}
                </div>
            }>
                <div className="px-2 sm:px-5 pb-5">
                    <p className="text-grey-200 font-medium">Available Plans</p>
                    <small>Kindly select your preferred installment plan</small>
                    <Collapse in={response.open} className='w-full'>
                        <Alert className='w-full' severity={response.severity}>{response.message}</Alert>
                    </Collapse>
                    {
                        installments?.length  === 0 ?
                        <Empty 
                        Icon={SubscriptionIcon}
                        title='No Installment plan'
                        message='No Installment Plan, Kindly select the instant method'
                        size='small'
                        button={
                            <Button
                            color="secondary"
                            variant="contained"
                            onClick={close}
                            >Close</Button>
                        }
                        />:
                        <div>
                            {
                                installments?.map((installment, idx) => (
                                    <span 
                                        onClick={() => setValue(installment.uuid)}
                                        className={`border hover:border-primary-blue rounded-md py-2 w-full text-center cursor-pointer text-sm block my-2 ${value === installment.uuid ? "border-primary-blue border-2" : "border-black"}`}>
                                        Pay N{formatNumber(`${installment.amount}`)} Per {installment.frequency}
                                    </span>
                                ))
                            }
                            <div className='my-2'>
                                <Button  
                                    variant='contained' 
                                    color="secondary"
                                    onClick={() => {
                                        if(value === ""){
                                            setResponse({
                                                open: true,
                                                message: "Please select a plan method",
                                                severity: 'error'
                                            })
                                        }
                                        else{
                                            setCheckoutData(state => {
                                                if(state.installment_ids.includes(value)){
                                                    return state
                                                }
                                                else{
                                                    return {
                                                        ...state,
                                                        installment_ids: [...state.installment_ids, value]
                                                    }
                                                }
                                            })
                                            if(response.open){
                                                setResponse({
                                                    open: false,
                                                    message: "",
                                                    severity: 'error'
                                                })
                                            }
                                            close()
                                        }
                                    }}
                                    fullWidth
                                >Submit</Button>
                            </div>
                        </div>
                    }
                </div>
            
        </ModelWrapper>
    )
}

export default SelectInstallmentPlan;