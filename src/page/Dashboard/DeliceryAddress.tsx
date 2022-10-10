import { NoLuggageOutlined } from "@mui/icons-material"
import { Button, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { EditIcon } from "../../components/icons"
import { IDeliveryAddress, IUser } from "../../interface"
import { useGetDeliveryAddressQuery, useLazyGetDeliveryAddressQuery } from "../../redux/api/User"
import { toggleAddAddress, toggleEditProfile } from "../../redux/slice/modal"


export function DeliveryAddress(){
    let dispatch = useDispatch()
    const [getDelivery, { loading, address }] = useLazyGetDeliveryAddressQuery({
        selectFromResult: ({ data, isLoading }) => ({
            address: data?.result.data,
            loading: isLoading
        })
    })
    let [deliveryAddress, setDeliveryAddress] = useState<IDeliveryAddress | null>(null)

    useEffect(() => {
        getDelivery()
            .unwrap()
            .then(data => {
                if(data?.status === "success"){
                    let defaultDeliveryAddress = data?.result?.data.find(address => address.is_default === 1)
                    setDeliveryAddress(defaultDeliveryAddress || null)
                }
                else{
                    setDeliveryAddress(null)
                }
            })
            .catch(err => {
                if (err){
                    setDeliveryAddress(null)
                }
            })
    }, [])

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
                    deliveryAddress ?
                    <div>
                        <p>{deliveryAddress.house_address}</p>
                        <p>{deliveryAddress?.nearest_bus_stop + " " + deliveryAddress?.city}</p>
                        <p>{deliveryAddress?.state}</p>
                        <Button
                            variant="outlined"
                            size="large"
                            color="secondary"
                            onClick={() => dispatch(toggleAddAddress({
                                open: true,
                                body: deliveryAddress,
                                type: "edit"
                            }))}>
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
                            onClick={() => dispatch(toggleAddAddress({
                                open: true,
                                body: null,
                                type: "create"
                            }))}
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