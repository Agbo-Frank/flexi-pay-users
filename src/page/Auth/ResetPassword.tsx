import {Logo, PadLock, Spinner} from '../../components/icons';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

import { useSearchParams } from "react-router-dom";
import { FPFormikResetPassword } from './service';
import { useResetPasswordMutation } from '../../redux/api/Auth'
import { useState } from 'react';

export function ResetPassword() {
    let searchParams = useSearchParams()[0];
    let [token, setToken] = useState(searchParams.get('token'))
    let [email, setEmail] = useState(searchParams.get('email'))

    function hashEmail(email: string){
        let index = email.search('@')
        let substring = email.slice(5, index)
        return email.replace(substring, '***********')
    }

    // useEffect(() => {
    //     if(!searchParams.has("token") || !searchParams.has("temail")){
    //         dip
    //     }
    // }, [searchParams])

    let [reset, {data, isLoading: loading}] = useResetPasswordMutation()

    console.log(data)

    let formik = FPFormikResetPassword(reset, {token: `${token}`, email: `${email}`})
  return (
    <>
        <div className='my-20'>
            <div>
                <h2 className='text-primary-dark-blue font-bold text-4xl'>Reset Your Password</h2>
                <small className='block text-lg text-grey-300 mt-3'>A password reset code will be sent to your email</small>
                <small className='text-lg text-primary-dark-blue'>Your email: { email && hashEmail(email) }</small>
                <small className='text-lg text-primary-dark-blue'>{ data && data.message }</small>
            </div>

            <form className='my-10' onSubmit={formik.handleSubmit}>
                <div className='flex justify-start items-start gap-5 w-8/12'>
                    <FormInput 
                    type='password' 
                    Icon={PadLock} 
                    name="password" 
                    label="Password"
                    formik={formik}
                    />

                    <FormInput 
                    type='password' 
                    Icon={PadLock} 
                    name="password_confirmation" 
                    label="Confirm Password"
                    formik={formik}/>
                </div>

                <div className='w-3/12'>
                    <Button type='submit' color="#FF5000">
                        <div className='flex items-center gap-3'>
                            {
                                loading ? 
                                <div className='w-5 h-5'><Spinner /></div>: 
                                <p className='text-white font-semibold text-sm'>Submit Code</p>
                            }
                        </div>
                    </Button>
                </div>
            </form>
        </div>
    </>
  );
}

export default ResetPassword;
