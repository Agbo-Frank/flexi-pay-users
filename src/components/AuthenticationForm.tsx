import React from 'react';
import Body from '../components/Body';
import AuthenticationImage from '../asset/authentication_image.png'

export function AuthenticationForm({ children }: React.PropsWithChildren) {
  return (
    <Body bgColor='bg-white'>
      <div className='w-full min-h-screen h-fit overflow-y-hidden mx-auto lg:flex lg:justify-between'>
        <div className='hidden lg:w-5/12 lg:block h-full'>
          <img src={AuthenticationImage} alt='authentication-image' className='object-cover w-full h-full'/>
        </div>

        <div className='w-full mx-auto lg:w-7/12 lg:flex lg:justify-center px-0 sm:px-3 md:px-0'>
          <div className='w-full mx-auto sm:w-10/12 lg:w-fp-600'>
            { children }
          </div>
        </div>
      </div>
    </Body>
  );
}

export default AuthenticationForm;
