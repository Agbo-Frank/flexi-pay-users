import { Button } from "@mui/material";
import { useEffect, useState, memo } from "react";
import { WrapperHeader } from "../../components";
import { IVariations } from "../../interface";


interface IVariants {
    price?: string;
    id: string | null;
    discounted_price?: string;
    quantity?: string
}

function AttributeDisplay(
    {attributes, setVariations, variations}: 
    {
        attributes:any[], 
        variations: any,
        setVariations: React.Dispatch<React.SetStateAction<{
            price?: string | undefined;
            discounted_price?: string | undefined;
            quantity?: string | undefined;
            id: string | null
        }>>
    }){
    const [displayAttributes, setDisplayAttributes] = useState<any>(null)
    useEffect(() => {
        const attributesObj: any = {}
        for(let i = 0; i < attributes.length; i++){
            if(!attributesObj.hasOwnProperty(attributes[i].code)){
                attributesObj[attributes[i].code]= {name: attributes[i].name, values: []}
            }
            attributesObj[attributes[i].code]['values'].push(attributes[i])
        }

        setDisplayAttributes((state: any) => ({...attributesObj}))
    }, [setDisplayAttributes])

    function updateProperties(attribute: IVariations){
        setVariations({
            price: attribute.price,
            discounted_price: attribute.discounted_price,
            id: attribute.id,
        })
    }
    return(
        <>
            {
                displayAttributes &&
                Object.entries(displayAttributes)?.map((attribute: any, idx: any) => (
                    <div className={"flex flex-col space-y-1 mt-1 "}>
                        <span className="capitalize">{attribute[1]?.name}</span>
                        <div className="p-2 rounded-sm my-1 md:flex space-x-2 flex-wrap">
                            {
                                attribute[1]?.values?.map((value: any, idx: any) => (
                                    <Button 
                                        key={idx} 
                                        variant="outlined" 
                                        color="secondary" 
                                        className={value.id !== variations.id ? "opacity-30 hover:opacity-100" : "" + " hover:opacity-100 "}
                                        onClick={() => updateProperties(value)}
                                    >
                                        <span className="text-sm">{value?.value?.toUpperCase()}</span>
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default AttributeDisplay

