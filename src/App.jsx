import { useState, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './Product'
import AddCart from './AddCart'
import ProductDetails from './ProductDetails'

export const NameContext = createContext(null)

function App() {
  const [userName, setUsername] = useState('')
  const [addProduct, setAddProduct] = useState([])

  return (
    <NameContext.Provider value={{ userName, setUsername, addProduct, setAddProduct }}>
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