import { useRef, useState } from 'react'
import Slider from 'react-slick'
import banner1 from '../../asset/banner1.png'
import banner2 from '../../asset/banner2.png'
import banner3 from '../../asset/banner3.png'


export function BannerSlides(){
    let slide: any = useRef()

    let imgs = [banner1, banner2, banner3]
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
    };
    return(
        <>
            <div className="hidden sm:grid grid-cols-3 h-80 w-full bg-white rounded-xl p-4 gap-3">
                {
                    imgs.map((img, idx) => (
                        <div className="w-full h-full rounded-lg overflow-hidden" key={idx}>
                            <img src={img} alt="banner1" className="object-cover w-full h-full"/>
                        </div>
                    ))
                }
            </div>

            <div className='block sm:hidden relative'>
                <Slider ref={slide} {...settings}>
                    {
                        imgs.map((img, imgIdx) => (
                            <div className='w-full' key={imgIdx}>
                                <div className='w-full rounded-none sm:rounded-xl overflow-hidden h-[250px] sm:h-auto'>
                                    <img src={img} className="object-cover w-[98%] h-full rounded-xl"/>
                                </div>
                            </div>
                        ))
                    }
                </Slider>

                <ul className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex justify-center space-x-1">
                    {
                        imgs.map((dot, dotIdx) => (
                            <li className="w-3 h-3 rounded-full bg-white cursor-pointer p-xs border border-primary-orange-200" onClick={() => {
                                    setIndex(dotIdx)
                                    slide.current.slickGoTo(dotIdx)
                                }} key={dotIdx}>
                                {index === dotIdx && <div className="w-full h-full bg-primary-orange-200 rounded-full"></div>}
                            </li>
                        ))
                    }
                </ul>

            </div>
        </>
    )
}

export default BannerSlides