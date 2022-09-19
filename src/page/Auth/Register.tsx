import { Logo, UserIcon, MailIcon, PadLock, PhoneIcon, UserIconPlus, Spinner } from '../../components/icons';

import {Button, FormInput } from '../../components';
import { useRegisterMutation } from '../../redux/api/Auth'

import { Link } from 'react-router-dom'
import { useState } from 'react';
import Slide from 'react-reveal/Slide'

import Switch from '../../components/Switch';
import { Alert, Collapse } from '@mui/material';
import { FPFormikRegister } from './service';

export function Register() {
    let [hasReferral, setHasReferral] = useState<boolean>(false)
    let [register, { isLoading: loading, data }] =  useRegisterMutation()

    let formik = FPFormikRegister(register)
    
  return (
    <>
        <div className='mx-auto mt-5 sm:my-20 px-2 flex flex-col sm:items-center md:text-left md:items-start'>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-2xl sm:text-4xl'>Welcome to FlexiPay</h2>
                <small className='block mt-1 sm:mt-3 sm:text-lg text-base text-grey-300'>Register your account</small>
            </div>

            <Collapse in={data?.status === 'success'}>
                <Alert severity="info">{data?.message}</Alert>
            </Collapse>
            
            <form className='my-5 sm:my-10 w-full sm:w-10/12' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col md:flex-row md:justify-start md:space-x-3'>
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
                <div className='fflex flex-col md:flex-row justify-start gap-3'>
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
                <div className='flex flex-col md:flex-row justify-start gap-3'>
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

            {/* <div className={`relative my-4 ${hasReferral ? 'my-4' : 'mt-4'}`}>
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
            </div>  */}

            <div className='w-full sm:w-3/12 mt-5 sm:mt-0'>
                <Button type='submit' color="#FF5000">
                    <div className='flex items-center gap-3'>
                        {
                            loading ? 
                            <div className='w-5 h-5'><Spinner /></div> :
                            <p className='text-white font-semibold text-sm'>Register</p> 
                        }
                    </div>
                </Button>
                <small className='text-center block sm:hidden'>Already have an account? <Link to="/auth/login" className='text-primary-orange-200'>Login</Link></small>
            </div>
            </form>
        </div>
    </>
  );
}

export default Register;
