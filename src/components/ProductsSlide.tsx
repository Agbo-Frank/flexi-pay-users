import Slider from "react-slick";
import { useRef, useState } from 'react';

import { ProductCard } from ".";

export function ProductsSlide(){
    let slide: any = useRef()
    const settings = {
        infinite: false,
        draggable: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
    };
    let data = [1, 2, 3, 4, 5, 6, 7, 8]
    return(
        <div className="overflow-hidden rounded-2xl">
            <div className="flex justify-between bg-primary-orange-300 p-4">
                <p className="capitalize text-lg">similar products</p>
                <div className="flex space-x-2 items-center cursor-pointer text-primary-orange-200">
                    <p className="capitalize text-sm">View More</p>
                    <i className="font-bold text-xs fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className="bg-white p-4">
                <div className="relative rounded-md overflow-x-hidden">
                    <Slider ref={slide} {...settings}>
                        {
                            data.map(d => (
                                <div className="w-64 h-fit px-1" key={d}>
                                    <ProductCard />
                                </div>
                            ))
                        }
                    </Slider>

                    <div 
                        className={`absolute top-2/4 w-8 h-8  bg-black/50 rounded-full grid place-items-center cursor-pointer`}
                        onClick={() => slide.current.slickPrev()}>
                        <i className="text-white font-bold text-sm fa-solid fa-chevron-left"></i>
                    </div>
                    <div className={`absolute top-2/4 right-0 rounded-full bg-black/50 w-8 h-8 grid place-items-center cursor-pointer`}
                    onClick={() => slide.current.slickNext()}>
                        <i className="text-white font-bold text-sm fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsSlide;