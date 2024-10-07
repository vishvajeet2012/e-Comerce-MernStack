import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes ,Route, Router} from 'react-router-dom'

import Logi from './common/Logi'
import Regestration from './common/Regestration'
import NavBar from './common/NavBar'
import Footer from './common/Footer'
import Product from './Frontend/Product'
import Admin from './aDMIN/Admin'
import ProductManagement from './aDMIN/ProductManagement'
import Productlist from './aDMIN/Productlist'
import UpdateProduct from './aDMIN/UpdateProduct'
import QueryManagement from './aDMIN/QueryManagement'
import QueryReply from './aDMIN/QueryReply'
import UseManag from './aDMIN/UseManag'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <NavBar/>
        <Routes>
          

    <Route path="/"  element = {<Logi/>} />
    <Route path="/Regestration" element = {<Regestration/>}/>

    <Route path="/Product" element = {<Product></Product>} />
 
  
    <Route path="/Admin"  element ={<Admin/>} />
    <Route path="/PrdouctMang"  element ={<ProductManagement/>} />
    <Route path="/Productlist" element={<Productlist/>} />  
  <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
  <Route path='/queryManagement' element={<QueryManagement/>}/>
  <Route path='/queryReply/:id' element={<QueryReply/>}/>
 <Route path='/userManag' element={<UseManag/>} /> 


         </Routes>
<Footer/>

     
     </BrowserRouter>
    </>
  )
}

export default App
