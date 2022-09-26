import Product1 from '../asset/product1.png'
import product2 from '../asset/Product2.png'

import Slider from "react-slick";
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Grid, Skeleton, useMediaQuery } from '@mui/material';
import { IProduct } from '../interface';
import { formatNumber } from '../utils';
import { GreyLogo } from './icons';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function ProductCard({product}: {product: IProduct}){
    return(
        <Link to={'/product/' + product.uuid} className="block w-full bg-white rounded-lg h-fit p-2 space-y-4 shadow-sm hover:shadow hover:-translate-y-1 hover:z-30 my-2">
            <div className='w-full h-44 overflow-hidden rounded-lg'>
                <img src={product.product_images[0].image_link} className="w-full h-full object-cover" alt={product.name}/>
            </div>
            <div className='space-y-1'>
                <p className='truncate text-grey-1200 text-sm capitalize font-light'>{product.name}</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ {formatNumber(product.price)}</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </Link>
    )
}

export function ProductCardFaded({product}: {product: IProduct}){
    const navigate = useNavigate()
    return(
        <div onClick={()=>navigate(`/product/${product.uuid}`)} className="relative block w-full bg-white rounded-lg h-full shadow-sm hover:shadow hover:-translate-y-1 hover:z-30 my-2 mx-3">
            <div className='w-full h-fit overflow-hidden rounded-lg'>
                <img src={product.product_images[0].image_link} className="w-full h-[300px] object-cover" alt={product.name}/>
            </div>
            <div className=''>
            </div>
            <div className='h-[30%] bg-[#F4F4F4] mix-blend-lighten w-full absolute bottom-0 left-0 right-0 p-3 rounded-b-lg'>
                <p className='truncate text-[#222222] text-sm capitalize font-light'>{product.name}</p>
                <div className="flex items-center space-x-3">
                    <p className="text-primary-dark-blue font-medium text-md">₦ {formatNumber(product.price)}</p>
                    <s className="text-xs font-light text-grey-200">₦ 10,600</s>
                </div>
                <p className='text-xs text-primary-orange-200 font-medium'>Pay ₦ 120 / daily</p>
            </div>
        </div>
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
        <div className="w-[200px] bg-white shadow sm:w-[220px] rounded-lg h-fit p-2 space-y-4 my-2">
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

export function ProductSlide({images}: {images: string[]}){
    let slide: any = useRef()
    let [index, setIndex] = useState(0)
    const settings = {
        infinite: false,
        speed: 800,
        fade: true,
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
                        images?.map((image, idx)=> (
                            <div className='w-full h-[400px] rounded overflow-hidden' key={idx}>
                                <div className='w-full h-full'>
                                    <div className='w-full h-full'><img src={image} className="object-cover w-full h-full"/></div>
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
                {
                    images?.length > 0 ?
                    <div className={`absolute top-2/4 right-0 rounded-full ${index === images?.length - 1 ? 'hidden' : ""} bg-black/50 w-8 h-8 grid place-items-center cursor-pointer`}
                    onClick={() => {
                        if(index < images?.length - 1){
                            setIndex(state => state + 1)
                        }
                        slide.current?.slickNext()
                    }}>
                        <i className="text-white font-bold text-sm fa-solid fa-chevron-right"></i>
                    </div> : <></>
                }
            </div>
            <div className='w-full h-20 whitespace-nowrap scrollbar-hidden space-x-3 overflow-x-auto overflow-y-hidden'>
                {
                    images?.map((image, i) => (
                        <div className={`relative inline-block group w-[70px] h-[70px] hover:border-2 hover:border-primary-orange-200 rounded-lg ${index === i && 'border-2 border-primary-orange-200'} overflow-hidden cursor-pointer`}
                        onClick={() => {
                            setIndex(i)
                            slide.current.slickGoTo(i)
                        }}>
                            <div className={`absolute block ${index !== i && 'hidden' } group-hover:block w-full h-full bg-white/75`}></div>
                            <img src={image}  className="object-cover w-full h-full"/>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="sm:hidden flex whitespace-nowrap overflow-x-auto space-x-2 bordder">
            {
                images?.map((image, imgIdx) => (
                    <div className='w-11/12 h-[180px] sm:h-auto flex-shrink-0'>
                        <img src={image} className="object-cover w-[98%] h-full rounded"/>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export function ProductsSlide({products, loading, title, link}: {products: IProduct[] | undefined, loading: boolean, title: string, link?: string}){
    let matches = useMediaQuery("(min-width:600px)")
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
        <div className="px-2 sm:overflow-hidden rounded-2xl h-[400px]">
            <div className="flex justify-between items-center bg-primary-orange-300 p-2 sm:px-4 sm:py-2">
                <p className="Capitalize font-medium text-sm  sm:text-lg">{title}</p>
                <Button 
                    onClick={() => navigate(`${link}`)} 
                    color="secondary"
                    endIcon={<i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>}
                    className="text-xs">
                        View More
                </Button>
            </div>
            {
                loading ?
                <div className='flex space-x-2 whitespace-nowrap overflow-x-auto scrollbar-hidden'> 
                    {
                        data.map(d => (
                            <ProductCardSkeleton />
                        ))
                    }
                </div>:
                <div className="bg-white py-2 sm:p-4 h-full">
                    <div className="relative h-full rounded-md overflow-x-hidden hidden sm:block">
                        <Slider ref={slide} {...settings} className="h-full">
                            {
                                products?.map((product, idx) => (
                                    <div className="w-64 h-fit px-1">
                                        {/* <ProductCardFaded product={product} key={idx}/> */}
                                        <ProductCard product={product} key={idx}/>
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
                    <div className='flex sm:hidden whitespace-nowrap overflow-x-auto overflow-y-hidden h-full'>
                        {
                            products?.map((product, idx) => (
                                <div className="w-[180px] h-fit pr-3">
                                    <ProductCard product={product} key={idx}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export function ProductsSlideFaded({products, loading, title, link}: {products: IProduct[] | undefined, loading: boolean, title: string, link?: string}){
    let matches = useMediaQuery("(min-width:600px)")
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
        <div className="px-2 sm:overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-primary-orange-300 p-2 sm:px-4 sm:py-2">
                <p className="Capitalize font-medium text-sm  sm:text-lg">{title}</p>
                <Button 
                    onClick={() => navigate(`${link}`)} 
                    color="secondary"
                    endIcon={<i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>}
                    className="text-xs">
                        View More
                </Button>
            </div>
            {
                loading ?
                <div className='flex space-x-2 whitespace-nowrap overflow-x-auto scrollbar-hidden'> 
                    {
                        data.map(d => (
                            <ProductCardSkeleton />
                        ))
                    }
                </div>:
                <div className="bg-white py-2 sm:p-4">
                    <div className="relative rounded-md overflow-x-hidden hidden sm:block">
                        <Slider ref={slide} {...settings}>
                            {
                                products?.map((product, idx) => (
                                    <div className="w-64 h-fit px-1">
                                        <ProductCard product={product} key={idx}/>
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
                    <div className='flex sm:hidden whitespace-nowrap overflow-x-auto overflow-y-hidden'>
                        {
                            products?.map((product, idx) => (
                                <div className="w-[180px] h-fit pr-3">
                                    <ProductCard product={product} key={idx}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}



export function ProductsBallSlide({products, loading, title, link}: {products: any, loading: boolean, title?: string, link?: string}){
    let matches = useMediaQuery("(min-width:600px)")
    let slide: any = useRef()
    const settings = {
        infinite: false,
        draggable: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 2,
    };
    let data = [1, 2, 3, 4, 5]

    return(
        <div className="px-2 sm:overflow-hidden rounded-2xl">
            {
                loading ?
                <div className='flex space-x-2 whitespace-nowrap overflow-x-auto scrollbar-hidden'> 
                    {
                        data.map(d => (
                            <ProductCardSkeleton />
                        ))
                    }
                </div>:
                <div className="bg-white py-2 sm:p-4">
                    <div className="relative rounded-md overflow-x-hidden hidden sm:block">
                        <Slider ref={slide} {...settings}>
                            {
                                products?.map((val: any) => (
                                    <div className="w-64 h-fit p-3" key={val.id}>
                                        <div className=' rounded-[100px] border-[10px] border-[#E8E5FF]'>
                                            <img alt="flexipay" src={val.img} className="w-full h-full" />
                                        </div>
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
                    <div className='flex sm:hidden whitespace-nowrap overflow-x-auto overflow-y-hidden'>
                        {
                            products?.map((val: any) => (
                                <div className="w-64 h-fit p-3" key={val.id}>
                                    <div className=' rounded-[100px] border-[10px] border-[#E8E5FF]'>
                                        <img alt="flexipay" src={val.img} className="w-full h-full" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}


export function ProductCategory({products, loading, title, link, grid}: {products: any, loading: boolean, title?: string, link?: string, grid?: any}){
    
    let data = [1, 2, 3, 4, 5]

    const navigate = useNavigate()
    return(
        <div className="px-2 sm:overflow-hidden rounded-2xl">
            <div className="flex justify-between items-center bg-primary-orange-300 p-2 sm:px-4 sm:py-2">
                <p className="Capitalize font-medium text-sm  sm:text-lg">{title}</p>
                {link && (
                    <Button 
                        onClick={() => navigate(`${link}`)} 
                        color="secondary"
                        endIcon={<i className="fa-solid fa-chevron-right text-[8px] sm:text-[10px]"></i>}
                        className="text-xs">
                            View More
                    </Button>
                )}
            </div>
            {
                loading ?
                <div className='flex space-x-2 whitespace-nowrap overflow-x-auto scrollbar-hidden'> 
                    {
                        data.map(d => (
                            <ProductCardSkeleton />
                        ))
                    }
                </div>:
                <div className="bg-white py-2 sm:p-4">
                    <div>
                        <Grid container>
                            {
                                products?.map((val: any) => (
                                    <Grid item sm={grid?.sm || 6} md={grid?.md || 3} lg={grid?.lg || 2} className="p-3" key={val.id}>
                                        <img alt='flexipay' src={val.img} className="w-full h-full rounded-lg" />
                                    </Grid>
                                ))
                            }
                        </Grid>
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
