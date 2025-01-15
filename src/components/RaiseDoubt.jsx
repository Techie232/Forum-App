import React, { useState } from 'react'
import { createDoubts } from '../services/operations/doubt';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const RaiseDoubt = () => {

   const [doubt, setDoubt] = useState("");
   const { token } = useSelector(state => state.tokenUser);

   const raiseDoubt = async () => {

      let temp = doubt.trim();

      if (temp.length === 0) {
         toast.error("You Should enter the Doubt First")
         return;
      }

      const formData = new FormData();
      formData.append("title", temp);
      await createDoubts(formData, token);
      setDoubt("");
   }

   const handleEnter = (e) => {
      if (e.key === "Enter") {
         raiseDoubt();
      }
   }

   return (
      <div className='mt-20 w-[70%] bg-blue-200 rounded-sm'>

         <h2 className='text-center text-2xl text-pink-600 mt-10 font-medium'>Please Submit you Doubt here so that you could get Answers to that!</h2>

         <div
            className='text-center flex flex-col items-center justify-center'
         >
            <textarea
               placeholder='Please write your DOUBT'
               className='border border-green-400 w-[80%] h-[200px] outline-none rounded-md p-2 mt-10'
               onChange={(e) => setDoubt(e.target.value)}
               value={doubt}
               onKeyDown={handleEnter}
            />

            <button
               className=' bg-amber-500 p-4 rounded-md text-2xl mt-10 mb-10'
               onClick={raiseDoubt}
            >
               RAISE
            </button>

         </div>

      </div>
   )
}

export default RaiseDoubt