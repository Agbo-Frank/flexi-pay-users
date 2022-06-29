import React from 'react';
import Body from '../components/Body';
import AuthenticationImage from '../asset/authentication_image.png'

function AuthenticationForm({ children }: React.PropsWithChildren) {
  return (
    <Body bgColor='bg-white'>
      <div className='w-full h-full flex justify-between'>
        <div className='w-5/12 h-full'>
          <img src={AuthenticationImage} alt='authentication-image' className='object-cover w-full h-full'/>
        </div>

        <div className='w-7/12 flex justify-center'>
          <div className='w-fp-600'>
            { children }
          </div>
        </div>
      </div>
    </Body>
  );
}

export default AuthenticationForm;
