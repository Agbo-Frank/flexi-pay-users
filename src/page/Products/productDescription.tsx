import { IProduct } from "../../interface"
import { memo } from "react";
import React from 'react' ;
import { Parser, ProcessNodeDefinitions } from 'html-to-react' ;

function DataDisplay({header, body}: {header: string, body?: string}){
    const processNodeDefinitions = new ProcessNodeDefinitions(React);
    const processingInstructions = [
        {
            replaceChildren: true,
            shouldProcessNode: function (node: any) {
                return node.parent && node.parent.name && node.parent.name === 'h1';
            },
            processNode: function (node: any, children: any) {
                return node.data.toUpperCase();
            }
        },
        {
          // Anything else
          shouldProcessNode: function (node: any) {
            return true;
          },
          processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    
    const htmlToReactParser = new Parser();
    const html = htmlToReactParser.parseWithInstructions(body, () => true, processingInstructions);

    return (
        <div className="mx-2">
            <div className="border py-2 px-3 font-medium text-lg capitalize">{header}</div>
            <div className="border border-t-0 py-2 px-3 whitespace-pre-wrap overflow-x-hidden">{html|| "Loading..."}</div>
        </div>
    )
}

function SpecificationData({product, property, display}: {product: IProduct, property: keyof IProduct, display?: string}){
    return(
        <>
            {
                product[property] ?
                <li>
                    <>
                        <span className="capitalize font-medium">{ display || property.replace(/_/g, ' ') }: </span> 
                        { product[property] }
                    </>
                </li>:
                null
            }
        </>
    )
}

export function ProductDescription({product}: {product: IProduct | undefined}){
    return(
        <div className="space-y-4">
            <DataDisplay 
                header="product description"
                body={product?.description}
            />
            <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="sm:w-1/2">
                    <DataDisplay 
                        header="key features"
                        body={product?.key_features}
                    />
                </div>
                <div className="sm:w-1/2">
                    {
                        product &&
                        <div className="mx-2 h-full">
                            <div className="border py-2 px-3 font-medium text-lg capitalize">specification</div>
                            <div className="border border-t-0 py-2 px-3 whitespace-pre-wrap h-auto">
                                <ul className="space-y-2">
                                    <SpecificationData product={product} property="sku" display="SKU"/>
                                    <SpecificationData product={product} property="product_code"/>
                                    <SpecificationData product={product} property="material"/>
                                    <SpecificationData product={product} property="weight" display="weight (kg)"/>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(ProductDescription)