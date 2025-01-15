import React from 'react'
import toast from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { configureStore } from '@reduxjs/toolkit';
import tokenUserReducer from './slices/tokenUserSlice';
import Doubts from './pages/Doubts';
import PrivateRoute from './components/Auth/PrivateRoute';
import RaiseDoubt from './components/RaiseDoubt';
import ViewDoubt from './components/ViewDoubt';
import './App.css'

export const store = configureStore({
   reducer: {
      tokenUser: tokenUserReducer,
   }
})

const App = () => {


   return (
      <div className='w-screen h-screen flex flex-col items-center'>

         <Navbar />

         <Routes>

            <Route
               path='/raise-doubt'
               element={
                  <PrivateRoute>
                     <RaiseDoubt />
                  </PrivateRoute>
               }>
            </Route>

            <Route
               path='/doubt/:doubtId'
               element={
                  <PrivateRoute>
                     <ViewDoubt />
                  </PrivateRoute>
               }>
            </Route>

            <Route path='/' element={<Doubts />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

         </Routes>

      </div>
   )
}

export default App