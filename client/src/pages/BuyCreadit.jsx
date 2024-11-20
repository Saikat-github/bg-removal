import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCreadit = () => {
  return (
    <div className='min-h-[75vh] flex flex-col items-center my-10'>
      <p className='border rounded-full py-1 px-3 text-center text-sm'>Our Plans</p>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Choose the plan that's right for you</h1>

      <div className='flex flex-col sm:flex-row gap-10 mt-10'>
        {plans.map((plan, idx) => (
          <div key={idx} className='bg-white p-8 flex flex-col gap-6 drop-shadow-md rounded-md'>
            <img src={assets.logo_icon} className='w-6' alt="" />
            <div>
              <h1>{plan.id}</h1>
              <p className='text-xs text-gray-600'>{plan.desc}</p>
            </div>
            <div className='flex gap-1 items-baseline'>
              <p className='text-2xl'>₹{plan.price}</p>
              <p className='text-sm text-gray-600'>/{plan.credits} credits</p>
            </div>

            <button className='px-10 bg-gray-950 text-white text-xs py-2 text-center rounded-md hover:bg-gray-900 transition-all duration-300'>{plan.btn}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCreadit