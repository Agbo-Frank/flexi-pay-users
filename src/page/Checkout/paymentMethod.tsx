import { Alert, Button, FormControlLabel, Radio, RadioGroup, Tab, Tabs } from "@mui/material"
import React, { useState } from "react";
import { IDetails, TCheckoutMethod } from "../../interface";
import { formatNumber } from "../../utils";
import SelectInstallmentPlan from "./SelectInstallmentPlan";
import { LazyLoadImage } from "react-lazy-load-image-component"



function CheckoutCard(
    {checkoutdetail, setCheckoutData}: 
    {checkoutdetail: Partial<IDetails>, setCheckoutData:React.Dispatch<React.SetStateAction<{
        method: TCheckoutMethod;
        installment_ids: string[]
        }>> 
    }
){
    let [open, setOpen] = useState(false)
    
    return(
        <>
        <SelectInstallmentPlan 
            open={open} 
            close={() => setOpen(false)}
            installments={checkoutdetail.product?.installments} 
            setCheckoutData={setCheckoutData}
            checkoutdetail={checkoutdetail}
        />
        <div className="w-full flex justify-between mb-2 p-1 shadow-sm hover:shadow rounded-lg border">
            <div className="flex w-9/12 gap-3">
                <LazyLoadImage src={checkoutdetail?.product?.product_images[0].image_link} className="w-[80px] h-[80px] object-cover rounded" />
                <p className="text-sm text-grey-200 capitalize">{checkoutdetail?.product?.name.slice(0, 40) + (checkoutdetail?.product?.name && checkoutdetail?.product?.name?.length > 40 ? "..." : "")}</p>
            </div>

            <div className='flex flex-col'>
                <p className="font-medium text-primary-dark-blue ml-auto">₦ {formatNumber(`${checkoutdetail?.price || checkoutdetail.unit_price}`)}</p>
                <small className="text-[14px] block ml-auto text-grey-700">x{checkoutdetail.quantity}</small>
                <Button
                    color="secondary"
                    onClick={() => setOpen(true)}
                    size="small">Select Plan</Button>
            </div>
        </div>
        </>
    )
}




function Options({type, setCheckoutData}: {type: number, setCheckoutData: React.Dispatch<React.SetStateAction<{
    method: TCheckoutMethod;
    installment_ids: string[]
}>>}){
    let [value, setValue] = useState<string>("")
    
    return(
        <div>
            <RadioGroup
                name="payment method"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    setCheckoutData(state => ({
                        ...state,
                        method: e.target.value
                    }))
                }}
            >
                {/* "install_mental_via_card", "install_mental_via_wallet", "directly_via_wallet", "directly_via_card" */}
                <div className="px-3">
                    <FormControlLabel 
                        value={type === 0 ? "directly_via_wallet" : "install_mental_via_wallet"} 
                        control={<Radio size="small" />} 
                        label="By Wallet" 
                    />
                </div>

                <div className="px-3">
                    {/* {
                        type === 0 ? */}
                        <FormControlLabel 
                            value={type === 0 ? "directly_via_card" : "install_mental_via_card"} 
                            control={<Radio size="small"/>} 
                            label="By Card" 
                        /> 
                        {/* : null */}
                    {/* } */}
                    {
                        type !== 0 && 
                        <div>
                            <Alert variant="standard" severity="info" className="w-fit">
                                Please note that product will be delivered on payment completion 
                            </Alert>
                        </div>
                    }
                </div>
            </RadioGroup>
        </div> 
    )
}



export function PaymentMethod(
    { setCheckoutData, checkoutdetails}: 
    { 
        setCheckoutData:React.Dispatch<React.SetStateAction<{
        method: TCheckoutMethod;
        installment_ids: string[]
        }>>, 
        checkoutdetails?: Partial<IDetails>[] 
    }
){
    const [value, setValue] = useState(0);
    // const matches = useMediaQuery('(min-width:600px)');
    return(
        <div className="h-full overflow-y-auto scrollbar relative">
            <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
                <Tab 
                    label="Instant Payment" 
                    sx={{textTransform: 'capitalize', fontSize: 14, alignItems: 'start'}}/>
                <Tab label="Instalmental Payment" sx={{textTransform: 'capitalize', fontSize: 14, alignItems: 'start'}}/>
            </Tabs>

            {
                value === 1 && 
                <div>
                    {
                        checkoutdetails?.map((checkoutdetail, idx) => (
                            <div className="max-w-[380px] space-y-3" key={idx}>
                                <CheckoutCard 
                                    checkoutdetail={checkoutdetail} 
                                    setCheckoutData={setCheckoutData} 
                                />
                            </div>
                        ))
                    }
                </div>
            }

            <Options type={value} setCheckoutData={setCheckoutData}/>
            
        </div>
    )
}

export default PaymentMethod