import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeLowVision } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { singup } from '../services/operations/authAPI'

const Signup = () => {

   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const navigate = useNavigate();

   const {
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const onSubmit = async (data) => {

      if (data.password !== data.confirmPassword) {
         toast.error("Passwords do not match");
         return;
      }
      setLoading(true);
      const formData = new FormData();

      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('confirmPassword', data.confirmPassword)

      await singup(formData, navigate);

      setLoading(false);
   }

   return (
      <div className='w-[40%] h-[65%] mt-36 bg-slate-200 px-20 py-10 rounded-md'>

         <h2 className='text-7xl font-serif mb-10'>Sign-Up</h2>

         <form
            className='flex flex-col'
            onSubmit={handleSubmit(onSubmit)}
         >

            <label
               className='text-2xl rounded-lg font-medium mb-2'
            >
               Username or Email
            </label>
            <input
               type='email'
               className='outline-none px-3 rounded-lg font-mono w-[90%] py-2 mb-3'
               placeholder='id...'
               {...register('email', { required: true })}
            />
            {
               errors.email && <p>
                  Please enter Email
               </p>
            }

            <div className='flex items-center justify-between'>
               <label
                  className='text-2xl font-medium mb-2'
               >
                  Password
               </label>
               <div
                  className='mr-12 cursor-pointer text-2xl'
                  onClick={() => setShowPassword(!showPassword)}
               >
                  {
                     showPassword ? <FaEyeLowVision /> : <FaEye />
                  }
               </div>
            </div>
            <input
               type={showPassword ? 'text' : 'password'}
               className='outline-none px-3 font-mono rounded-lg w-[90%] py-2'
               placeholder='Password...'
               {...register('password', { required: true })}
            />
            {
               errors.password && <p>
                  Please enter password
               </p>
            }


            <div className='flex items-center justify-between mt-3'>
               <label
                  className='text-2xl font-medium mb-2'
               >
                  Confirm Password
               </label>
               <div
                  className='mr-12 cursor-pointer text-2xl'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
               >
                  {
                     showConfirmPassword ? <FaEyeLowVision /> : <FaEye />
                  }
               </div>
            </div>
            <input
               type={showConfirmPassword ? 'text' : 'password'}
               className='outline-none px-3 font-mono rounded-lg w-[90%] py-2'
               placeholder='Confirm Password...'
               {...register('confirmPassword', { required: true })}
            />
            {
               errors.confirmPassword && <p>
                  Please enter Confirm password
               </p>
            }

            <button className='bg-green-400 mt-7 py-3 px-4  w-fit text-2xl rounded-full'>
               Register
            </button>
         </form >

      </div >
   )
}

export default Signup