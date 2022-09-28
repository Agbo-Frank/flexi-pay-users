import { GroupAdd, Instagram, Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import Countdown from "react-countdown";
import ribbon from '../../asset/bg.png'
import { FacebookIcon, Logo, MailIcon, PhoneIcon, TwitterIcon, UserIconPlus } from '../../components/icons';
import WhatappIcon from '../../components/icons/Whatapp';

function CountDown() {
  const dateSeconds = new Date('2022-10-10')
  return (
    <div className="w-full h-full count-down-container text-white p-[5%] sm:px-[10%] sm:py-[5%]">
      <div className='w-full'>
        <Logo color='#fff' />
      </div>
      <div className='md:flex justify-between py-[8vh]'>
        <div className=''>
          <span className='bg-[#FF5000] px-10 py-2 rounded-3xl text-xl'>Hi There!</span>
          <div className='text-4xl xl:text-6xl font-black text-white my-5'>
            <p className=''>We are</p>
            <p className=''>Launching</p>
            <p className='text-[#FF5000]'>Soon!</p>
          </div>
        </div>

        <div className='py-[5%] text-center sm:text-justify'>
          <Countdown date={dateSeconds} className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber" />
        </div>
      </div>
      <div className='md:flex justify-between'>
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
      <div className='pt-[10%]'>
        <div className="flex flex-row justify-center space-x-3 sm:space-x-5 sm:space-y-0">
          <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
              <FacebookIcon color="#000541" size="20"/>
          </div>
          <div className="bg-white text-[#000541] text-xl  grid place-items-center rounded-full w-10 h-10">
              <Instagram />
          </div>
          <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
              <TwitterIcon color="#000541" size="20"/>
          </div>
          <div className="bg-white  grid place-items-center rounded-full w-10 h-10 rotate-[150deg]">
              <PhoneIcon color="#000541" size="20"/>
          </div>
          <div className="bg-white grid place-items-center rounded-full w-10 h-10">
              <WhatappIcon color="#000541" size="20"/>
          </div>
          <div className="bg-white  grid place-items-center rounded-full w-10 h-10">
              <MailIcon color="#000541" size="20"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountDown