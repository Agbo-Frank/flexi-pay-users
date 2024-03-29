import { AccountBalance, Instagram, Send } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FPFormikSubscribe } from "../page/CountDown/service";
import { FLEXIPAY_PHONE, FLEXIPAY_VENDOR_URL } from "../utils/constants";
import { FacebookIcon, Logo, MailIcon, MasterCardIcon, PhoneIcon, TwitterIcon, VisaIcon, WalletIcon } from "./icons";
import WhatappIcon from "./icons/Whatapp";
import { HashLink } from 'react-router-hash-link'
import { FacebookLink, InstagramLink, MailLink, PhoneLink, TiktokLink, TwitterLink, WhatappLink, YoutubeLink } from "./SoicalLinks";
import SubscribeInput from "./SubscribeInput";


const OldFooter = () => {
    return(
        <div>
            <div className="bg-[#545362] px-2 sm:px-0">
                <div className="fp-screen py-5 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:items-center bg-[#545362]">
                    <Logo color="white"/>
                    <div className="flex justify-around flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0">
                        <div className="flex text-white space-x-1 sm:space-x-2">
                            <div className="bg-white  grid place-items-center rounded-full w-10 h-10 sm:w-12 sm:h-12">
                                <MailIcon color="#000541" size="20"/>
                            </div>
                            <div>
                                <h1 className="text-sm sm:text-base font-semibold">Email Support</h1>
                                <p className="text-xs sm:text-sm font-light"><a href="mailto:support@flexipay.com">Support@flexipay.com</a></p>
                            </div>
                        </div>

                        <div className="flex text-white space-x-1 sm:space-x-2">
                            <div className="bg-white  grid place-items-center rounded-full w-10 h-10 sm:w-12 sm:h-12 rotate-180">
                                <PhoneIcon color="#000541" size="20"/>
                            </div>
                            <div>
                                <h1 className="text-sm sm:text-base font-semibold">Phone Support</h1>
                                <p className="text-xs sm:text-sm font-light"><a href="tel:09093874726">09093874726</a>, <a href="tel:09092787322">09092787322</a></p>
                            </div>
                        </div>

                        <div className="flex text-white space-x-1 sm:space-x-2">
                            <div className="bg-white grid place-items-center rounded-full w-10 h-10 sm:w-12 sm:h-12">
                                <WhatappIcon color="#000541" size="20"/>
                            </div>
                            <div className="">
                                <h1 className="text-sm sm:text-base font-semibold">WhatsApp Support</h1>
                                <p className="text-xs sm:text-sm font-light"><a href="tel:09093874726">09093874726</a>, <a href="tel:09092787322">09092787322</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#161721] text-white px-2 sm:px-0">
                <div className="bg-[#161721] fp-screen">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-between py-10 border-b border-white">
                        <ul>
                            <li className="font-semibold mb-2 sm:mb-4">About FlexiPay</li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/about-us">About us</Link></li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/support">Contact us</Link></li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/terms-and-condition">Terms & Conditions</Link></li>
                        </ul>

                        <ul>
                            <li className="font-semibold mb-2 sm:mb-4">Make Money on FlexiPay</li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/vendor">Become a Product  Vendor</Link></li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/vendor">Become a Service  Vendor</Link></li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/partner">Become an affiliate partner</Link></li>
                        </ul>

                        <ul>
                            <li className="font-semibold mb-2 sm:mb-4">More Info</li>
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/return-policy">Return Policy</Link></li>
                            {/* <li className="font-light text-sm cursor-pointer my-2"><Link to="/privacy-policy">Privacy Policy</Link></li> */}
                            <li className="font-light text-sm cursor-pointer my-2"><Link to="/affiliate">Become an affiliate partner</Link></li>
                        </ul>

                        <div>
                            <p className="font-semibold mb-2 sm:mb-4">Get latest updates in your inbox</p>
                            <div className="bg-white flex justify-between rounded overflow-hidden p-1 mx-2">
                                <input type='email' placeholder="Email" className="px-3" />
                                <div className="scale-90">
                                    <div className="scale">
                                        <Button 
                                            color="secondary" 
                                            variant="contained">
                                                Subscribe
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4">
                        <div className="flex space-x-2 items-center">
                            <p className="text-sm">Follow Us: </p>
                            <div className="space-x-5 flex items-center my-3">
                                <i className="text-white fa-brands fa-facebook"></i>
                                <i className="text-white fa-brands fa-instagram-square"></i>
                                <div className="bg-white rounded-full w-5 h-5 inline-grid place-items-center">
                                    <i className="text-primary-dark-blue text-xs fa-brands fa-twitter"></i>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 items-center">
                            <p className="text-sm">Payment Methods: </p>
                            <div className="space-x-3 flex items-center my-3">
                                <i className="fa-brands fa-cc-visa text-white text-lg"></i>
                                <i className="fa-brands fa-cc-mastercard text-white text-lg"></i>
                                <i className="fa-solid fa-wallet text-white text-lg"></i>
                                <i className="fa-sharp fa-solid fa-building-columns text-white text-lg"></i>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm">Copyright © 2022 FlexiPay.com. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NewFooter = () => {
    let [loading, setLoading] = useState(false)
    let formik = FPFormikSubscribe(setLoading)
    
    return(
        <footer  className=" boder border-red-700 p-5 md:px-10 md:py-3 text-white bg-primary-dark-blue mt-10">
            <div className="fp-screen bg-primary-dark-blue h-full flex flex-col sm:flex-row md:p-2">
                <div className="my-2 sm:my-5 md:my-auto w-full sm:w-1/2 sm:px-5 border-r-0 sm:border-r border-[#EDEEF0] sm:py-4">
                    <p className="mb-2">Contact us/Follow us:</p>
                    <div className="flex flex-row flex-wrap gap-3 sm:gap-5 sm:space-y-0">
                        <FacebookLink />
                        <InstagramLink />
                        <TwitterLink />
                        <PhoneLink />
                        <WhatappLink />
                        <MailLink />
                        <YoutubeLink />
                        <TiktokLink />
                    </div>
                </div>
                <div className="my-3 sm:my-5 md:my-auto sm:w-1/2 sm:px-[70px] sm:py-7">
                    <p className="mb-2">Payment Methods:</p>
                    <div className="flex flex-row space-x-3 sm:space-x-5  sm:space-y-0">
                        <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
                            <VisaIcon color="#000541" size="20"/>
                        </div>
                        <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
                            <MasterCardIcon color="#000541" size="20"/>
                        </div>
                        <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
                            <WalletIcon color="#000541" size="20"/>
                        </div>
                        <div className="bg-white text-[#000541] text-xl  grid place-items-center rounded-full w-10 h-10">
                            <AccountBalance />
                        </div>
                    </div>
                </div>
            </div>

            <div className="fp-screen bg-primary-dark-blue border-y border-[#EDEEF0] ">
                <div className="flex flex-col md:flex-row space-y-2 sm:space-y-0 justify-between py-5 bg-primary-dark-blue">
                    <div>
                        <div className="mb-4">
                            <Logo color="white"/>
                        </div>
                        <div className="font-light text-sm">
                            <a className="my-4 text-sm" href={FLEXIPAY_PHONE}>+234 9020 1304 44</a>
                            <address className="my-4">27 NTA Road, Rumuokwuta, PHC.</address>
                        </div>
                        <div className="my-4">
                            <p className="text-sm mb-2 sm:mb-4">Get latest updates in your inbox</p>
                            <SubscribeInput formik={formik} name="email" loading={loading} />
                        </div>
                    </div>
                    <ul>
                        <li className="font-medium mb-2 sm:mb-4">About FlexiPay</li>
                        <li className="font-light text-sm cursor-pointer my-2"><Link to="/about-us">About us</Link></li>
                        <li className="font-light text-sm cursor-pointer my-2"><Link to="/support">Contact us</Link></li>
                    {/* <li className="font-light text-sm cursor-pointer my-2"><HashLink to="/terms-and-condition#privacy-policy">Privacy Policy</HashLink></li> */}
                    {/* <li className="font-light text-sm cursor-pointer my-2"><Link to="/shipping-policy">Shipping Policy</Link></li> */}
                        <li className="font-light text-sm cursor-pointer my-2"><Link to="/terms-and-condition">Terms & Conditions</Link></li>
                    </ul>

                    <ul>
                        <li className="font-medium mb-2 sm:mb-4">Make Money on FlexiPay</li>
                        <li className="font-light text-sm cursor-pointer my-2"><a href={FLEXIPAY_VENDOR_URL}>Become a Vendor</a></li>
                        <li className="font-light text-sm cursor-pointer my-2"><Link to="/">Become an affiliate partner</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center bg-primary-dark-blue">
                <p className="text-xs sm:text-sm font-light my-3">Copyright © 2022 FlexiPay.com. All rights reserved</p>
            </div>
        </footer >
    )
}



export function Footer(){
    const navigate = useNavigate()
    return(
            <NewFooter />
    )
}

export default Footer;