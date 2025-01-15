import toast from 'react-hot-toast';
import { doubtPoints } from '../api';
import { apiConnector } from '../apiConnector';

export const createDoubts = async (data, token) => {
   try {
      const response = await apiConnector("POST", doubtPoints.CREATE_DOUBT_API, data, {
         'Authorization': `Bearer ${token}`
      });

      if (!response?.data?.success)
         throw new Error("Unable to raise the doubt");

      toast.success("Doubt Raised Successfully");

   } catch (error) {
      console.log(error);
      toast.error("Could not raise the Doubt");
   }
}

export const getDoubts = async () => {
   let result = [];
   try {
      const response = await apiConnector("GET", doubtPoints.GET_ALL_DOUBT_API);

      if (!response?.data?.success)
         throw new Error("Unable to fetch the doubts");

      result = response?.data?.data

   } catch (error) {
      console.log(error);
      result = [];
   }
   return result;
}

export const getDoubtDetails = async (doubtId, token) => {
   let result;
   try {
      const response = await apiConnector("POST", doubtPoints.GET_ONE_DOUBT_API, { doubtId }, {
         'Authorization': `Bearer ${token}`
      });

      if (!response?.data?.success)
         throw new Error("Unable to fetch the doubts");

      result = response?.data?.data

   } catch (error) {
      console.log(error);
      result;
   }
   return result;
}