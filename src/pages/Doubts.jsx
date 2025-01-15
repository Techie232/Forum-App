import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDoubts } from '../services/operations/doubt';

const Doubts = () => {

   const navigate = useNavigate();
   const [doubts, setDoubts] = useState([]);

   useEffect(() => {
      const getData = async () => {
         const response = await getDoubts();
         if (response.length > 0)
            setDoubts(response);
      }
      getData();
   }, [])

   return (
      <div className='w-[70%] text-center'>

         <p className='text-2xl font-semibold underline w-fit bg-green-500 mt-5 rounded-lg p-2 sticky top-0'>Doubts that we got here</p>
         {
            doubts.map((doubt, index) => (
               <div
                  key={index}
                  className='cursor-pointer bg-purple-300 rounded-sm mb-4 hover:scale-95 transition-all duration-150 flex gap-x-5 justify-center border border-5 border-red-700 py-5 mt-4 items-center'
                  onClick={() => navigate(`/doubt/${doubt?._id}`)}
               >
                  <div className='text-xl font-serif'>{doubt.title}</div>
                  <div className='text-[13px] text-pink-800'>{doubt.Date.split('T')[0]}</div>
               </div>
            ))
         }

      </div>
   )
}

export default Doubts