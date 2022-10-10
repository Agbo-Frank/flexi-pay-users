import React from "react";
import { Header, Categories } from ".";
import SnackBar from "./SnackBar";

interface IBodyProps extends  React.PropsWithChildren{
  bgColor: string
}

export function Body({ children, bgColor }: IBodyProps): JSX.Element {
  return (
    <div className={`${bgColor} relative`}>
      <div className={`w-full`}>
        {/* <div className="w-full h-fit bg-white sm:bg-grey-500"> */}
          <Header />
          <Categories />
        
        {children}
        <SnackBar />
      </div>
    </div>
  );
}

export default Body;