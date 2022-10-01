import React from 'react';
import { IButtonProps } from './interface'

export function Button({ 
        children, 
        color, 
        type = 'button', 
        outline = false, 
        onClick, 
        disable = false, 
        padding = true
    }: IButtonProps): JSX.Element {
        return (
            <button 
            type={type}
            disabled={disable}
            className={`border border-solid cursor-pointer rounded-[5px] ${padding ? 'py-[10px]' : 'py-1'} px-4 min-w-max w-full hover:opacity-50 ${disable && 'opacity-50'} flex justify-center`}
            style={{
                color: outline ? color : 'white',
                borderColor: color,
                backgroundColor: outline ? 'white' : color
            }}
            onClick={onClick}>
                { children }
            </button>
        );
  }
  
export default Button;