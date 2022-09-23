import React from 'react'

interface Prop {
  title: string
}

function TextHeader({title}: Prop) {
  return (
    <div className='w-full'>
      <h1 className='uppercase md:text-3xl text-[#000541] font-semibold '>{title}</h1>
      <div className='w-[90px] p-0.5 bg-[#FF5000] rounded-sm' />
    </div>
  )
}

export default TextHeader