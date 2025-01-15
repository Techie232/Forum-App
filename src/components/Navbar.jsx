import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../slices/tokenUserSlice';
import { logout } from '../services/operations/authAPI';

const Navbar = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { token } = useSelector(state => state.tokenUser);

   const putMeOut = () => {
      logout(navigate, dispatch);
   }

   return (
      <div className='w-full h-[10%] bg-slate-500 text-2xl'>
         {
            token === null ? (
               <div className='w-11/12 flex justify-between mx-auto py-6'>
                  <Link to={'/'} className=''>
                     Home
                  </Link>
                  <div className='flex gap-x-4'>
                     <button
                        className='bg-slate-400 rounded-md p-2 text-xl hover:bg-opacity-70 transition-all duration-150'
                        onClick={() => navigate('/login')}

                     >
                        Login
                     </button>

                     <button
                        className='bg-slate-400 rounded-md p-2 text-xl hover:bg-opacity-70 transition-all duration-150'
                        onClick={() => navigate('/signup')}

                     >
                        SignUp
                     </button>
                  </div>
               </div>
            ) : (

               <div className='w-11/12 flex justify-between items-center mx-auto py-6'>

                  <div className='flex  items-center gap-x-10'>
                     <div
                        className='text-2xl border border-purple-800 p-2 rounded-full hover:text-green-400 cursor-pointer'
                        onClick={() => navigate('/raise-doubt')}
                     >
                        Raise a Doubt
                     </div>

                     <Link to={'/'} className=''>
                        Home
                     </Link>
                  </div>

                  <button
                     className='bg-slate-400 mx-auto rounded-md p-2 text-xl hover:bg-opacity-70 transition-all duration-150'
                     onClick={putMeOut}
                  >
                     Log-Out
                  </button>


               </div>
            )
         }

      </div>
   )
}

export default Navbar