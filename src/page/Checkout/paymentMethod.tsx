import { Button, Collapse, FormControl, FormControlLabel, Radio, RadioGroup, Tab, Tabs } from "@mui/material"
import React, { useState } from "react";
import { EditSqaureIcon } from "../../components/icons";
import { TCheckoutMethod } from "../../interface";




function Options({type, setCheckoutMethod}: {type: number, setCheckoutMethod: React.Dispatch<React.SetStateAction<TCheckoutMethod>>}){
    let [value, setValue] = useState<string>("")
    
    return(
        <div>
            <RadioGroup
                name="payment method"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    setCheckoutMethod(e.target.value)
                }}
            >
                {/* "install_mental_via_card", "install_mental_via_wallet", "directly_via_wallet", "directly_via_card" */}
            <div className="px-3">
                <FormControlLabel value={type === 0 ? "directly_via_wallet" : "install_mental_via_wallet"} control={<Radio size="small" />} label="By Wallet" />
                {/* <Collapse in={ /wallet/i.test(value)}>
                    <div className="w-10/12 mx-auto h-[150px] bg-[#F9F8FF] flex justify-center items-center rounded">
                        <div className="w-fit flex flex-col text-center">
                            <span className="text-[#545362] text-lg font-medium">Balance</span>
                            <span className="text-[22px] text-primary-dark-blue font-medium">40,000</span>
                            <Button
                            color="secondary"
                            startIcon={<EditSqaureIcon color="#FF5000" size="15"/>}
                            >
                                fund wallet
                            </Button>
                        </div>
                    </div>
                </Collapse> */}
            </div>

            <div className="px-3">
                <FormControlLabel value={type === 0 ? "directly_via_card" : "install_mental_via_card"} control={<Radio size="small"/>} label="By Card" />
                {/* <Collapse in={/card/i.test(value)}>
                    <div className="w-10/12 mx-auto h-[150px] bg-[#F9F8FF] flex justify-center items-center rounded">
                        <div className="w-fit flex flex-col text-center">
                            <span className="text-[#545362] text-lg font-medium">Balance</span>
                            <span className="text-[22px] text-primary-dark-blue font-medium">40,000</span>
                            <Button
                            color="secondary"
                            startIcon={<EditSqaureIcon color="#FF5000" size="15"/>}
                            >
                                fund wallet
                            </Button>
                        </div>
                    </div>
                </Collapse> */}
            </div>
                
            </RadioGroup>
        </div> 
    )
}



export function PaymentMethod({ setCheckoutMethod}: {setCheckoutMethod: React.Dispatch<React.SetStateAction<TCheckoutMethod>>}){
    const [value, setValue] = useState(0);
    // const matches = useMediaQuery('(min-width:600px)');
    return(
        <div className="h-full overflow-y-auto scrollbar relative">
            <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
                <Tab 
                    label="Instant Payment" 
                    sx={{textTransform: 'capitalize', fontSize: 14, width: '50%', alignItems: 'start'}}/>
                <Tab label="Installmental Payment" sx={{textTransform: 'capitalize', fontSize: 14, width: '50%', alignItems: 'start'}}/>
            </Tabs>

            <Options type={value} setCheckoutMethod={setCheckoutMethod}/>
        </div>
    )
}

export default PaymentMethod