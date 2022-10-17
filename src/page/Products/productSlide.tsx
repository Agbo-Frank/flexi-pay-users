import { Dialog } from "@mui/material";
import { useRef, useState } from "react";
import Slider from "react-slick";

export function ProductSlide({images}: {images: string[]}){
    let slide: any = useRef()
    const [open, setOpen] = useState({
        image: "",
        open: false
    })
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
        {
            open.open &&
            <Dialog
                open={open.open}
                onClose={() => setOpen(state => ({...state, open: false, image: ""}))}>
                    <img src={open.image}></img>
            </Dialog>
        }
        <div className="hidden sm:flex w-full flex-col space-y-3">
            <div className='relative rounded-md overflow-hidden'>
                <Slider ref={slide} {...settings}>
                    {
                        images?.map((image, idx)=> (
                            <div className='w-full h-[400px] rounded overflow-hidden' key={idx}>
                                <div className='w-full h-full'>
                                    <div className='w-full h-full'>
                                        <img src={image} className="object-cover w-full h-full"
                                        onClick={() => setOpen(state => ({...state, open: true, image: images[idx]}))}/>
                                    </div>
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
                    <div 
                        className='w-11/12 h-[260px] xs:h-[380px] sm:h-[420px] md::h-auto flex-shrink-0'
                        onClick={() => setOpen(state => ({...state, open: true, image}))}>
                        <img src={image} className="object-cover w-[98%] h-full rounded"/>
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default ProductSlide