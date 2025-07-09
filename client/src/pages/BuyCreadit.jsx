import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BuyCredit = () => {
  const [loader, setLoader] = useState(false);

  const { backendUrl, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  const initPay = async (order) => {
    setLoader(true)
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        const token = await getToken();
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-razor", res, { headers: { token } });
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added")
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoader(false);
  }

  const paymentRazorpay = async (planId) => {
    setLoader(true)
    try {
      const token = await getToken();

      const { data } = await axios.post(backendUrl + "/api/user/pay-razor", { planId }, { headers: { token } });

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Payment initiation failed");
    } finally {
      setLoader(false);
    }
  }

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

            <button disabled={loader} onClick={() => paymentRazorpay(plan.id)} className={`px-10 bg-gray-950 text-white text-xs py-2 text-center rounded-md hover:bg-gray-700 transition-all duration-300 ${loader && "bg-gray-700"}`}>{plan.btn}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit