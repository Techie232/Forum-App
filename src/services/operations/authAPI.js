import toast from "react-hot-toast";
import { endPoints } from '../api';
import { apiConnector } from '../apiConnector';
import { setToken, setUser } from "../../slices/tokenUserSlice";

export const singup = async (data, navigate) => {
   const toastId = toast.loading("Loading...");
   try {

      const response = await apiConnector('POST', endPoints.REGISTER_API, data);

      if (!response?.data?.success)
         throw new Error("Unable to Signup");

      toast.success("Registered Successfully");
      navigate('/login');

   } catch (error) {
      console.log(error);
      toast.error("Singup Failed");
   }
   toast.dismiss(toastId);
}

export const login = async (data, dispatch, navigate) => {

   const toastId = toast.loading("Loading...");
   try {
      const response = await apiConnector('POST', endPoints.LOGIN_API, data);

      if (!response?.data?.success)
         throw new Error("Unable to Login");

      dispatch(setToken(response?.data?.token))
      dispatch(setUser(response?.data?.user))
      localStorage.setItem('token', JSON.stringify(response?.data?.token));
      localStorage.setItem('user', JSON.stringify(response?.data?.user));

      toast.success("Logged-In Successfully");
      navigate('/raise-doubt')

   } catch (error) {
      console.log(error);
      toast.error("Login Failed");
   }
   toast.dismiss(toastId);
}

export const logout = async (navigate, dispatch) => {
   try {
      dispatch(setToken(null));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');

      toast.success("Logged Out successfully");
   } catch (error) {
      console.log(error);
      toast.error("Logout Failed");
   }
}