import { Dialog, DialogContent } from "@mui/material";
import Slider from "react-slick";
import { useRef, useState } from "react";
import ModelWrapper from "../../components/Models/ModelWrapper";

export function ProductSlideDialog({images, open, close}: {images: string[], open: boolean, close: () => void | any}){
    let slide: any = useRef()
    let [index, setIndex] = useState(0)
    const settings = {
        infinite: false,
        speed: 800,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return(
        <Dialog open={open} onClose={close}>
            <DialogContent>
            <div className="flex w-full flex-col space-y-3">
                <div className='relative '>
                    <Slider ref={slide} {...settings}>
                    {/* <img src={images[0]} className="object-cover w-full h-full"/> */}
                        {
                            images?.map((image, idx)=> (
                                <div className='w-full h-[400px] rounded overflow-hidden' key={idx}>
                                    <div className='w-full h-full'>
                                        <div className='w-full h-full'>
                                            <img src={image} className="object-cover w-full h-full"/>
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
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductSlideDialog