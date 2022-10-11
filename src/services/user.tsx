import { IChangePassword, IDeliveryAddress, IResponse, ITrigger, IUser } from "../interface";
import * as Yup from 'yup';
import { FormikConfig, FormikHelpers, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toggleEditProfile, toggleSnackBar } from "../redux/slice/modal";
import { useGetUserQuery } from "../redux/api/User";
import { IAddAddress } from "../components/interface";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { editField } from "../utils";


export function FPFormikEditUser(edit: ITrigger<Partial<IUser>, IResponse<null | any>>, done: () => void | any){
    let dispatch = useDispatch()
    let { data: user } = useGetUserQuery()

    let initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        state: '',
        city: '',
        gender: '',
        address: '',
        dob: '',
        nearest_bus_stop: "",
        house_address: "",
        postal_code: "",
    }

    async function onSubmit (value: Partial<IUser> | any, formikHelpers: FormikHelpers<IUser| any>){
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
            if(data){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))

                done() 
            }
        }
        catch(err){
            console.log(err)
            if(err){
                let error: any = err
                formikHelpers.setErrors(error.data.errors)

                if(error.data.errors){
                    dispatch(toggleSnackBar({
                        message: error.data.message,
                        open: true,
                        severity: 'error'
                    }))
                }
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
            
            if(data){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))

                if(data.status === 'success'){
                    dispatch(toggleEditProfile())
                }
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

export function FPFormikAddDeliveryAddress(
    body: IDeliveryAddress | null,
    type: "create" | "edit",
    editAddress: ITrigger<IDeliveryAddress, IResponse<{data: null}>> | any,
    createAddress: ITrigger<Omit<IAddAddress, 'id'>, IResponse<{data: null}>>,
    done: () => void | any
){
    const dispatch = useDispatch()

    let initialValues = {
        name: '',
        phone_number: "",
        state: "",
        city: "",
        nearest_bus_stop: "",
        house_address: "",
        postal_code: "",
        is_default: 1
    }


    async function onSubmit(value: IDeliveryAddress | any, formikHelpers: FormikHelpers<IDeliveryAddress | any>){
        console.log(value, type)
        try{
            let data: IResponse<{data: null | any}>
            if(type === "edit"){
                value = {
                    name: editField(body, value, 'name'),
                    phone_number: editField(body, value, 'phone_number'),
                    state: editField(body, value, 'state') ,
                    city: editField(body, value, 'city'),
                    nearest_bus_stop: editField(body, value, 'nearest_bus_stop'),
                    house_address: editField(body, value, 'house_address'),
                    postal_code: editField(body, value, 'postal_code'),
                    is_default: editField(body, value, 'is_default'),
                    id:  body?.id
                }
                console.log(value, type)
                data = await editAddress(value).unwrap()
            }
            else{
                data = await createAddress(value).unwrap()
            }
            
            if(data){
                dispatch(toggleSnackBar({
                    message: data.message,
                    open: true,
                    severity: data.status === 'success' ? 'success' : 'error'
                }))

                if(data.status === 'success'){
                    done()
                    formikHelpers.resetForm()
                }
            }
        }
        catch(err){
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
            name: Yup.string(),
            phone_number: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            nearest_bus_stop: Yup.string(),
            house_address: Yup.string(),
            postal_code: Yup.string(),
        })
    }
    return useFormik({
        onSubmit,
        validationSchema,
        initialValues
    })
}

export async function removeDeliveryAddress(
    body: { id: number | string | null}, 
    rmDeliveryAddress: ITrigger<{ id: string | number | null}, IResponse<{data: null | any}>>,
    dispatch: Dispatch<AnyAction>,
    done: () => void | any
){
    try{
        let data = await rmDeliveryAddress(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                message: data.message,
                severity: data.status === 'success' ? 'success' : 'error'
            }))

            if(data.status === 'success'){
                done()
            }
        }
    }
    catch(err){
        let error: any = err
        if(error?.data){
            dispatch(toggleSnackBar({
                open: true,
                severity: 'error',
                message: error?.data?.message || "an error just occured"
            }))
        }
    }
}

export async function toggleDeliveryAddressDefault(
    body: any | IDeliveryAddress, 
    editAddress: ITrigger<IDeliveryAddress, IResponse<{data: null | any}>> ,
    dispatch: Dispatch<AnyAction>,
    done?: () => void | any
){
    console.log(body)
    body={
        ...body,
        is_default: 1
    }
    console.log(body)
    try{
        let data = await editAddress(body).unwrap()
        if(data){
            dispatch(toggleSnackBar({
                open: true,
                message: data.message,
                severity: data.status === 'success' ? 'success' : 'error'
            }))

            if(data.status === 'success' && done){
                done()
            }
        }
    }
    catch(err){
        let error: any = err
        if(error?.data){
            dispatch(toggleSnackBar({
                open: true,
                severity: 'error',
                message: error?.data?.message || "an error just occured"
            }))
        }
    }
}