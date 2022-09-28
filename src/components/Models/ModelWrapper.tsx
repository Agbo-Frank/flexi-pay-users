import React, { useState } from "react";
import {IModel} from '../interface'
import Slide from 'react-reveal/Slide';
import { ClickAwayListener } from "@mui/material";


function ModelWrapper({ children, isOpen, closeModal, size = "large", title, components }: IModel): JSX.Element {
  let [times, setTimes] = useState("#A0A0A1")
  return (
    <Slide bottom opposite when={isOpen} duration={400}>
      <div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen overflow-hidden flex justify-center top-0 left-0 bottom-0 right-0 items-center bg-primary-black z-[200]`}>
        <div className={`relative block ${size === 'large' ? 'w-fp-500' : 'w-fp-450'} h-screen xs:max-h-[80vh] xs:h-fit bg-white xs:rounded-xl z-50 scrollbar overflow-y-auto`}>
          <ClickAwayListener onClickAway={() => {if(closeModal)closeModal()}}>
            <>
              <div className={`${title && 'flex'} justify-between items-center sticky top-0 bg-white z-20 p-3`}>
                {
                  title &&
                  <p className="text-lg text-grey-200 font-medium">{title}</p>
                }
                {
                  components && <>{ components }</>
                }
                <i className={`fa-solid fa-xmark hover:text-crimson text-xl ${!title && 'float-right'} ${components && 'absolute top-3 right-3'}`}
                onClick={closeModal}></i>
              </div>
              {children}
            </>
          </ClickAwayListener>
        </div>
      </div>
    </Slide>
  );
}

export default ModelWrapper;