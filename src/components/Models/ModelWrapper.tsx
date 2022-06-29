import React, { useState } from "react";
import TimesIcons from "../icons/TimesIcon";


function ModelWrapper({ children }: React.PropsWithChildren): JSX.Element {
  let [times, setTimes] = useState("#A0A0A1")
  return (
    <div className="fixed w-screen h-screen overflow-clip flex justify-center top-0 left-0 bottom-0 right-0 items-center bg-primary-black">
      <div className="relative block w-fp-500 h-fp-80 bg-white rounded-3xl py-5 px-2 z-50">
          {children}
          <div 
          className="absolute -top-10 -right-10 w-10 h-10 rounded-full bg-white flex justify-center items-center"
          onMouseEnter={() => setTimes('#FF5000')}
          onMouseLeave={() => setTimes("#A0A0A1")}>
            <TimesIcons color={times} size="16"/>
          </div>
      </div>
    </div>
  );
}

export default ModelWrapper;