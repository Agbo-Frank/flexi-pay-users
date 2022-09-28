import { GroupAdd, Instagram, Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import Countdown from "react-countdown";
import ribbon from '../../asset/bg.png'
import { FacebookLink, InstagramLink, MailLink, PhoneLink, TiktokLink, TwitterLink, WhatappLink, YoutubeLink } from '../../components';
import { Logo } from '../../components/icons';

function CountDown() {
  const dateSeconds = new Date('2022-10-10')
  return (
    <div className="fp-screen flex flex-col justify-around px-8 sm:p-5 h-screen count-down-container text-white ">
      <div className='w-full px-2'>
        <Logo color='#fff' />
      </div>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center  px-2'>
        <div className=''>
          <span className='bg-[#FF5000] px-10 py-2 rounded-3xl text-xl'>Hi There!</span>
          <div className='text-4xl xl:text-6xl font-black text-white my-5'>
            <p className=''>We are</p>
            <p className=''>Launching</p>
            <p className='text-[#FF5000]'>Soon!</p>
          </div>
        </div>

        <div className='text-center sm:text-justify'>
          <Countdown date={dateSeconds} className="text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber" />
        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-5 justify-between px-2'>
        <div className="md:w- md:pr-10 lg:p-0">
          <p className="text-sm mb-2 sm:mb-4">Subscribe to our newsletter and get latest updates in your inbox</p>
          <div className="w-full flex items-stretch gap-1 h-[40px]">
              <input type='email' placeholder="Enter email" className="w-[80%] block px-3 py-auto h-auto rounded-md" />
                  <Button 
                      color="secondary" 
                      variant="contained"
                      className="h-full"
                      size="small"
                  >
                      <span className="hidden sm:block">Subscribe</span>
                      <span className="block sm:hidden"><Send /></span>
                  </Button>
          </div>
        </div>
        <div className="md:w- md:pl-10 lg:p-0">
          <p className="text-sm mb-2 sm:mb-4">Join our WhatsApp list to get updates</p>
          <div className="w-full flex items-stretch gap-1 h-[40px]">
              <input type='email' placeholder="Enter Phone Number" className="w-[80%] block px-3 py-auto h-auto rounded-md" />
                  <Button 
                      color="secondary" 
                      variant="contained"
                      className="h-full"
                      size="small"
                  >
                      <span className="hidden sm:block">Join</span>
                      <span className="block sm:hidden"><GroupAdd /></span>
                  </Button>
          </div>
        </div>
      </div>
      <div className='px-2'>
        <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-5 sm:space-y-0">
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
    </div>
  )
}

export default CountDown