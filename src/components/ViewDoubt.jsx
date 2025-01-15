import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoubtDetails } from '../services/operations/doubt';
import { useSelector } from 'react-redux';
import { addComment } from '../services/operations/comment';
import toast from 'react-hot-toast';
import { FaDeleteLeft } from "react-icons/fa6";
import CofirmationModal from './CofirmationModal';
import { deleteComment } from '../services/operations/comment'

const ViewDoubt = () => {

   const { doubtId } = useParams();
   const { token, user } = useSelector(state => state.tokenUser)
   const [doubtDetails, setDoubtDetails] = useState();
   const [comment, setComment] = useState("");
   const [loading, setLoading] = useState(false);
   const [deleteData, setDeleteData] = useState("");

   useEffect(() => {
      setLoading(true);
      const getDoubt = async () => {
         let response = await getDoubtDetails(doubtId, token);
         if (response)
            setDoubtDetails(response);
         setLoading(false);
      }
      getDoubt();
   }, [])

   const appendComment = async () => {

      let temp = comment.trim();

      if (temp.length === 0) {
         toast.error('You should enter some Comment First')
         return;
      }

      setLoading(true);

      const response = await addComment(
         {
            "title": temp,
            doubtId,
            "userId": user?._id
         },
         token);
      if (response)
         setDoubtDetails(response);

      setComment("");
      setLoading(false);
   }

   const handleEnter = (e) => {
      if (e.key === "Enter") {
         appendComment();
      }
   }

   const deleteCommentHandler = async () => {
      let response = await deleteComment(deleteData, token);

      if (response)
         setDoubtDetails(response);

      setDeleteData("");
   }

   return (
      <div className='w-11/12'>

         <div
            className='text w-full h-[150px] bg-rose-300 text-center flex justify-center items-center text-4xl rounded-md mt-10 text-orange-900'>
            {doubtDetails?.title}
         </div>

         <div className='flex justify-center items-center gap-x-10 mt-5'>
            <textarea
               className='w-[40%] h-[150px] px-2 py-1 outline-none rounded-md shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] border-4 border-amber-400'
               placeholder='Enter Some Comment...'
               onChange={(e) => setComment(e.target.value)}
               value={comment}
               onKeyDown={handleEnter}
            />

            <button
               className='bg-orange-400 p-4 rounded-full hover:scale-150 transition-all duration-200'
               onClick={appendComment}
            >
               Add
            </button>

         </div>

         <div className='mt-10'>
            {
               loading ? (<div className='text-center  text-amber-800'><div class="lds-heart"><div></div></div></div>) : (

                  doubtDetails?.comments.length > 0 ? (

                     doubtDetails?.comments.map((comment, index) => (
                        <div
                           key={index}
                           className='flex justify-start items-center ml-10 gap-x-10 mb-6 '
                        >
                           <div
                              className='text-2xl font-medium'
                           >
                              {comment?.description}
                           </div>

                           <div className='flex gap-x-3 items-center border p-1'>
                              <div
                                 className='text-[12px]'
                              >{comment?.Date?.split('T')[0]}</div>
                              <div className='font-thin text-[14px] text-green-500'>({comment?.userId?.email.split('@')[0]})</div>
                           </div>

                           {
                              user?._id === comment?.userId?._id &&
                              <FaDeleteLeft
                                 className='cursor-pointer'
                                 fontSize={25}
                                 onClick={() => setDeleteData({
                                    "commentId": comment?._id,
                                    "doubtId": doubtId,
                                 })}
                              />
                           }

                        </div>
                     ))
                  )
                     : (
                        <div className='text-center text-4xl'>
                           <div className=' text-amber-500'>No Answers Yet!</div>
                           <div className='text-pink-500'> Would you like to contribute?</div>
                        </div>
                     )
               )
            }
         </div>

         {
            deleteData && <CofirmationModal deleteCommentHandler={deleteCommentHandler} setDeleteData={setDeleteData} />
         }

      </div>
   )
}

export default ViewDoubt