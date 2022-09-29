import { GroupAdd, Instagram, Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { FacebookLink, InstagramLink, MailLink, PhoneLink, TiktokLink, TwitterLink, WhatappLink, YoutubeLink } from '../../components';
import { FacebookIcon, Logo, MailIcon, PhoneIcon, TwitterIcon } from '../../components/icons';
import WhatappIcon from '../../components/icons/Whatapp';
import TextHeader from '../TermsAndCondition/TextHeader';

function CountDown() {
  const dateSeconds = new Date('2022-10-10')

  setInterval(function() {
    const countDownDate = dateSeconds.getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const arr = (val: number) => Array.from(String(val), String)
    document.getElementById("countDays1")!.innerHTML = String(arr(days)[1] ? arr(days)[0] : 0)
    document.getElementById("countDays2")!.innerHTML = String(arr(days)[1] || arr(days)[0] || 0)
    document.getElementById("countHours1")!.innerHTML = String(arr(hours)[1] ? arr(hours)[0] : 0)
    document.getElementById("countHours2")!.innerHTML = String(arr(hours)[1] || arr(hours)[0] || 0)
    document.getElementById("countMins1")!.innerHTML = String(arr(minutes)[1] ? arr(minutes)[0] : 0)
    document.getElementById("countMins2")!.innerHTML = String(arr(minutes)[1] || arr(minutes)[0] || 0)
    // console.log(seconds);
  }, 1000);
  return (
    <div className="w-full min-h-screen count-down-container text-white p-[5%] sm:px-[8%] sm:py-[5%]">
      <div className='w-full'>
        <Logo color='#fff' />
      </div>
      <div className='w-full md:flex justify-between py-[5vh]'>
        <div className='w-full'>
          <div className='w-full'>
            <TextHeader title='Hi There!' center color='#fff' className="text-white capitalize text-center md:text-justify" />
          </div>
          {/* <span className='bg-[#FF5000] px-10 py-2 rounded-3xl text-xl'>Hi There!</span> */}
          <div className='text-4xl xl:text-6xl font-black text-white my-5 text-center md:text-justify'>
            <p className=''>We are</p>
            <p className=''>Launching</p>
            <p className='text-[#FF5000]'>Soon!</p>
          </div>
        </div>

        <div className='py-[5%] text-center sm:text-justify'>
          <div className='flex justify-center space-x-4'>
            <div className='text-center'>
              <div className='flex gap-2'>
                <div id='countDays1' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
                <div id='countDays2' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
              </div>
              <p className='text-md sm:text-3xl font-bold md:font-medium mt-3'>DAYS</p>
            </div>
            <div className='text-center'>
              <div className='flex gap-2'>
                <div id='countHours1' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
                <div id='countHours2' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
              </div>
              <p className='text-md sm:text-3xl font-bold md:font-medium mt-3'>HOURS</p>
            </div>
            <div className='text-center'>
              <div className='flex gap-2'>
                <div id='countMins1' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
                <div id='countMins2' className='text-6xl md:text-7xl xl:text-9xl font-bold md:font-medium ff-digitalNumber bg-countDown rounded border-[0.2px] border-[white]/20 w-[40px] sm:w-[55px] md:w-[100px] h-fit flex justify-center'>0</div>
              </div>
              <p className='text-md sm:text-3xl font-bold md:font-medium mt-3'>MINUTES</p>
            </div>

          </div>
        </div>
      </div>
      <div className='md:flex justify-between'>
        <div className="my-3 md:my-0 md:pr-10 lg:p-0">
          <p className="text-sm mb-2 sm:mb-4 first-letter:capitalize "><span className='hidden md:inline'>Subscribe to our newsletter and </span>get latest updates in your inbox</p>
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
        <div className="my-3 md:my-0 md:pl-10 lg:p-0">
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
      <div className='px-2 my-10'>
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