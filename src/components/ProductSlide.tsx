import Product1 from '../asset/product1.png'

import Slider from "react-slick";
import { useRef, useState } from 'react';

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

export default ProductSlide