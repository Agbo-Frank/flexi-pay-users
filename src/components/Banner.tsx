import React from 'react'

interface Prop {
  title: string
}

function Banner({title}: Prop) {
  return (
    <div className='w-full h-full'>
      <img alt='flexipay' src={title} className="w-full" />
      {/* <div className='w-full h-[20vh] md:h-[30vh] lg:h-[45vh] bg-[#F4F4F4] mix-blend-multiply '>
        <h1 className='uppercase text-[#FF5000] text-4xl md:text-6xl text-center align-middle pt-[10%] md:pt-[7%]'>{title}</h1>
      </div> */}
    </div>
  )
}

export default Banner