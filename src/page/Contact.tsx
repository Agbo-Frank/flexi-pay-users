import { FormInput } from "../components"
import { FacebookIcon, InstagramIcon, MailIcon, MarkCircleIcon, PhoneIcon, PlanIcon, TwitterIcon, UserIcon, YoutubeIcon } from "../components/icons"
import DashboardWrapper from "../components/DashboardWrapper"
import Button from "../components/Button"
import {FLEXIPAY_FACEBOOK, FLEXIPAY_TWITTER, FLEXIPAY_YOUTUBE} from '../utils/constants'

import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';


export function Contact () {
    let initialValues = {
        name: '',
        subject: '',
        email: '',
        phoneNumber: ''
    }

    function onSubmit (value: typeof initialValues){
        console.log(value)
    }

    let validationSchema = () => {
        return Yup.object({
            name: Yup
                .string()
                .required('name field is Required'),
            subject: Yup
                .string()
                .required('subject field isRequired'),
            email: Yup
                .string()
                .required('email field isRequired'),
            phoneNumber: Yup.string(),
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })
    return(
        <DashboardWrapper>
            <div className="flex flex-col">
                <div className="bg-white rounded-xl p-3 sm:p-6 mb-5">
                    <h3 className="font-semibold text-primary-dark-blue">Support</h3>
                    <div className="bg-grey-900 rounded-xl py-4 sm:py-10 mt-7">
                    {
                        <>
                            
                                <form className="xl:w-10/12 mx-auto px-3">
                                    <p className="text-primary-dark-blue sm:pl-3 mb-3 sm:mb-5 font-medium">Feel Free to write to us</p>
                                    <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:space-x-2 h-fit">
                                        <div className="sm:w-4/12">
                                            <FormInput type="text" Icon={UserIcon} name="name" label="Full name" formik={formik}/>
                                            <FormInput type="text" name="subject" label="subject" formik={formik}/>
                                            <FormInput type="text" Icon={MailIcon} name="email" label="email" formik={formik}/>
                                            <FormInput type="text" Icon={PhoneIcon} name="phoneNumber" label="Phone Number" formik={formik}/>
                                        </div>
                                        <div className="sm:w-7/12 flex flex-col justify-between"> 
                                            <textarea 
                                            className="w-full rounded-xl bg-white p-5 h-4/6 border border-solid border-grey-1000 resize-none"
                                            placeholder="Your Message Here..."></textarea>
                                            <div className="my-3 sm:ml-auto sm:mb-4 sm:w-28">
                                                <Button color="#FF5000">
                                                    <div className="flex space-x-2 items-center">
                                                        <p>Send</p>
                                                        <PlanIcon color="white" size="14"/>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                        </>

                        // <>
                        //     <div className="flex flex-col justify-center w-5/12 mx-auto">
                        //         <div className="mx-auto my-7">
                        //             <MarkCircleIcon color="#6DBD28" size="55"/>
                        //         </div>
                        //         <p className="text-center font-light">
                        //             Thank you for reaching out to us, we’ve received your message, and we would get back to you in no time.
                        //             <br />
                        //             You can follow us on our social media handles to
                        //         </p>
                        //     </div>
                        // </>
                    }
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 mb-5">
                    <h3 className="font-semibold text-primary-dark-blue">Follow us</h3>
                    <div className="flex space-x-5 items-center mt-4">
                        <TwitterIcon />
                        <FacebookIcon />
                        <YoutubeIcon  size="70"/>
                        <InstagramIcon />
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Contact