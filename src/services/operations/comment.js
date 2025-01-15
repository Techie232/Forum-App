import toast from 'react-hot-toast';
import { commentPoints } from '../api';
import { apiConnector } from '../apiConnector';

export const addComment = async (data, token) => {
   let toastId = toast.loading('Adding Comment');
   let result;
   try {
      const response = await apiConnector('POST', commentPoints.CREATE_COMMENT_API, data, {
         'Authorization': `Bearer ${token}`
      })

      if (!response?.data?.success)
         throw new Error("Could not create comment");

      toast.success("Comment Created Successfully");
      result = response?.data?.data;

   } catch (error) {
      console.log(error);
      toast.error("Comment can't be created");
      result = "";
   }
   toast.dismiss(toastId);
   return result;
}

export const deleteComment = async (data, token) => {
   let toastId = toast.loading("Deleting Comment");
   let result = [];
   try {
      const response = await apiConnector("DELETE", commentPoints.DELETE_COMMENT_API, data, {
         'Authorization': `Bearer ${token}`
      })

      if (!response?.data?.success)
         throw new Error("Could not delete the comment");

      toast.success("Comment Deleted Successfully");
      result = response?.data?.data;

   } catch (error) {
      console.log(error);
      toast.error("Comment can't be deleted");
      result = "";
   }
   toast.dismiss(toastId);
   return result;
}