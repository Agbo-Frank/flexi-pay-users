import { Send } from "@mui/icons-material";
import Button from "./Button";
import { Spinner } from "./icons";



export function SubscribeInput({formik, loading, name}: {formik: any, loading: boolean, name: string}){
    return(
        <>
            <div className="w-full flex items-stretch gap-1 ">
                <input 
                    type='email' 
                    // name='email' 
                    {...formik.getFieldProps(name)}
                    placeholder="Enter email" 
                    className="w-[80%] block px-3 py-auto h-auto rounded-md text-black" 
                />
                <div className='w-[20%]'>
                    <Button type='submit' color="#FF5000" padding={false}>
                        <div className='flex items-center gap-3'>
                            {
                                loading ? 
                                <div className='w-5 h-5'><Spinner /></div>: 
                                <>
                                    <span className="hidden sm:block">Subscribe</span>
                                    <span className="block sm:hidden"><Send /></span>
                                </>
                            }
                        </div>
                    </Button>
                </div>
            </div>
            <small className="block w-full whitespace-nowrap truncate text-crimson text-xs">{formik.errors['email']}</small>
        </>
    )
}

export default SubscribeInput