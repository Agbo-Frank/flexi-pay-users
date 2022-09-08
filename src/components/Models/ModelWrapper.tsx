import React, { useState } from "react";
import TimesIcons from "../icons/TimesIcon";
import {IModel} from '../interface'
import Slide from 'react-reveal/Slide';


function ModelWrapper({ children, isOpen, closeModal, size = "large" }: IModel): JSX.Element {
  let [times, setTimes] = useState("#A0A0A1")
  return (
    <Slide bottom opposite when={isOpen} duration={400}>
      <div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen overflow-hidden flex justify-center top-0 left-0 bottom-0 right-0 items-center bg-primary-black z-50`}>
        <div className={`relative block ${size === 'large' ? 'w-fp-500' : 'w-fp-450'} h-screen xs:max-h-fp-80 xs:h-fit bg-white xs:rounded-xl p-1 sm:p-5 z-50 scrollbar`}>
            {children}
            <i className="fa-solid fa-xmark hover:text-crimson text-xl absolute right-3 top-3"
            onClick={closeModal}></i>
        </div>
      </div>
    </Slide>
  );
}

export default ModelWrapper;