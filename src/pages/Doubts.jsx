import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDoubts } from '../services/operations/doubt';

const Doubts = () => {

   const navigate = useNavigate();
   const [doubts, setDoubts] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const [loading, setLoading] = useState(false);
   const [query, setQuery] = useState("");

   const searchData = async () => {
      setLoading(true);
      const response = await getDoubts(page, 7, query);
      if (response?.questions?.length > 0)
         setDoubts(response.questions);
      if (response?.totalPages)
         setTotalPages(response?.totalPages)
      setLoading(false);
   }

   const getData = async () => {
      setLoading(true);
      const response = await getDoubts(page);
      if (response?.questions?.length > 0)
         setDoubts(response.questions);
      if (response?.totalPages)
         setTotalPages(response?.totalPages)
      setLoading(false);
   }

   useEffect(() => {
      navigate(`/?page=${page}`);
      if (query.length === 0)
         getData();
      else {
         searchData();
      }
   }, [page])

   const handleEnterSearch = (e) => {
      if (e.key === 'Enter') {
         setPage(1);
         searchData();
      }
   }

   const handleClickFind = (e) => {
      setPage(1);
      searchData();
   }

   return (
      <div className='w-[70%] text-center relative'>

         {/* search Bar */}
         <div className='absolute top-5 right-3 flex gap-x-5'>
            <input
               placeholder='Search'
               className='bg-green-200 p-2 rounded-md'
               type='text'
               onChange={(e) => setQuery(e.target.value)}
               onKeyDown={handleEnterSearch}
            />
            <button
               className='bg-slate-300 px-2 rounded-full'
               onClick={handleClickFind}
            >
               Find
            </button>
         </div>

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

         <div className='sticky bottom-0 w-[50%] mx-auto flex justify-between border-2  border-green-700 p-3  rounded-lg'>
            {
               page !== totalPages &&
               <button
                  className='bg-slate-300 rounded-md mx-auto p-3 text-xl hover:opacity-80'
                  onClick={() => setPage(page + 1)}
               >
                  Next
               </button>
            }
            {
               page !== 1 &&
               <button
                  className='bg-slate-300 rounded-md mx-auto p-3 text-xl hover:opacity-80'
                  onClick={() => setPage(page - 1)}
               >
                  Prev
               </button>
            }
         </div>

      </div>
   )
}

export default Doubts