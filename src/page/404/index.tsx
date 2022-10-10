import { 
    Body, Categories, Header, 
    SearchBar,
    Footer,
    Button} from "../../components"
import TextHeader from "../TermsAndCondition/TextHeader"
import img1 from '../../asset/banner4.png'
import img2 from '../../asset/banner5.png'
import img3 from '../../asset/banner9.png'
import img4 from '../../asset/banner8.png'
import img5 from '../../asset/banner6.png'
import img6 from '../../asset/banner7.png'
import { Fade } from "react-slideshow-image"
import { useNavigate } from "react-router-dom"
// import { Button } from "@mui/material"


export function NotFound(){
  const navigate = useNavigate()
  const slides = [
    {
      id: 1,
      text: "Food & Groceries",
      img: img1,
      url: "/"
    },
    {
      id: 2,
      text: "Fashion",
      img: img2,
      url: "/"
    },
    {
      id: 3,
      text: "Phones & Tablets",
      img: img3,
      url: "/"
    },
    {
      id: 4,
      text: "Televisions",
      img: img4,
      url: "/"
    },
    {
      id: 5,
      text: "Home Appliances",
      img: img5,
      url: "/"
    },
    {
      id: 6,
      text: "Sneakers",
      img: img6,
      url: "/"
    },
  ]
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                  <SearchBar />
                </div>
                <div className="w-full lg:w-[80%] mx-auto p-5 md:p-10 lg:px-12 lg:py-20">
                  <div className="md:flex justify-between">
                    <div className="w-full md:w-[50%] lg:px-10">
                      <TextHeader title="eRror 404" />
                      <div className="my-10 md:pr-5">
                        <h1 className="mb-5 md:mb-10 text-primary-dark-blue md:text-5xl lg:text-7xl font-bold">Hi There!</h1>
                        <p className="mb-5 md:mb-10 md:text-lg lg:text-xl font-medium">We can’t seem to find the content you are looking for. kindly go back to shopping.</p>
                        {/* <Button color="#FF5000" onClick={()=>navigate('/products')}>Go to Shopping</Button> */}
                        <button onClick={()=>navigate('/products')} className="w-[70%] py-3 mx-auto md:mx-0 rounded-5xl bg-[#FF5000] text-white hover:opacity-50 ">Go to Shopping</button>
                      </div>
                    </div>

                    <div className="hidden md:block w-full md:w-[50%] lg:px-10">
                      <div className="w-100 h-100">
                        <Fade arrows={false} autoplay infinite duration={5000}>
                          {
                            slides.map((val)=>(
                              <div className="sliderContainer h-[350px] lg:h-[400px]" key={val.id}>
                                <img alt="..." src={val.img} className="w-full sliderImage h-full object-cover" />
                                <div className="sliderMiddle">
                                  <div className="sliderText text-white pt-[30%]">
                                    <p className="text-2xl font-bold text-white mb-10">{val.text}</p>
                                    <button onClick={()=>navigate(val.url)} className="rounded-lg bg-white border border-[#FF5000] text-[#ff5000] px-5 py-2 font-medium hover:bg-[#ff5000] hover:text-white ">Shop Now</button>
                                  </div>
                                </div>
                              </div>
                            ))
                          }
                        </Fade>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
            </div>
        </Body>
    )
}

export default NotFound