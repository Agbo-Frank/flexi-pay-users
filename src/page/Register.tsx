import { Logo, UserIcon, MailIcon, PadLock, PhoneIcon, UserIconPlus, Spinner } from '../components/icons';

import {Button, FormInput, AuthenticationForm} from '../components';
import { useRegisterMutation } from '../redux/slice/Auth'

import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IRegister } from './interface'
import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Slide from 'react-reveal/Slide'

import Switch from '../components/Switch';

export function Register() {
    let [hasReferral, setHasReferral] = useState<boolean>(false)
    let [register, { isLoading: loading, data }] =  useRegisterMutation()

    let initialValues: IRegister = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: ''
    }

    async function onSubmit (value: IRegister, formikHelpers: FormikHelpers<IRegister | any>){
        try{
            let data = await register(value).unwrap()
            console.log(data)
        }
        catch(err){
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            first_name: Yup.string().required('first name field is Required'),
            last_name: Yup.string().required('last name field is Required'),
            password: Yup
                        .string()
                        .required('password field is Required')
                        .min(6, 'Must be 6 characters or more'),
            password_confirmation: Yup.string().required('Please confirm password'),
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
            phone_number: Yup.string().required('phone number field is Required'),
        })
    }

    const formik: FormikConfig<IRegister>  | any= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
  return (
    <AuthenticationForm>
        <div className='flex justify-between items-center w-full py-6 border-b border-solid border-grey-100'>
            <Logo />
            <div className='flex gap-5 items-center text-grey-200'>
            <span>Already have an account?</span>
            <Link to="/login" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Login</Link>
            </div>
        </div>

        <div className='my-20'>
            <div>
            <h2 className='text-primary-dark-blue font-bold text-4xl'>Welcome to FlexiPay</h2>
            <small className='block mt-3 text-lg text-grey-300'>Register your account</small>
            </div>
            
            <form className='my-12 w-10/12' onSubmit={formik.handleSubmit}>
            <div className='flex justify-start gap-3'>
                <FormInput 
                type='text' 
                Icon={UserIcon} 
                name="first_name" 
                label="First name"
                formik={formik}/>
                <FormInput 
                type='text' 
                Icon={UserIcon} 
                name="last_name" 
                label="Last name"
                formik={formik}/>
            </div>
            <div className='flex justify-start gap-3'>
                <FormInput 
                type='email' 
                Icon={MailIcon} 
                name="email" 
                label="Email"
                formik={formik}/>
                <FormInput 
                type='text' 
                Icon={PhoneIcon} 
                name="phone_number" 
                label="Phone Number"
                formik={formik}/>
            </div>
            <div className='flex justify-start gap-3'>
                <FormInput 
                type='password' 
                Icon={PadLock} 
                name="password" 
                label="Password"
                formik={formik}/>
                <FormInput 
                type='password' 
                Icon={PadLock} 
                name="password_confirmation" 
                label="Confirm Password"
                formik={formik}/>
            </div>

            <div className={`relative my-4 ${hasReferral ? 'my-4' : 'mt-4'}`}>
                <div className=' z-10 bg-white'>
                    <Switch 
                        label='Do you have a referal code?'
                        isTrue={hasReferral}
                        handleClick={() => setHasReferral(state => !state)}
                    />
                </div>
                
                <Slide top duration={300}>
                    <div className={`w-2/6 mt-4 transition-all duration-75 ${hasReferral ? 'block' : 'hidden'} z-0`}>
                        <FormInput 
                        type='text' 
                        Icon={UserIconPlus} 
                        name="referral" 
                        label="Referral Code" 
                        formik={formik}/>
                    </div>
                </Slide>
            </div> 

            <div className='w-3/12'>
                <Button type='submit' color="#FF5000">
                    <div className='flex items-center gap-3'>
                        {
                            loading ? 
                            <div className='w-5 h-5'><Spinner /></div> :
                            <p className='text-white font-semibold text-sm'>Register</p> 
                        }
                    </div>
                </Button>
            </div>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default Register;
