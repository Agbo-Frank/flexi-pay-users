import React, { useState } from "react";
import { IModel } from "../interface";


function AlertWrapper({ children, isOpen }: IModel): JSX.Element {
  return (
    <div className={`${isOpen ? 'fixed' : 'hidden'} w-screen h-screen overflow-clip flex justify-center top-0 left-0 bottom-0 right-0 items-center bg-primary-black`}>
      <div className="block w-500 h-fit bg-white rounded-3xl py-5 px-4 z-50">
          {children}
      </div>
    </div>
  );
}

export default AlertWrapper;