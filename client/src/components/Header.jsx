import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {
    const {removeBg} = useContext(AppContext);

    return (
        <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
            {/* Left Side */}
            <div >
                <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br className='max-sm:hidden' /> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent '>background</span> from <br className='max-sm:hidden' /> images for free.</h1>
                <p className='my-6 text-[15px] text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br className='max-sm:hidden' />
                    Quis ut nulla cum unde atque ducimus praesentium cupiditate reprehenderit. </p>
                <div>
                    <input onChange={(e) => removeBg(e.target.files[0])} accept='image/*' type="file" id='upload1' hidden/>
                    <label className='inline-flex gap-3 px-8 py-3.5 cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700 rounded-full' htmlFor="upload1">
                        <img width={20} src={assets.upload_btn_icon} alt="" />
                        <p className='text-white text-sm'>Upload Your Image</p>
                    </label>
                </div>
            </div>

            {/* Right Side */}
            <div>
                <img src={assets.header_img} className='w-full max-w-md' alt="" />
            </div>
        </div>
    )
}

export default Header