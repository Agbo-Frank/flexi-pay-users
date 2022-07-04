import { FormInput } from "../components"
import { FacebookIcon, MailIcon, MarkCircleIcon, PhoneIcon, PlanIcon, TwitterIcon, UserIcon } from "../components/icons"
import DashboardWrapper from "../components/DashboardWrapper"
import Button from "../components/Button"

import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import * as Yup from 'yup';


function Contact () {
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
                <div className="bg-white rounded-4xl p-6 mb-5">
                    <h3 className="font-semibold text-primary-dark-blue">Support</h3>
                    <div className="bg-grey-900 rounded-4xl py-10 mt-7">
                    {
                        // <>
                        //     
                        //         <form className="xl:w-10/12 mx-auto">
                        //             <p className="text-primary-dark-blue pl-3 mb-5 font-medium">Feel Free to write to us</p>
                        //             <div className="w-full flex justify-between items-stretch gap-2 h-fit">
                        //                 <div className="w-4/12">
                        //                     <FormInput type="text" Icon={UserIcon} name="name" label="Full name" formik={formik}/>
                        //                     <FormInput type="text" name="subject" label="subject" formik={formik}/>
                        //                     <FormInput type="text" Icon={MailIcon} name="email" label="email" formik={formik}/>
                        //                     <FormInput type="text" Icon={PhoneIcon} name="phoneNumber" label="Phone Number" formik={formik}/>
                        //                 </div>
                        //                 <div className="w-7/12 flex flex-col justify-between"> 
                        //                     <textarea 
                        //                     className="w-full rounded-3xl bg-white p-5 h-4/6 border border-solid border-grey-1000 resize-none"
                        //                     placeholder="Your Message Here..."></textarea>
                        //                     <div className="ml-auto mb-4 w-28">
                        //                         <Button color="#FF5000">
                        //                             <div className="flex gap-2 items-center">
                        //                                 <p>Send</p>
                        //                                 <PlanIcon color="white" size="14"/>
                        //                             </div>
                        //                         </Button>
                        //                     </div>
                        //                 </div>
                        //             </div>
                        //         </form>
                        // </>

                        <>
                            <div className="flex flex-col justify-center w-5/12 mx-auto">
                                <div className="mx-auto my-7">
                                    <MarkCircleIcon color="#6DBD28" size="55"/>
                                </div>
                                <p className="text-center font-light">
                                    Thank you for reaching out to us, we’ve received your message, and we would get back to you in no time.
                                    <br />
                                    You can follow us on our social media handles to
                                </p>
                            </div>
                        </>
                    }
                    </div>
                </div>

                <div className="bg-white rounded-4xl p-6 mb-5">
                    <h3 className="font-semibold text-primary-dark-blue">Follow us</h3>
                    <div className="flex gap-5 items-center mt-8">
                        <TwitterIcon />
                        <FacebookIcon />
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    )
}

export default Contact