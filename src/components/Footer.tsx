import Button from "./Button";
import { Logo, MailIcon, MasterCardIcon, PhoneIcon, VisaIcon } from "./icons";
import WhatappIcon from "./icons/Whatapp";



export function Footer(){
    return(
        <footer className="mt-5">
            <div className="bg-[#545362]">
                <div className="fp-screen px-2 sm:px-0 py-5 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:items-center bg-[#545362]">
                    <Logo color="white"/>
                    <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-3 sm:space-y-0">
                        <div className="flex text-white space-x-2">
                            <div className="bg-white  grid place-items-center rounded-full w-12 h-12">
                                <MailIcon color="#000541" size="20"/>
                            </div>
                            <div>
                                <h1 className="font-semibold">Email Support</h1>
                                <p className="text-sm font-light">Support@flexipay.com</p>
                            </div>
                        </div>

                        <div className="flex text-white space-x-2">
                            <div className="bg-white grid place-items-center rounded-full w-12 h-12">
                                <WhatappIcon color="#000541" size="20"/>
                            </div>
                            <div>
                                <h1 className="font-semibold">WhatsApp Support</h1>
                                <p className="text-sm font-light">Support@flexipay.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#161721] text-white">
                <div className="bg-[#161721] fp-screen">
                    <div className="flex justify-between py-10 border-b border-white">
                        <ul>
                            <li className="font-semibold mb-4">About FlexiPay</li>
                            <li className="font-light text-sm">About us</li>
                            <li className="font-light text-sm">Contact us</li>
                            <li className="font-light text-sm">Terms & Conditions</li>
                        </ul>

                        <ul>
                            <li className="font-semibold mb-4">Make Money on FlexiPay</li>
                            <li className="font-light text-sm">Become a Vendor</li>
                            <li className="font-light text-sm">Become an affiliate partner</li>
                        </ul>

                        <ul>
                            <li className="font-semibold mb-4">More Info</li>
                            <li className="font-light text-sm">Returen Policy</li>
                            <li className="font-light text-sm">Privacy Policy</li>
                            <li className="font-light text-sm">Become an affiliate partner</li>
                        </ul>

                        <div>
                            <p className="font-semibold mb-4">Get latest updates in your inbox</p>
                            <div className="bg-white flex justify-between rounded-xl overflow-hidden pl-3 py-1">
                                <input type='email' placeholder="Email"/>
                                <div className="scale-90">
                                    <div className="scale">
                                        <Button color="#FF5000"><p>Subscribe</p></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-4">
                        <div className="flex space-x-2 items-center">
                            <p className="text-sm">Follow Us </p>
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
                            <div className="space-x-5 flex items-center my-3">
                                <i className="fa-brands fa-cc-visa text-primary-dark-blue"></i>
                                <i className="fa-brands fa-cc-mastercard text-primary-dark-blue"></i>
                            </div>
                        </div>

                        <p className="text-sm">Copyright © 2022 FlexiPay.com. All rights reserved</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;