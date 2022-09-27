import React from 'react'
// import { Fade, Slide } from 'react-awesome-reveal'
const Fade = require('react-reveal/Fade')

interface Prop {
  title: string
  children?: React.ReactNode; 
}

function TextHeader({title}: Prop) {
  return (
    <div className='w-full'>
      <h1 className='uppercase md:text-3xl text-[#000541] font-semibold '>{title}</h1>
      {/* delay={3} cascade damping={0.1} */}
      <Fade left cascade>
        <div className='w-[90px] transition-all p-0.5 bg-[#FF5000] rounded-sm' />
      </Fade>
    </div>
  )
}

export default TextHeader