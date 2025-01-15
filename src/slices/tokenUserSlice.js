import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
   user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
}

export const tokenUserSlice = createSlice({
   name: 'tokenUser',
   initialState,
   reducers: {
      setToken: (state, action) => {
         state.token = action.payload;
      },
      setUser: (state, action) => {
         state.user = action.payload;
      },
   }
})

export const { setToken, setUser } = tokenUserSlice.actions
export default tokenUserSlice.reducer