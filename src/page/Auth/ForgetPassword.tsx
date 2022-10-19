import {  Logo, MailIcon, Spinner } from '../../components/icons';

import FormInput from '../../components/FormInput';
import { useForgotPasswordMutation } from '../../redux/api/Auth'
import { FPFormikForgetPassword } from './service';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { AuthenticationForm } from '../../components';

export function ForgetPassword() {
    let navigate = useNavigate()
    let [sendRequest, { isLoading: loading, data }] =  useForgotPasswordMutation()

    let formik = FPFormikForgetPassword(sendRequest)
  return (
    <AuthenticationForm>
        <div className='flex justify-between items-center w-full px-2 py-3 sm:py-6 border-b border-solid border-grey-100'>
            <Logo />
            <div className='hidden md:flex gap-5 items-center text-grey-200'>
                <span>Already have an account?</span>
                <Link to="/login" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Login</Link>
            </div>
        </div>
        <div className='mx-auto sm:mx-0 mt-5 sm:my-20 px-2 flex flex-col sm:items-center md:text-left md:items-start sm:w-9/12'>
            <div>
            <h2 className='text-primary-dark-blue font-bold text-4xl'>Reset Your Password</h2>
            <small className='block mt-3 text-lg text-grey-300'>A password reset code will be sent to your email</small>
            {data && <p>{data?.message}</p>}
            </div>

            <form className='my-10' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col justify-start gap-3 '>
                    <FormInput 
                    type='email' 
                    Icon={MailIcon} 
                    name="email" 
                    label="Email"
                    formik={formik} />

                    <div className='flex justify-between items-center w-full gap-3'>
                        <Button
                            variant='outlined'
                            color="secondary"
                            size="large"
                            fullWidth
                            onClick={() => navigate(-1)}>
                                Cancel
                        </Button>
                        <Button 
                            type='submit' 
                            fullWidth
                            size="large"
                            variant='contained'
                            color="secondary">
                                Send Code
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </AuthenticationForm>
  );
}

export default ForgetPassword;
