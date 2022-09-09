import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { IInstallment, IResponse, ITrigger } from '../../interface';
import { toggleSnackBar } from '../../redux/slice/modal';


export function FPFormikCreateInstallment(createInstallment: ITrigger<Omit<IInstallment, 'installment_uuid' | 'uuid'>, IResponse<{data: null}>>){
    let dispatch = useDispatch()

    let initialValues = {
        amount: '',
        frequency: '',
        product_uuid: '',
        name: ''
    }

    async function onSubmit (value: typeof initialValues, formikHelpers: FormikHelpers<Omit<IInstallment, 'installment_uuid' | 'uuid'>| any>){
        try{
            let data = await createInstallment(value).unwrap()

            if(data){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))
            }
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)

                if(error?.data){
                    dispatch(toggleSnackBar({
                        message: error?.data.message,
                        open: true,
                        severity: 'error'
                    }))
                }
            }
        }
    }
    let validationSchema = () => {
        return Yup.object({
            name: Yup
                    .string()
                    .required('Please enter a name for this plan'),
            amount: Yup
                .string()
                .required('Please enter the the desired amount'),
            frequency: Yup
                .string()
                .required('Please the please enter the frequency')
        })
    }

    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}