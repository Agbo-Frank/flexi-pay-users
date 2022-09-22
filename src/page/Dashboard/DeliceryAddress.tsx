import { Button, Skeleton } from "@mui/material"
import { useDispatch } from "react-redux"
import { EditIcon } from "../../components/icons"
import { IUser } from "../../interface"
import { toggleAddAddress, toggleEditProfile } from "../../redux/slice/modal"

interface IDeliveryAddress{
    user?: IUser,
    loading: boolean
}


export function DeliveryAddress({ user, loading }: IDeliveryAddress){
    let dispatch = useDispatch()
    console.log(user)
    return(
        <div className="rounded-xl border pt-5 sm:pt-10 pb-5 mt-3 sm:mt-5 px-5 sm:px-7 w-full bg-white">
            <div className="text-grey-200 leading-9 capitalize">
                {
                    loading ?
                    <>
                        <Skeleton variant="text" sx={{fontSize: 16}} width={'80%'}/>
                        <Skeleton variant="text" sx={{fontSize: 16}} width={'80%'}/>
                        <Skeleton variant="text" sx={{fontSize: 16}} width={'80%'}/>
                    </> :
                    user?.address ?
                    <div>
                        <p>{user?.address?.house_address}</p>
                        <p>{user?.address.nearest_bus_stop + " " + user?.address?.city}</p>
                        <p>{user?.address?.state}</p>
                        <Button
                            variant="outlined"
                            size="large"
                            color="secondary"
                            onClick={() => dispatch(toggleAddAddress())}>
                                Edit Address
                        </Button>
                    </div>:
                    <div className="flex flex-col justify-between space-y-3 items-center h-full">
                        <i className="fa-solid fa-house text-[#E8E5FF] text-[40px] sm:text-[50px]"></i>
                        <span className="text-center text-[#545362] text-lg font-medium">Delivery Address Needed</span>
                        <span className="text-center text-[#545362] text-sm font-light">You currently don’t have your delivery address saved. kindly add your delivery address. </span>
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => dispatch(toggleEditProfile())}
                        >
                            Add Address
                        </Button> 
                    </div>
                }
            </div>
        </div>
    )
}

export default DeliveryAddress