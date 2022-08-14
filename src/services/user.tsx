import { IResponse, ITrigger, IUser } from "../interface";
import * as Yup from 'yup';
import { FormikConfig, useFormik } from "formik";


export function FPFormikEditUser(edit: ITrigger<Partial<IUser>, IResponse<null | any>>){
    let initialValues: IUser = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        state: '',
        lga: '',
        address: '',
        DOB: ''
    }

    async function onSubmit (value: IUser){
        console.log(value)
        let data = await edit(value).unwrap()
        console.log(data)
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