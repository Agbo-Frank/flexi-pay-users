import React, { useState } from "react";
import Iicon from "./icons/interface";
import { FormikConfig } from 'formik';
import { IRegister } from '../page/Register/interface'

interface IInputProps {
    Icon: React.FC<Iicon>;
    type: string;
    name: string;
    label: string;
    formik: any
}

function FormInput({ Icon, type, name, label, formik }: IInputProps): JSX.Element {
  let [focus, setFocus] = useState<boolean>(false)
  let [error, setError] = useState<boolean>(false)
  return (
    <div className="relative">
        <div 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`flex justify-between items-center rounded-full border border-solid border-grey-400 ${error && 'border-crimson'} ${focus && 'border-primary-blue'} py-3 px-5 mb-4`}>
            <input 
            type={type} 
            name={name} 
            placeholder={label} 
            className="w-4/6" 
            {...formik.getFieldProps(name)}/>
            <Icon  size='14' color={error ? '#FF5000' :focus ? '#1900FE' : '#C4C4C4'}/>
        </div>
        {
          formik.touched[name] && formik.errors[name] &&
          <p className={`absolute text-crimson text-xs px-2 py-0 bg-white -translate-y-7 translate-x-4`}>{formik.errors[name]}</p>
        }
    </div>
  );
}

export default FormInput;