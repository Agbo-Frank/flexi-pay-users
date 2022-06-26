import React from "react";

function Body({ children }: React.PropsWithChildren): JSX.Element {
  return (
    <div className='w-screen xl:w-fp-desk mx-auto'>
      {children}
    </div>
  );
}

export default Body;