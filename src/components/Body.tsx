import React from "react";
import { useLocation } from "react-router-dom";
import { Header, Categories } from ".";
import SnackBar from "./SnackBar";

interface IBodyProps extends  React.PropsWithChildren{
  bgColor: string
}

export function Body({ children, bgColor }: IBodyProps): JSX.Element {
  const { pathname } = useLocation()
  let paths = ["/login", /auth/i, "/register", "/auth/verify/email"]
  return (
    <div className={`${bgColor} relative`}>
      <div className={`w-full`}>
        {/* <div className="w-full h-fit bg-white sm:bg-grey-500"> */}
          {
            paths.includes(pathname) || /auth/img.test(pathname) ?
            null:
            <>
              <Header />
              <Categories />
            </>
            
          }
          
        
        {children}
        <SnackBar />
      </div>
    </div>
  );
}

export default Body;