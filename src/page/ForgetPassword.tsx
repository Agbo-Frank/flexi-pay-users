import { Logo, MailIcon, Spinner } from '../components/icons';
import AuthenticationForm from '../components/AuthenticationForm';

import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { useForgotPasswordMutation } from '../redux/slice/Auth'

import { IForgetPassword } from './interface'

import { Link } from 'react-router-dom'
import { useFormik, FormikConfig, FormikHelpers } from 'formik';
import * as Yup from 'yup';

export function ForgetPassword() {
    let [sendRequest, { isLoading: loading }] =  useForgotPasswordMutation()

    let initialValues: IForgetPassword = {
        email: '',
    }

    async function onSubmit (value: IForgetPassword, formikHelpers: FormikHelpers<IForgetPassword | any>){
        try{
            console.log(value)
            let data = await sendRequest(value).unwrap()
            console.log(data)
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            email: Yup
                    .string()
                    .required('email field isRequired')
                    .email('Invalid email address'),
        })
    }

    const formik: FormikConfig<IForgetPassword>  | any= useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
  return (
    <AuthenticationForm>
        <div className='flex justify-between items-center w-full py-6 border-b border-solid border-grey-100'>
            <Logo />
            <div className='flex gap-5 items-center text-grey-200'>
            <span>Don’t have an account?</span>
            <Link to="/register" className='py-2  px-8 border border-solid border-grey-100 rounded-full'>Register</Link>
            </div>
        </div>

        <div className='my-20'>
            <div>
            <h2 className='text-primary-dark-blue font-bold text-4xl'>Reset Your Password</h2>
            <small className='block mt-3 text-lg text-grey-300'>A password reset code will be sent to your email</small>
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
    </AuthenticationForm>
  );
}

export default ForgetPassword;
