import Product1 from '../asset/product1.png'
import product2 from '../asset/Product2.png'

import Slider from "react-slick";
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@mui/material';
import { IProduct } from '../interface';
import { formatNumber } from '../utils';
import { GreyLogo } from './icons';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function ProductCard({product}: {product: IProduct}){
    return(
        <Link to={'/product/' + product.slug} className="w-full bg-white rounded-lg h-fit p-2 space-y-4 hover:shadow-xl hover:-translate-y-1 hover:z-30 my-2">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
                <img src={product.product_images[0].image_link} className="w-full h-full object-cover" alt={product.name}/>
            </div>
            <div className='space-y-1'>
                <p className='truncate text-grey-1200 text-sm capitalize font-light'>{product.description}</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ {formatNumber(product.price)}</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </Link>
    )
}

export function ProductCardDummy(){
    return(
        <Link to={'/product/1'} className="w-full bg-white rounded-lg h-fit p-2 space-y-4 hover:shadow-xl hover:-translate-y-1 hover:z-30 my-2">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
                <img src={product2} className="w-full h-full object-cover" alt="dummy product image"/>
            </div>
            <div className='space-y-1'>
                <p className='truncate text-grey-1200 text-sm capitalize font-light'>Anti Blue Computer & Phone Glasses....</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ 4,600</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </Link>
    )
}

export function ProductCardSkeleton(){
    return(
        <div className="w-[220px] rounded-lg h-fit p-2 space-y-4 my-2">
            <div className='relative'>
                <Skeleton variant='rounded' width={'100%'} height={150} />
                <div className='absolute top-0 right-1/2 translate-x-1/2 translate-y-1/2'>
                    <GreyLogo />
                </div>
            </div>
            <div className='space-y-1'>
                <Skeleton width={'100%'} sx={{fontSize: 14}} />
                <div className="flex items-center space-x-3 w-full">
                    <Skeleton width={'50%'} sx={{fontSize: 18}} />
                    <Skeleton width={100} sx={{fontSize: 10}} />
                </div>
                <Skeleton width={'70%'} sx={{fontSize: 12}} />
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
        <>
        <div className="hidden sm:flex w-full flex-col space-y-3">
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
        <div className="sm:hidden flex whitespace-nowrap overflow-x-auto space-x-2 bordder">
            {
                data.map((img, imgIdx) => (
                    <div className='w-11/12 h-[180px] sm:h-auto flex-shrink-0'>
                        <img src={Product1} className="object-cover w-[98%] h-full rounded"/>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export function ProductsSlide({products, loading}: {products: IProduct[] | undefined, loading: boolean}){
    let slide: any = useRef()
    const settings = {
        infinite: false,
        draggable: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
    };
    let data = [1, 2, 3, 4, 5]

    const navigate = useNavigate()
    return(
        <div className="sm:overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-primary-orange-300 p-2 sm:p-4">
                <p className="uppercase font-medium text-sm  sm:text-lg">similar products</p>
                <Button 
                    onClick={() => navigate('/products')} 
                    color="secondary"
                    endIcon={<i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>}
                    className="text-xs">
                        View More
                </Button>
            </div>
            {
                loading ?
                <div className='grid grid-cols-5'> 
                    {
                        data.map(d => (
                            <ProductCardSkeleton />
                        ))
                    }
                </div>:
                <div className="bg-white py-2 sm:p-4">
                    <div className="relative rounded-md overflow-x-hidden">
                        <Slider ref={slide} {...settings}>
                            {
                                products?.map(product => (
                                    <div className="w-64 h-fit px-1">
                                        <ProductCard product={product}/>
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
            }
        </div>
    )
}

export function ProductsSlideDummy(){
    let slide: any = useRef()
    const settings = {
        infinite: false,
        draggable: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
    };
    let data = [1, 2, 3, 4, 5]

    const navigate = useNavigate()
    return(
        <div className="sm:overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-primary-orange-300 p-2 sm:p-4">
                <p className="uppercase font-medium text-sm  sm:text-lg">similar products</p>
                <Button 
                    onClick={() => navigate('/products')} 
                    color="secondary"
                    endIcon={<i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>}
                    className="text-xs">
                        View More
                </Button>
            </div>
            <div className="bg-white py-2 sm:p-4 h-fit">
                <div className="relative rounded-md sm:overflow-x-hidden hidden sm:block">
                    <Slider ref={slide} {...settings}>
                        <div className="w-64 h-fit px-1">
                            <ProductCardDummy />
                        </div>
                        <div className="w-64 h-fit px-1">
                            <ProductCardDummy />
                        </div>
                        <div className="w-64 h-fit px-1">
                            <ProductCardDummy />
                        </div>
                        <div className="w-64 h-fit px-1">
                            <ProductCardDummy />
                        </div>
                        <div className="w-64 h-fit px-1">
                            <ProductCardDummy />
                        </div>
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
                <div className='flex whitespace-nowrap overflow-x-auto'>
                    <div className="w-[180px] h-fit pr-3">
                        <ProductCardDummy />
                    </div>
                    <div className="w-[180px] h-fit pr-3">
                        <ProductCardDummy />
                    </div>
                    <div className="w-[180px] h-fit pr-3">
                        <ProductCardDummy />
                    </div>
                    <div className="w-[180px] h-fit pr-3">
                        <ProductCardDummy />
                    </div>
                    <div className="w-[180px] h-fit pr-3">
                        <ProductCardDummy />
                    </div>
                </div>
            </div>
        </div>
    )
}
