import { addDoc, doc, updateDoc, query, where, getDoc, getDocs } from 'firebase/firestore';
import { FormikHelpers, useFormik } from 'formik';
import { contactInfo, fireDB } from '../../config/firebase'
import * as Yup from 'yup'
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import { FLEXIPAY_COOKIE } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { toggleSnackBar } from '../../redux/slice/modal';
import { Dispatch, SetStateAction } from 'react';

export function FPFormikSubscribe(setLoading: Dispatch<SetStateAction<boolean>>){
    const [cookies, setCookie, removeCookie] = useCookies([FLEXIPAY_COOKIE]);
    const dispatch = useDispatch()

    let initialValues = {
        email: "",
        phone: ""
    }
    
    async function onSubmit(value: typeof initialValues, formikHelpers: FormikHelpers<any>){
        setLoading(true)
        let uuid = cookies[FLEXIPAY_COOKIE]
        let data: any;

        if (!uuid || uuid == ""){
            let id = uuidv4()
            setCookie(FLEXIPAY_COOKIE, id, {path: '/'})
            uuid = id
        }
        try{
            let doc_ref = query(contactInfo, where('id', "==", uuid))
            let docs = await getDocs(doc_ref)
            if(docs?.docs[0]?.data()){
                docs?.docs?.forEach(async (d) => {
                    if(d.data().id === uuid){
                        data = await updateDoc(doc(fireDB, "contact_info", d.id), {...docs.docs[0].data(),...value})
                        console.log(data)
                    }
                })
                 
            }
            else{
                data = await addDoc(contactInfo, {...value, id: uuid})
                console.log(data)
            }
            formikHelpers.resetForm()
            dispatch(toggleSnackBar({
                open: true,
                message: "Thank You!",
                severity: 'success'
            }))
        }
        catch(err){
            console.log(err)
        }
        setLoading(false)
    }
    

    let validationSchema = () => {
        return Yup.object({
            phone: Yup.number(),
            email: Yup.string().email('Invalid email address'),
        })
    }

    return useFormik({
        onSubmit,
        validationSchema,
        initialValues
    })
}