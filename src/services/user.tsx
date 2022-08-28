import { IChangePassword, IResponse, ITrigger, IUser } from "../interface";
import * as Yup from 'yup';
import { FormikConfig, FormikHelpers, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toggleEditProfile, toggleSnackBar } from "../redux/slice/modal";
import { useGetUserQuery } from "../redux/slice/User";


export function FPFormikEditUser(edit: ITrigger<Partial<IUser>, IResponse<null | any>>){
    let dispatch = useDispatch()
    let { data: user } = useGetUserQuery()

    let initialValues: IUser = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        state: '',
        city: '',
        gender: '',
        address: '',
        dob: ''
    }

    async function onSubmit (value: Partial<IUser>, formikHelpers: FormikHelpers<IUser| any>){
        value = {
            first_name: value.first_name || user?.result.data.first_name,
            last_name: value.last_name || user?.result.data.last_name,
            email: value.email || user?.result.data.email,
            phone_number: value.phone_number || user?.result.data.phone_number,
            state: value.state || user?.result.data.state,
            city: value.city || user?.result.data.city,
            gender: value.gender || user?.result.data.gender,
            house_address: value.house_address || user?.result.data.house_address,
            dob: value.dob || user?.result.data.dob,
            nearest_bus_stop: value.nearest_bus_stop || user?.result.data.nearest_bus_stop,
            postal_code: value.postal_code || user?.result.data.postal_code
        }
        console.log(value)
        try{
            let data = await edit(value).unwrap()
            if(data.status === 'success'){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'success'
                }))

                dispatch(toggleEditProfile())
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
            }
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
            firstName: Yup.string(),
            lastName: Yup.string(),
            email: Yup.string(),
            phoneNumber: Yup.string(),
            state: Yup.string(),
            lga: Yup.string(),
            address: Yup.string()
        })
    }

    const formik: FormikConfig<typeof initialValues>  | any = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}

export function FPFormikChangePassword(changePassword: ITrigger<IChangePassword, IResponse<{data: null}>>){
    let dispatch = useDispatch()

    let initialValues = {
        previous_password: '',
        password: '',
        password_confirmation: '',
    }

    async function onSubmit (value: IChangePassword | any, formikHelpers: FormikHelpers<IChangePassword| any>){
        value = {
            ...value,
            old_password: value.previous_password
        }
        try{
            let data = await changePassword(value).unwrap()
            
            if(data.status === 'success'){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'success'
                }))

                dispatch(toggleEditProfile())
            }
            else{
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: 'error'
                }))
            }
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
            previous_password: Yup.string().required("The old password field is required"),
            password: Yup.string().required("The password field is required").min(8),
            password_confirmation: Yup.string().required("the confirm password field is required").min(8),
        })
    }
    const formik = useFormik({ 
        initialValues, 
        validationSchema, 
        onSubmit
    })

    return formik
}