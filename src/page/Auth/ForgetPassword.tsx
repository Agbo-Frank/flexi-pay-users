import {  MailIcon, Spinner } from '../../components/icons';

import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { useForgotPasswordMutation } from '../../redux/slice/Auth'
import { FPFormikForgetPassword } from './service';

export function ForgetPassword() {
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

                    <div className='flex justify-between items-center w-full gap-6'>
                        <Button outline={true} color="#FF5000">
                            <p className='font-semibold text-sm mx-5'>Cancel</p>
                        </Button>
                        <Button type='submit' color="#FF5000">
                            <div className='flex items-center gap-3'>
                                {
                                    loading ? 
                                    <div className='w-5 h-5'><Spinner /></div> :
                                    <p className='font-semibold text-sm mx-5'>Send Code</p>
                                }
                            </div>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </>
  );
}

export default ForgetPassword;
