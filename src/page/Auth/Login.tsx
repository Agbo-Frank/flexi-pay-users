import { Logo, MailIcon, PadLock, Spinner } from '../../components/icons';

import {Button, FormInput, AuthenticationForm} from '../../components';
import { useLoginMutation } from '../../redux/api/Auth'

import { Link, useSearchParams } from 'react-router-dom'
import { FPFormikLogin } from './service';
import { Alert, Collapse } from '@mui/material';

export function Login() {
    let [login, { isLoading: loading, data, error }] =  useLoginMutation()
    let searchParams = useSearchParams()[0]
    
    let formik = FPFormikLogin(login)
  return (
    <AuthenticationForm>
        <div className='flex justify-between items-center w-full px-2 py-3 sm:py-6 border-b border-solid border-grey-100'>
            <Logo />
            <div className='hidden md:flex gap-5 items-center text-grey-200'>
                <span>Don’t have an account?</span>
                <Link to="/register" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Register</Link>
            </div>
        </div>
        <div className='mx-auto sm:mx-0 mt-5 sm:my-20 px-2 flex flex-col sm:items-center md:text-left md:items-start sm:w-9/12'>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-2xl sm:text-4xl'>Hi, You’ve Been Missed</h2>
                <small className='block mt-1 sm:mt-3 sm:text-lg text-base text-grey-300'>Log in to your account</small>
            </div>
            <Collapse in={
                data?.status === 'failed' || data?.status === 'success'
            } className='w-full'>
                <Alert className='w-full' severity={data?.status === 'success' ? "success" : "error"}>{data?.message}</Alert>
            </Collapse>
            <Collapse in={searchParams.has('redirect')} className='w-full'>
                <Alert severity="error" className='w-full'>Please login</Alert>
            </Collapse>
            
            <form className='my-5 sm:my-8 w-full' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col '>
                    <FormInput 
                    type='email' 
                    Icon={MailIcon} 
                    name="email" 
                    label="Email"
                    formik={formik} />
                    <FormInput 
                    type='password' 
                    Icon={PadLock} 
                    name="password" 
                    label="Password"
                    formik={formik}/>
                </div>
                <div className='w-full mt-3 sm:mt-0'>
                    <Button type='submit' color="#FF5000">
                        <div className='flex items-center gap-3'>
                            {
                                loading ? 
                                <div className='w-5 h-5'><Spinner /></div>: 
                                <p className='text-white font-semibold text-sm'>Login</p>
                            }
                        </div>
                    </Button>
                    <small className='text-center block'>Don’t have an account? <Link to="/register" className='text-primary-orange-200'>Create An Account</Link></small>
                </div>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default Login;
