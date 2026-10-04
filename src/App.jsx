import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout/Layout";
import ItemListContainer from "./components/Products/ItemListContainer";
import ProductDetail from "./components/Products/ProductDetail";
import Home from "./components/Home/Home";

function App() {


  return (
    <>
    <Routes>
        <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<ItemListContainer/>}/>
            <Route path="/product/:id" element={<ProductDetail/>}/>
            <Route path="/contact" element={<h3>Contact</h3>}/>
        </Route>
    </Routes>
    </>
  )
}

export default App
