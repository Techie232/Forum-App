import React from 'react'

const CofirmationModal = ({ deleteCommentHandler, setDeleteData }) => {

   return (
      <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50'>
         <div className='bg-teal-500 p-10 rounded-md shadow-lg'>
            <h2 className='text-3xl font-semibold'>Are You Sure to Delete this Comment?</h2>
            <div className='flex justify-between w-[50%] mx-auto mt-4'>
               <button
                  className='border bg-amber-500 p-2 rounded-md'
                  onClick={() => setDeleteData("")}
               >
                  Cancel
               </button>
               <button
                  className='border bg-amber-500 p-2 rounded-md'
                  onClick={deleteCommentHandler}
               >
                  Delete
               </button>
            </div>
         </div>
      </div>
   )
}

export default CofirmationModal
