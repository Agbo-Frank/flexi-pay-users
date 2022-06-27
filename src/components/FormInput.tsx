import React, { useState } from "react";
import { CloseEyesIcon, EyesIcon } from "./icons";
import{ IInputProps } from './interface'

function FormInput({ Icon, type, name, label, formik }: IInputProps): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  let [error, setError] = useState<boolean>(false)

  let [password, setPassword] = useState('password')
  let [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <div className="relative w-full">
        <div 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`flex justify-between items-center rounded-full border border-solid ${focus ? 'border-primary-blue' : formik.errors[name] ? 'border-crimson' : 'border-grey-400'} py-3 px-5 mb-4`}>
            <input 
            type={type === 'password' ? password : type} 
            name={name} 
            placeholder={label}
            className="w-full" 
            {...formik.getFieldProps(name)}
            /> 
            {
              type === 'password' ?
              <div onClick={() => {
                  setPassword(state => {
                    if(state === 'password'){
                      return 'text'
                    }
                    else{
                      return 'password'
                    }
                  })
                  setSeePassword(state => !state)
                }}>
                {
                  seePassword ?
                  <EyesIcon size="17" color={focus ? '#1900FE' : formik.errors[name] ? '#FF5000': '#C4C4C4'}/>:
                  <CloseEyesIcon size="17" color={focus ? '#1900FE' : formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
                }
              </div>:
              <Icon  size='14' color={focus ? '#1900FE' : formik.errors[name] ? '#FF5000': '#C4C4C4'}/>
            }
        </div>
        {
          formik.touched[name] && formik.errors[name] &&
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-7 translate-x-4`}>{formik.errors[name]}</p>
        }
    </div>
  );
}

export default FormInput;