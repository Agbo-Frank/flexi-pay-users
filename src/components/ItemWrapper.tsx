import React from 'react';

interface IWrapperProps{
    img: any,
    upper: JSX.Element,
    lower: JSX.Element
}

function ItemWrapper ({ upper, lower, img }: IWrapperProps){
    return (
        <div className="flex justify-between rounded-2xl w-full shadow hover:shadow-lg border hover:border-0 border-solid border-grey-100 items-center px-6 py-6 mb-7">
            <div className="flex space-x-4 items-stretch">
                <img src={img} alt="" />
                <div>
                    {upper}
                </div>
            </div>
            <div className="flex flex-col space-y-3">
                {lower}
            </div>
        </div>
    )
}

export default ItemWrapper