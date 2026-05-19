import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './Product'
import AddCart from './AddCart'
import ProductDetails from './ProductDetails'

export const NameContext = createContext(null)

function App() {
  const [addProduct, setAddProduct] = useState(()=>{
    try{
      const savedItem = localStorage.getItem("cartItem")
      return savedItem ? JSON.parse(savedItem) : [];
    }catch(err){
      console.log("Invalid JSON in localStorage :",err);
      return [];
    }
  })

  useEffect(()=>{
    localStorage.setItem("cartItem",JSON.stringify(addProduct))
  },[addProduct])

  return (
    <NameContext.Provider value={{ addProduct, setAddProduct }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/product/:id' element={<ProductDetails />}/>
          <Route path='/cartpage' element={<AddCart />} />
        </Routes>
      </BrowserRouter>
    </NameContext.Provider>
  )
}

export default App;