import { useDispatch, useSelector } from 'react-redux'
import { FPFormikCreateInstallment } from './service';
import { Button, Collapse, FormControl, FormControlLabel, Radio, RadioGroup, Tab, Tabs } from '@mui/material';
import ModelWrapper from '../../components/Models/ModelWrapper';
import { useCreateInstallmentMutation } from '../../redux/api/Installment';
import product1 from '../../asset/product1.png'
import { IInstallment, TCheckoutMethod } from '../../interface';
import { formatNumber } from '../../utils';
import { useState } from 'react';



function SelectInstallmentPlan(
    {open, close, installments, setCheckoutData}: 
    {
        open: boolean, 
        close: () => void | any, 
        installments: IInstallment[] | undefined
        setCheckoutData: React.Dispatch<React.SetStateAction<{
            method: TCheckoutMethod;
            installment_ids: string[]
        }>> 
    }
) {
    let [value, setValue] = useState<string>("")
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
                        <img src={product1} className="w-[60px] h-[60px] object-cover rounded" />
                        <div className='flex flex-col'>
                            <p className="text-sm text-grey-200 capitaspanze">Anti Blue Computer And Phone Glasses.</p>
                            <p className="font-medium text-primary-dark-blue">₦ 3,000</p>
                            <small className="text-[14px] block text-grey-700">x5</small>
                        </div>
                    {/* </div> */}
                </div>
            }>
                <div className="px-2 sm:px-5 pb-5">
                    <p className="text-grey-200 font-medium">Available Plans</p>
                    <small>Kindly select your preferred installment plan</small>

                    <div>
                        {
                            installments?.map((installment, idx) => (
                                <span 
                                    onClick={() => setValue(installment.uuid)}
                                    className={`border hover:border-primary-blue rounded-md py-2 w-full text-center cursor-pointer text-sm block my-2 ${value === installment.uuid ? "border-primary-blue" : "border-black"}`}>
                                    Pay N{formatNumber(`${installment.amount}`)} Per {installment.frequency}
                                </span>
                            ))
                        }
                        <div className='my-2'>
                            <Button  
                                variant='contained' 
                                color="secondary"
                                onClick={() => setCheckoutData(state => ({
                                    ...state,
                                    installment_ids: [...state.installment_ids, value]
                                }))}
                                fullWidth
                            >Submit</Button>
                        </div>
                    </div>
                </div>
            
        </ModelWrapper>
    )
}

export default SelectInstallmentPlan;