import React, { useState } from "react";
import TimesIcons from "../icons/TimesIcon";
import {IModel} from '../interface'
import Slide from 'react-reveal/Slide';


function ModelWrapper({ children, isOpen, closeModal, size = "large" }: IModel): JSX.Element {
  let [times, setTimes] = useState("#A0A0A1")
  return (
    <Slide bottom opposite when={isOpen} duration={400}>
      <div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen overflow-hidden flex justify-center top-0 left-0 bottom-0 right-0 items-center bg-primary-black z-50`}>
        <div className={`relative block ${size === 'large' ? 'w-fp-500' : 'w-fp-450'} h-fp-80 bg-white rounded-3xl py-5 px-2 z-50 scrollbar`}>
            {children}
            <div 
            className="absolute -top-10 -right-10 w-10 h-10 rounded-full bg-white hover:bg-crimson flex justify-center items-center cursor-pointer"
            onMouseEnter={() => setTimes('white')}
            onMouseLeave={() => setTimes("#A0A0A1")}
            onClick={closeModal}>
              <TimesIcons color={times} size="16"/>
            </div>
        </div>
      </div>
    </Slide>
  );
}

export default ModelWrapper;