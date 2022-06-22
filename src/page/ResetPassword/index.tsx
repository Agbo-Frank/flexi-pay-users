import Logo from '../../components/icons/logo';
import PadLock from '../../components/icons/PadLock';

import { Link } from 'react-router-dom'

import { IResetPassword } from './interface';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';
import AuthenticationForm from '../../components/AuthenticationForm';

import { useFormik, FormikConfig } from 'formik';
import * as Yup from 'yup';

function ResetPassword() {
    let initialValues: IResetPassword = {
        password: '',
    }

    function onSubmit (value: IResetPassword){
        console.log(value)
    }
    let validationSchema = () => {
        return Yup.object({
            password: Yup
                    .string()
                    .required('password field is Required')
                    .min(6, 'Must be 6 characters or more'),
        })
    }

    const formik: FormikConfig<IResetPassword>  | any= useFormik({ 
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
                <h2 className='text-primary-dark-blue font-bold text-4xl'>Reset Your Password</h2>
                <small className='block text-lg text-grey-300 mt-3'>A password reset code will be sent to your email</small>
                <small className='text-lg text-primary-dark-blue'>Your email: mr..........@gmail.com</small>
            </div>

            <form className='my-10' onSubmit={formik.handleSubmit}>
                <div className='flex justify-start items-start gap-5'>
                    <FormInput 
                    type='password' 
                    Icon={PadLock} 
                    name="password" 
                    label="Password"
                    formik={formik}/>
                    <Button type='submit' color="#FF5000">
                        <p className='text-white font-semibold text-sm mx-4'>Submit Code</p>
                    </Button>
                </div>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default ResetPassword;
