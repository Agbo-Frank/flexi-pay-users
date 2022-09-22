import {  MailIcon, Spinner } from '../../components/icons';

import FormInput from '../../components/FormInput';
import { useForgotPasswordMutation } from '../../redux/api/Auth'
import { FPFormikForgetPassword } from './service';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export function ForgetPassword() {
    let navigate = useNavigate()
    let [sendRequest, { isLoading: loading, data }] =  useForgotPasswordMutation()

    let formik = FPFormikForgetPassword(sendRequest)
  return (
    <>
        <div className='my-20'>
            <div>
            <h2 className='text-primary-dark-blue font-bold text-4xl'>Reset Your Password</h2>
            <small className='block mt-3 text-lg text-grey-300'>A password reset code will be sent to your email</small>
            {data && <p>{data?.message}</p>}
            </div>

            <form className='my-10' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col justify-start gap-3 w-5/12'>
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
                            onClick={() => navigate(-1)}>
                                Cancel
                        </Button>
                        <Button 
                            type='submit' 
                            variant='contained'
                            color="secondary">
                                Send Code
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </>
  );
}

export default ForgetPassword;
