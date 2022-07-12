import Product1 from '../asset/product1.png'
import product2 from '../asset/Product2.png'

import Slider from "react-slick";
import { useRef, useState } from 'react';

export function ProductCard(){
    return(
        <div className="w-full bg-white rounded-lg h-fit p-2 space-y-4 hover:shadow-xl hover:-translate-y-1 hover:z-30 my-2">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
                <img src={product2} className="w-full h-full object-cover"/>
            </div>
            <div className='space-y-1'>
                <p className='truncate text-grey-1200 text-sm capitalize font-light'>Anti Blue Computer & Phone Glasses....</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ 4,600</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </div>
    )
}

export function ProductSlide(){
    let slide: any = useRef()
    let [index, setIndex] = useState(0)
    const settings = {
        infinite: false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let data = [1, 2, 3]
    return(
        <div className="w-full flex flex-col space-y-3">
            <div className='relative rounded-md overflow-hidden'>
                <Slider ref={slide} {...settings}>
                    {
                        data.map(d => (
                            <div className='w-full' key={d}>
                                <div className='w-full pr-4'>
                                    <div className='w-full'><img src={Product1} className="object-cover w-full h-full"/></div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                <div 
                    className={`absolute top-2/4 w-8 h-8 ${index === 0 && 'hidden'}  bg-black/50 rounded-full grid place-items-center cursor-pointer`}
                    onClick={() => {
                        if(index > 0){
                            setIndex(state => state - 1)
                        }
                        slide.current?.slickPrev()
                    }}>
                    <i className="text-white font-bold text-sm fa-solid fa-chevron-left"></i>
                </div>
                <div className={`absolute top-2/4 right-0 rounded-full ${index === data.length - 1 && 'hidden'} bg-black/50 w-8 h-8 grid place-items-center cursor-pointer`}
                onClick={() => {
                    if(index < data.length - 1){
                        setIndex(state => state + 1)
                    }
                    slide.current?.slickNext()
                }}>
                    <i className="text-white font-bold text-sm fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className='w-full h-20 whitespace-nowrap scrollbar-hidden space-x-3 overflow-x-auto overflow-y-hidden'>
                {
                    data.map((d, i) => (
                        <div className={`relative inline-block group w-20 h-full hover:border-2 hover:border-primary-orange-200 rounded-lg ${index === i && 'border-2 border-primary-orange-200'} overflow-hidden cursor-pointer`}
                        onClick={() => {
                            setIndex(i)
                            slide.current.slickGoTo(i)
                        }}>
                            <div className={`absolute block ${index !== i && 'hidden' } group-hover:block w-full h-full bg-white/75`}></div>
                            <img src={Product1}  className="object-cover w-full h-full"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

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
