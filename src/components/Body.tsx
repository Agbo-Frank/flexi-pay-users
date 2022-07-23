import React from "react";

interface IBodyProps extends  React.PropsWithChildren{
  bgColor: string
}

export function Body({ children, bgColor }: IBodyProps): JSX.Element {
  return (
    <div className={`${bgColor} relative`}>
      <div className={`w-full`}>
        {children}
      </div>
    </div>
  );
}

export default Body;