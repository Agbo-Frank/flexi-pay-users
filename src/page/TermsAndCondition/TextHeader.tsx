import React from 'react'
// import { Fade, Slide } from 'react-awesome-reveal'
const Fade = require('react-reveal/Fade')

interface Prop {
  title: string;
  children?: React.ReactNode; 
  className?: string;
  color?: string;
  center?: boolean;
}

function TextHeader({title, color, center, className}: Prop) {
  return (
    <div className={`w-full ${center && "mx-auto md:mx-0"}`}>
      <h1 className={`uppercase md:text-3xl text-[${color || "#000541"}] font-semibold ${className} `}>{title}</h1>
      {/* delay={3} cascade damping={0.1} */}
      <div className={`w-[100px] ${center && "mx-auto md:mx-0"} text-center transition-all p-0.5 bg-[#FF5000] rounded-sm line`} />
    </div>
  )
}

export default TextHeader