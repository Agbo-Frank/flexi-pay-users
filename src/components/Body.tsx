import React from "react";

interface IBodyProps extends  React.PropsWithChildren{
  bgColor: string
}

function Body({ children, bgColor }: IBodyProps): JSX.Element {
  return (
    <div className={`mx-auto ${bgColor}`}>
      {/* <div className={`w-screen mx-auto xl:w-fp-desk ${bgColor}`}> */}
        {children}
      {/* </div> */}
    </div>
  );
}

export default Body;