import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonials = () => {
  return (
    <div>
        {/*  */}

        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Customer Testimonials</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4 py-8 mt-6'>
            {testimonialsData.map((item,index) => (
                <div className='bg-white rounded-xl p-6 drop-shadow-md max-w-lg m-auto flex flex-col transition-all duration-500 hover:scale-105' key={index}>
                    <p className='text-4xl text-gray-500'>”</p>
                    <p className='text-sm text-gray-500'>{item.text}</p>
                    <div className='flex gap-2 mt-5 items-center'>
                        <img src={item.image} className='w-10 h-10  rounded-full' alt="" />
                        <div>
                            <p>{item.author}</p>
                            <p className='text-sm text-gray-500'>{item.jobTitle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Testimonials