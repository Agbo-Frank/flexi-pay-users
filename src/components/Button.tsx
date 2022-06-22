import React from 'react';

interface IButtonProps extends  React.PropsWithChildren{
    type?: ('button' | 'submit');
    outline?: boolean;
    color: string
}

function Button({ children, color, type = 'button', outline = false }: IButtonProps): JSX.Element {
    return (
    <button 
    type={type} 
    className='border border-solid rounded-full py-3 px-4 min-w-max w-fit hover:opacity-50'
    style={{
        color: outline ? color : 'white',
        borderColor: color,
        backgroundColor: outline ? 'white' : color
    }}>
        { children }
    </button>
    );
  }
  
export default Button;