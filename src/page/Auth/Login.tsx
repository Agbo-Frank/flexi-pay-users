import { Logo, MailIcon, PadLock, Spinner } from '../../components/icons';

import {Button, FormInput, AuthenticationForm, Toast2} from '../../components';
import { useLoginMutation } from '../../redux/slice/Auth'

import { Link, useSearchParams } from 'react-router-dom'
import { FPFormikLogin } from './service';
import { Alert, Collapse } from '@mui/material';

export function Login() {
    let [login, { isLoading: loading, data, error }] =  useLoginMutation()
    let searchParams = useSearchParams()[0]
    
    let formik = FPFormikLogin(login)
  return (
    <>
        <div className='mx-auto my-20 flex flex-col items-center text-center md:text-left md:items-start'>
            <div>
                <h2 className='text-primary-dark-blue font-bold [320px]:text-xl text-3xl xs:text-4xl'>Hi, You’ve Been Missed</h2>
                <small className='block mt-3 text-lg text-grey-300'>Log in to your account</small>
            </div>
            <Collapse in={
                data?.status === 'failed' || data?.status === 'success'
            }>
                <Alert severity={data?.status === 'success' ? "success" : "error"}>{data?.message}</Alert>
            </Collapse>
            <Collapse in={searchParams.has('redirect')}>
                <Alert severity="error">Please login</Alert>
            </Collapse>
            
            <form className='my-10 w-11/12' onSubmit={formik.handleSubmit}>
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
                <Link to="/auth/forget-password" className='text-primary-blue text-sm float-right'>Forget password?</Link>
            {/* </div> */}
            <div className='w-3/12'>
                <Button type='submit' color="#FF5000">
                    <div className='flex items-center gap-3'>
                        {
                            loading ? 
                            <div className='w-5 h-5'><Spinner /></div>: 
                            <p className='text-white font-semibold text-sm'>Login</p>
                        }
                    </div>
                </Button>
            </div>
            </form>
        </div>
    </>
  );
}

export default Login;
