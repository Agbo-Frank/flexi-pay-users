import React from 'react'
import { Logo } from '../../components/icons'
import order from '../../asset/banner7.png'
import { Button, Divider } from '@mui/material'

function OrderSummary() {
  const detail = [
    {id: 1, title: "Discount", value: "-$XX.XX"},
    {id: 2, title: "Price after discount", value: "$XX.XX"},
    {id: 3, title: "Product ID", value: "ID12345"},
    {id: 4, title: "Variant", value: "Variant name"},
    {id: 5, title: "Vendor", value: "Vendor name"},
    {id: 6, title: "Weight", value: "XXlbs/kg"},
    {id: 7, title: "Quantity", value: "1"},
  ]

  const total = [
    {id: 1, title: "Subtotal price", value: "$XX.XX"},
    {id: 2, title: "Discount", value: "-$XX.XX"},
    {id: 3, title: "Shipping price", value: "$XX.XX"},
  ]
  return (
    <div className='w-full text-grey-300 text-center'>
      <div className='w-full py-5 bg-primary-dark-blue' />
      <div className='w-full md:w-[70%] mx-auto border-2 rounded-xl'>
        <div className='py-5 w-auto mx-auto flex justify-center items-center'>
          <Logo />
        </div>
        <div className='text-center py-10 bg-primary-dark-blue text-white lg:px-[25%] font-semibold space-y-5'>
          <h1 className='text-2xl uppercase font-black'>order confirmation</h1>
          <p className=''>(Name), thank you for your order!</p>
          <p className=''>We've received your order and will contact you soon as your package is shipped, You can find your purchase information below.</p>
        </div>
        <div className='w-full py-10 px-5 font-semibold'>
          <div className='text-center space-y-2'>
            <h1 className='text-gray-700 text-2xl capitalize font-black'>order summary</h1>
            <p className=''>June 15, 2021</p>
          </div>
          <div className='md:flex justify-between md:space-x-5 min-h-[400px] py-5'>
            <div className='rounded-xl w-full md:w-[40%] h-full'>
              <img alt='flexipay' src={order} className="w-full h-full rounded-xl" />
            </div>
            <div className='rounded-xl w-full md:w-[60%] h-full border-2 p-5'>
              <div className='flex justify-between'>
                <h1 className='text-gray-700 text-xl capitalize font-black'>product title</h1>
                <p>$XX.XX</p>
              </div>
              {detail.map((val: any, index: any)=>(
                <div className={`flex justify-between ${index === 1 && "mb-5"}`} key={val.id}>
                  <p>{val.title}</p>
                  <p>{val.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full space-y-3'>
            <h1 className='text-gray-700 text-2xl capitalize font-black'>order total</h1>
            <div className='w-full'>
              {total.map((val: any)=>(
                <div className='flex justify-between' key={val.id}>
                  <p>{val.title}</p>
                  <p>{val.value}</p>
                </div>
              ))}
            </div>
            <Divider />
            <div className='flex justify-between text-primary-orange-200'>
              <p>Total price:</p>
              <p>$XX.XX</p>
            </div>
          </div>
          <div className='w-full space-y-10'>
            <h1 className='text-gray-700 text-2xl capitalize font-black'>Billing and shipping</h1>
            <div className='w-full lg:px-[20%] space-y-5'>
              <div className='w-full flex justify-between text-start '>
                <div>
                  <h1 className='text-gray-700 text-xl capitalize font-black'>Billing</h1>
                  <p>Name and Last Name </p>
                  <p>Address 1</p>
                  <p>City, State</p>
                  <p>Zip code</p>
                  <p>Country</p>
                </div>
                <div>
                  <h1 className='text-gray-700 text-xl capitalize font-black'>Shipping</h1>
                  <p>Name and Last Name </p>
                  <p>Address 1</p>
                  <p>City, State</p>
                  <p>Zip code</p>
                  <p>Country</p>
                </div>
              </div>
              <div className='w-full flex justify-between text-start '>
                <div>
                  <h1 className='text-gray-700 text-xl capitalize font-black'>Payment method</h1>
                  <p>Visa **** **** **** **** </p>
                </div>
                <div>
                  <h1 className='text-gray-700 text-xl capitalize font-black'>Shipping method</h1>
                  <p>Standing shipping </p>
                </div>
              </div>
            </div>
            <div className=''>
              <button className='bg-primary-orange-200 rounded-xl w-[200px] h-[40px] hover:opacity-50 text-white'>Print</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderSummary