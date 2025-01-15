import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './App.jsx'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Provider store={store}>
         <Toaster />
         <App />
      </Provider>
   </BrowserRouter>
)