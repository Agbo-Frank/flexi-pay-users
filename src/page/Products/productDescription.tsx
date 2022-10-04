import { IProduct } from "../../interface"
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { memo } from "react";
import React from 'react' ;
import { Parser, ProcessNodeDefinitions } from 'html-to-react' ;

function DataDisplay({header, body}: {header: string, body?: string}){
    const deltaOps =  [
        {insert: body}
    ];
    
    const cfg = {};
    const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

    const html = converter.convert(); 
    const processNodeDefinitions = new ProcessNodeDefinitions(React);
    console.log(html)

    return(
        <div className="mx-2">
            <div className="border py-2 px-3 font-medium text-lg capitalize">{header}</div>
            <div className="border border-t-0 py-2 px-3">{html || "Loading..."}</div>
        </div>
    )
}

export function ProductDescription({product}: {product: IProduct | undefined}){
    const deltaOps =  [
        {insert: product?.description}
    ];
    
    const cfg = {
        encodeHtml: false
    };
    const converter = new QuillDeltaToHtmlConverter(deltaOps, cfg);

    const html = converter.convert(); 
    console.log(html)
    return(
        <div className="space-y-4">
            <DataDisplay 
                header="product description"
                body={product?.description}
            />
            <div className="flex justify-between gap-2">
                <div className="w-1/2">
                    <DataDisplay 
                        header="key features"
                        body={product?.description}
                    />
                </div>
                <div className="w-1/2">
                    <DataDisplay 
                        header="specification"
                        body={product?.description}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(ProductDescription)