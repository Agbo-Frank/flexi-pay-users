import { Button, Checkbox, Grid, MenuItem, Pagination, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { 
    Body, Categories, 
    DropDown, Header, 
    ProductCard, Empty,
    ProductCardSkeleton, 
    Breadcrumb,
    SearchBar,
    Footer} from "../../components"
import Banner from "../../components/Banner"
import TextHeader from "../TermsAndCondition/TextHeader"
import bannerImg from '../../asset/about.png'
import img1 from '../../asset/banner5.png'
import img2 from '../../asset/banner4.png'


export function About(){
    return(
        <Body bgColor="bg-white sm:bg-grey-500">
            <div className="w-full h-fit bg-white sm:bg-grey-500">
                <Header />
                <Categories />
                <Breadcrumb />
                <div className="block sm:hidden w-11/12 my-2 mx-auto bg-white">
                    <SearchBar />
                </div>
                <div className="w-full px-5 md:px-16">
                  <Banner title={bannerImg} />
                  {/* <Banner title="About Us" /> */}
                  <div className="py-16">
                    <Grid container>
                      <Grid item md={6}>
                        <div className="w-full">
                          <TextHeader title="about us" />
                          <div className="text-[#000541] md:pr-10">
                            <p className="my-3">
                              FlexiPay.ng is the trading name of Viral Tribe Limited.
                              We strive to deliver the benefits of technology to individual and his communities. We aim to achieve this by bridging the gap between online vendors, their clients and provide the opportunity for individuals to shop for items online and pay conveniently in instalment.
                              We serve a retail customer base that continues to grow exponentially, offering products that span various categories including Phones, Computers, Clothing, Shoes, Home Appliances, Books, healthcare, Baby Products, personal care and much more.
                            </p>
                            <p className="my-3">
                              It is our aim to deliver, reliable, cost effective and touching edge productive to our customers.
                            </p>
                          </div>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="w-full md:pl-10">
                          <img alt="flexipay" src={img1} className="w-full max-h-[500px]" />
                        </div>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item md={6}>
                        <div className="w-full md:pr-10">
                          <img alt="flexipay" src={img2} className="w-full max-h-[500px]" />
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="py-10 md:py-16">
                          <div className="w-full">
                            <TextHeader title="our mission" />
                            <div className="text-[#000541] md:pr-10">
                              <p className="my-3">
                                To connect Nigerian online vendors and shoppers to each other through Technology & Commerce while ensuring affordability of goods.
                              </p>
                            </div>
                          </div>
                          <div className="w-full">
                            <TextHeader title="our vision" />
                            <div className="text-[#000541] md:pr-10">
                              <p className="my-3">
                                At FlexiPay we believe that anyone can afford anything if given time to plan and put resources together. Our vision is to provide this opportunity to Nigerians at large, so they can afford to shop at the convenience of their time and pocket.
                              </p>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <Footer />
            </div>
        </Body>
    )
}

export default About