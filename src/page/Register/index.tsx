import Logo from '../../components/icons/logo';
import UserIcon from '../../components/icons/UserIcon';
import MailIcon from '../../components/icons/MailIcon';
import PadLock from '../../components/icons/PadLock';
import PhoneIcon from '../../components/icons/PhoneIcon';
import UserIconPlus from '../../components/icons/UserIconPlus';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import AuthenticationForm from '../../components/AuthenticationForm'

import { Link } from 'react-router-dom'
import { useState } from 'react';
import { IRegister } from './interface'
import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';

function Register() {
    let [hasReferral, setHasReferral] = useState<boolean>(true)

    let initialValues: IRegister = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cPassword: '',
        phoneNumber: ''
    }

    function onSubmit (value: IRegister){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            firstName: Yup.string().required('first name field is Required'),
            lastName: Yup.string().required('last name field is Required'),
            password: Yup
                        .string()
                        .required('password field is Required')
                        .min(6, 'Must be 6 characters or more'),
            cPassword: Yup.string().required('Please confirm password'),
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
            phoneNumber: Yup.string().required('phone number field is Required'),
        })
    }

    const formik: FormikConfig<IRegister>  | any= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit: (value) => {
            console.log(value)
        }
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

            <form className='my-12' onSubmit={formik.handleSubmit}>
            <div className='flex justify-start gap-3'>
                <FormInput 
                type='text' 
                Icon={UserIcon} 
                name="firstName" 
                label="First name"
                formik={formik}/>
                <FormInput 
                type='text' 
                Icon={UserIcon} 
                name="lastName" 
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
                name="phoneNumber" 
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
                name="cPassword" 
                label="Confirm Password"
                formik={formik}/>
            </div>

            <div className={`mt-4 ${hasReferral && 'mb-6'}`}>
                <div className='flex items-center gap-3' onClick={() => setHasReferral(!hasReferral)}>
                <div className={`w-8 rounded-full bg-primary-blue p-0.5 ${!hasReferral ? 'bg-primary-blue' : 'bg-grey-400'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full ${hasReferral ? '' : 'ml-auto'}`}></div>
                    </div>
                    <p>Do you have a referal code?</p>
                </div>
                <div className={`w-2/6 mt-4 transition-display duration-1000 ${hasReferral ? 'hidden' : ' block'}`}>
                    <FormInput 
                    type='text' 
                    Icon={UserIconPlus} 
                    name="referral" 
                    label="Referral Code" 
                    formik={formik}/>
                </div>
            </div> 

            <Button color="#FF5000" type="submit">
                <p className='text-white text-sm font-semibold'>Register</p>
            </Button>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default Register;
