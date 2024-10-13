import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{ Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <Toaster></Toaster>
    <App />
</Provider>
  </StrictMode>,
)
