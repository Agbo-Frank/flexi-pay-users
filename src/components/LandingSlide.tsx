import Slider from "react-slick"
import { useRef, useState } from "react";
import slide1 from '../asset/slide1.png'
import slide2 from '../asset/slide2.png'
import slide3 from '../asset/slide3.png'
import slide4 from '../asset/slide4.png'
import category1 from '../asset/categories1.png'
import category2 from '../asset/categories2.png'
import category3 from '../asset/categories3.png'
import category4 from '../asset/categories4.png'
// import category5 from '../asset/categories5.png'
// import category6 from '../asset/categories6.png'
import category7 from '../asset/categories7.png'
import category8 from '../asset/categories8.png'
import category9 from '../asset/categories9.png'

import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom";

export function LandingSlide(){
    let slide: any = useRef()
    let [index, setIndex] = useState(0)
    const settings = {
        infinite: true,
        fade: true,
        speed: 800,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        afterChange: (i: number) => setIndex(i),
        responsive: [
            {
              breakpoint: 800,
              settings: {
                fade: false,
                slidesToShow: 1.01,
              }
            },
        ]    
    };
    let imgs = [slide1, slide2, slide3, slide4]
    return(
        <>
            <div className="hidden sm:block w-full relative group">
                <Slider ref={slide} {...settings}>
                    {
                        imgs.map((img, imgIdx) => (
                            <div className='w-full' key={imgIdx}>
                                <div className='w-full rounded-none sm:rounded-xl overflow-hidden h-[180px] sm:h-auto'>
                                    <LazyLoadImage src={img} className="object-cover w-[98%] h-full rounded-xl"/>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                <ul className="absolute bottom-0 -translate-y-6 left-2/4 hidden sm:flex space-x-2">
                    {
                        imgs.map((dot, dotIdx) => (
                            <li className="w-3 h-3 rounded-full bg-white cursor-pointer p-xs" onClick={() => {
                                    setIndex(dotIdx)
                                    slide.current.slickGoTo(dotIdx)
                                }} key={dotIdx}>
                                {index === dotIdx && <div className="w-full h-full bg-primary-orange-200 rounded-full"></div>}
                            </li>
                        ))
                    }
                </ul>

                <div 
                    className={` absolute top-2/4 w-8 h-8 ${index === 0 && 'hidden'}  bg-black/50 rounded-full place-items-center cursor-pointer sm:group-hover:grid hidden ml-3`}
                    onClick={() => {
                        if(index > 0){
                            setIndex(state => state - 1)
                        }
                        slide.current?.slickPrev()
                    }}>
                    <i className="text-white font-bold text-sm fa-solid fa-chevron-left"></i>
                </div>
                <div className={`absolute top-2/4 right-0 rounded-full ${index === imgs.length - 1 && 'hidden'} bg-black/50 w-8 h-8 place-items-center cursor-pointer sm:group-hover:grid hidden mr-3`}
                onClick={() => {
                    if(index < imgs.length - 1){
                        setIndex(state => state + 1)
                    }
                    slide.current?.slickNext()
                }}>
                    <i className="text-white font-bold text-sm fa-solid fa-chevron-right"></i>
                </div>
            </div>
            <div className="sm:hidden flex whitespace-nowrap overflow-x-auto space-x-2">
                {
                    imgs.map((img, imgIdx) => (
                        <div className='w-11/12 h-[180px] sm:h-auto flex-shrink-0'>
                            <LazyLoadImage src={img} className="object-cover w-[98%] h-full rounded-xl"/>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export function CategorySlide({ categories }: { categories: {id: number, img: any, link: string, name: string}[]}){
    let slide: any = useRef()
    let [index, setIndex] = useState(0)
    const settings = {
        infinite: false,
        speed: 800,
        slidesToShow: 8,
        slidesToScroll: 2,
    };
    // let categories = [category1, category2, category3, category4, category7, category8, category9, category4, category7, category8, category9]
    return(
        <>
            <div className="hidden sm:block w-full relative group">
                <Slider ref={slide} {...settings}>
                    {
                        categories.map((category, categoryIdx) => (
                            <Link to={category.link} className='w-full h-36 p-2 flex items-center' key={category.id}>
                                <div className="aspect-square h-full border-4 rounded-full border-grey-100 p-2">
                                    <div className='overflow-hidden w-full rounded-full'>
                                        <LazyLoadImage src={category.img} className="object-cover w-full h-full"/>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Slider>

                <div 
                    className={`absolute top-2/4 w-8 h-8 ${index === 0 && 'hidden'}  bg-black/50 rounded-full place-items-center cursor-pointer hidden sm:grid ml-2`}
                    onClick={() => {
                        if(index > 0){
                            setIndex(state => state - 1)
                        }
                        slide.current?.slickPrev()
                    }}>
                        <i className="text-white font-bold text-sm fa-solid fa-chevron-left"></i>
                </div>
                <div 
                    className={`absolute top-2/4 right-0 rounded-full ${index === categories.length - 1 && 'hidden'} bg-black/50 w-8 h-8 place-items-center cursor-pointer hidden sm:grid mr-2`}
                    onClick={() => {
                        if(index < categories.length - 1){
                            setIndex(state => state + 1)
                        }
                        slide.current?.slickNext()
                    }}>
                        <i className="text-white font-bold text-sm fa-solid fa-chevron-right"></i>
                </div>
            </div>

            <div className="flex sm:hidden whitespace-nowrap overflow-x-auto">
                {
                    categories.map((category, categoryIdx) => (
                        <Link to={category.link} className='w-fit h-fit py-2 px-1 flex items-center' key={category.id}>
                            <div className="w-[80px] h-[80px] border-4 rounded-full border-grey-100" >
                                <LazyLoadImage src={category.img} className="object-cover w-full h-full rounded-full"/>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}