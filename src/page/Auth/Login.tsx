import { Logo, MailIcon, PadLock, Spinner } from '../../components/icons';

import {Button, FormInput, AuthenticationForm, Toast2} from '../../components';
import { useLoginMutation } from '../../redux/api/Auth'

import { Link, useSearchParams } from 'react-router-dom'
import { FPFormikLogin } from './service';
import { Alert, Collapse } from '@mui/material';

export function Login() {
    let [login, { isLoading: loading, data, error }] =  useLoginMutation()
    let searchParams = useSearchParams()[0]
    
    let formik = FPFormikLogin(login)
  return (
    <>
        <div className='mx-auto mt-5 sm:my-20 px-2 flex flex-col sm:items-center md:text-left md:items-start'>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-2xl sm:text-4xl'>Hi, You’ve Been Missed</h2>
                <small className='block mt-1 sm:mt-3 sm:text-lg text-base text-grey-300'>Log in to your account</small>
            </div>
            <Collapse in={
                data?.status === 'failed' || data?.status === 'success'
            }>
                <Alert severity={data?.status === 'success' ? "success" : "error"}>{data?.message}</Alert>
            </Collapse>
            <Collapse in={searchParams.has('redirect')}>
                <Alert severity="error">Please login</Alert>
            </Collapse>
            
            <form className='my-5 sm:my-10 w-full' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col md:flex-row md:justify-start md:space-x-3'>
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
            {/* <div className='flex justify-between'> */}
            {/* <Link to="/auth/register" className='text-primary-blue text-sm float-right'>Don’t have an account? Register</Link> */}
                <Link to="/auth/forget-password" className='text-primary-orange-200 text-xs'>Forgetten password?</Link>
            {/* </div> */}
                <div className='w-full sm:w-3/12 mt-5 sm:mt-0'>
                    <Button type='submit' color="#FF5000">
                        <div className='flex items-center gap-3'>
                            {
                                loading ? 
                                <div className='w-5 h-5'><Spinner /></div>: 
                                <p className='text-white font-semibold text-sm'>Login</p>
                            }
                        </div>
                    </Button>
                    <small className='text-center block'>Don’t have an account? <Link to="/auth/register" className='text-primary-orange-200'>Create An Account</Link></small>
                </div>
            </form>
        </div>
    </>
  );
}

export default Login;
