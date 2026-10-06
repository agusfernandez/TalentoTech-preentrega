import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout/Layout";
import ItemListContainer from "./components/Products/ItemListContainer";
import ProductDetail from "./components/Products/ProductDetail";
import Home from "./components/Home/Home";
import Contact from "./components/Layout/Contact";
import './components/Layout/styles/Global.module.css'

function App() {


  return (
    <>
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<ItemListContainer/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Route>
    </Routes>
    </>
  )
}

export default App
